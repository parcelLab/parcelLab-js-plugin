const translate = require('../../js/lib/translator').translate;

var currentWorkingDay = new Date().getDay();

/////////////
// helpers //
/////////////

function formatHourElement(hel) {
  if (hel.length === 4) {
    return `${hel.substring(0, 2)}:${hel.substring(2)}`;
  } else return hel;
}

function minutesOpen(ophObj) {
  var now = new Date();
  var closing = new Date();

  if (ophObj.close.day === now.getDay()) {
    closing.setHours(ophObj.close.time.substring(0, 2));
    closing.setMinutes(ophObj.close.time.substring(2));
  } else if (ophObj.close.day === now.getDay() + 1) {
    var ref = new Date(closing);
    closing.setDate(ref.getDate() + 1); // add 1 day
    closing.setHours(ophObj.close.time.substring(0, 2));
    closing.setMinutes(ophObj.close.time.substring(2));
  } else {
    throw new Error('Cant determine minutesOpen');
  }

  return (closing - now) / 1000 / 60;
}

function dateifyOPHours(ophObj) {
  try {
    var now = new Date();
    var ref = null;
    var res = {
      open: new Date(),
      close: new Date(),
    };

    // open
    if (ophObj.open.day === now.getDay()) {
      res.open.setHours(ophObj.open.time.substring(0, 2));
      res.open.setMinutes(ophObj.open.time.substring(2));
    } else if (ophObj.open.day === now.getDay() + 1) {
      ref = new Date(res.open);
      res.open.setDate(ref.getDate() + 1); // add 1 day
      res.open.setHours(ophObj.open.time.substring(0, 2));
      res.open.setMinutes(ophObj.open.time.substring(2));
    }

    // close
    if (ophObj.close.day === now.getDay()) {
      res.close.setHours(ophObj.close.time.substring(0, 2));
      res.close.setMinutes(ophObj.close.time.substring(2));
    } else if (ophObj.close.day === now.getDay() + 1) {
      ref = new Date(res.close);
      res.close.setDate(ref.getDate() + 1); // add 1 day
      res.close.setHours(ophObj.close.time.substring(0, 2));
      res.close.setMinutes(ophObj.close.time.substring(2));
    }

    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}

function getCurrentTimeSlot(openingHours) {
  var todayTimeSlots = openingHours.filter((ophObj)=> ophObj.open.day === currentWorkingDay);
  var slot = null;
  if (todayTimeSlots.length > 1) {
    var now = new Date();

    todayTimeSlots.forEach((ts)=> {
      var dts = dateifyOPHours(ts);
      if (dts && (dts.open < now) && (dts.close > now)) slot = ts;
    });

  } else if (todayTimeSlots.length === 1) slot = todayTimeSlots[0];
  return slot;
}

//////////////////////
// render functions //
//////////////////////

function renderOpeningHourEntry(ophObj, weekDays, fallBack, hideWeekDay) {
  var weekDay = weekDays[ophObj.open.day];
  var highlightClass = '';
  var fromTill = '-';

  // check if opening and closing times available
  if (ophObj.open && ophObj.close) {
    fromTill = formatHourElement(ophObj.open.time);
    fromTill += ' - ';
    fromTill += formatHourElement(ophObj.close.time);
  }

  // check if open 24h
  if (ophObj.open && !ophObj.close && ophObj.open.time === '0000') {
    fromTill = fallBack;
  }

  if (ophObj.open.day === currentWorkingDay) highlightClass = 'highlighted-entry';

  return `
    <div class="pl-col-row opening-hours-entry ${highlightClass}">
      <div class="pl-week-day-col">
        ${(!hideWeekDay) ? weekDay + ':' : '&nbsp;'}
      </div>
      <div class="pl-hours-col">
        ${fromTill}
      </div>
    </div>
  `;
}

function renderOpeningHoursList(openingHours, lang) {
  var weekDays = translate('weekDays', lang);
  var openingHourEntries = [];
  var sortedOPHours = {};
  var alwaysOpenedText = translate('alwaysOpened', lang);

  // sort opHours
  openingHours.forEach((ophObj)=> {
    if (sortedOPHours[ophObj.open.day]) sortedOPHours[ophObj.open.day].push(ophObj);
    else sortedOPHours[ophObj.open.day] = [ophObj];
  });

  for (var key in sortedOPHours) {
    if (sortedOPHours.hasOwnProperty(key)) {
      var ophDay = sortedOPHours[key];
      if (ophDay.length > 1) {
        // push first with weekDay text
        openingHourEntries.push(renderOpeningHourEntry(ophDay[0], weekDays, alwaysOpenedText));

        // and remaining without weekday text
        var remaining = ophDay.slice(1);
        for (var i = 0; i < remaining.length; i++) {
          let ophObj = remaining[i];
          openingHourEntries.push(renderOpeningHourEntry(ophObj, weekDays, alwaysOpenedText, true));
        }
      } else if (ophDay.length === 1)
        openingHourEntries.push(renderOpeningHourEntry(ophDay[0], weekDays, alwaysOpenedText));
    }
  }

  return openingHourEntries.join('');
}

function renderRemainingOpeningTimeText(openingHours, lang) {
  var result = '';
  var opHours = null;

  try {
    // find openingHours for today
    opHours = getCurrentTimeSlot(openingHours);

    if (opHours) {
      if (!opHours.close && opHours.open && opHours.open.time === '0000') // 24 h open!
        return translate('alwaysOpened', lang);

      var remainingMinutes = minutesOpen(opHours);

      if (remainingMinutes > 60) {
        // is open more then 1 h?
        result = `${translate('closesIn', lang)} ${Math.round(remainingMinutes / 60)} h`;
      } else if (remainingMinutes > 0 && remainingMinutes < 60) {
        // closes the next 60 m ?
        result = `${translate('closesIn', lang)} ${remainingMinutes} m`;
      }
    }

  } finally {
    return result;
  }
}

module.exports = function (openingHours, lang) {
  if (!lang || typeof lang !== 'string') lang = 'USA'; // HACK
  var openingHoursText = translate('openingHours', lang);
  var alwaysOpenedText = translate('alwaysOpened', lang);
  var openingHourEntries = [];
  var mobileText = '';

  // check if open 24h
  var alwaysOpened = openingHours.filter((oh)=>
    (!oh.open || oh.open.time !== '0000' && oh.close)
  ).length === 0;

  if (alwaysOpened) {
    openingHourEntries = `<div class="opening-hours-entry">${alwaysOpenedText}</div>`;
    mobileText = alwaysOpenedText;
  } else {
    openingHourEntries = renderOpeningHoursList(openingHours, lang);
    mobileText = renderRemainingOpeningTimeText(openingHours, lang);
  }

  return `
  <div class="pl-box pl-opening-hours-box">
    <div class="pl-box-heading pl-toggle-opening-hours">
      <span class="hide-on-mobile">
        ${openingHoursText}
        ${!alwaysOpened && mobileText ? `<br><span class="pl-closes-in">(${mobileText})</span>` : ''}
      </span>
      <span class="hide-on-desktop">
        ${mobileText || openingHoursText}
        <i style="float:right;" class="fa fa-chevron-down"></i>
      </span>
    </div>
    <div class="pl-box-body">
      ${openingHourEntries}
    </div>
  </div>
  `;
};
