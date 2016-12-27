const translate = require('../js/lib/translator').translate;

var currentWorkingDay = new Date().getDay();

/////////////
// helpers //
/////////////

function formatHourElement(hel) {
  if (hel.length === 4) {
    return `${hel.substring(0, 2)}:${hel.substring(2)}`;
  } else return hel;
}

function minutesOpen(opHours) {
  var now = new Date();
  var closing = new Date();

  if (opHours.close.day === now.getDay()) {
    closing.setHours(opHours.close.time.substring(0, 2));
    closing.setMinutes(opHours.close.time.substring(2));
  } else if (opHours.close.day === now.getDay() + 1) {
    var ref = new Date(closing);
    closing.setDate(ref.getDate() + 1); // add 1 day
    closing.setHours(opHours.close.time.substring(0, 2));
    closing.setMinutes(opHours.close.time.substring(2));
  } else {
    throw new Error('Cant determine minutesOpen');
  }

  return (closing - now) / 1000 / 60;
}

//////////////////////
// render functions //
//////////////////////

function renderOpeningHourEntry(openingHour, weekDays, fallBack) {
  var weekDay = weekDays[openingHour.open.day];
  var highlightClass = '';
  var fromTill = '-';

  // check if opening and closing times available
  if (openingHour.open && openingHour.close) {
    fromTill = formatHourElement(openingHour.open.time);
    fromTill += ' - ';
    fromTill += formatHourElement(openingHour.close.time);
  }

  // check if open 24h
  if (openingHour.open && !openingHour.close && openingHour.open.time === '0000') {
    fromTill = fallBack;
  }

  if (openingHour.open.day === currentWorkingDay) highlightClass = 'highlighted-entry';

  return `
    <div class="pl-col-row opening-hours-entry ${highlightClass}">
      <div class="pl-week-day-col">
        ${weekDay}:
      </div>
      <div class="pl-hours-col">
        ${fromTill}
      </div>
    </div>
  `;
}

function renderRemainingOpeningTimeText(openingHours, lang) {
  var result = '';
  var now = new Date();
  var opHours = null;

  try {
    // find openingHours for today
    openingHours.forEach((oh)=> {
      if (oh.open.day === now.getDay()) opHours = oh;
    });

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
  console.log(openingHours);
  if (!lang || typeof lang !== 'string') lang = 'USA'; // HACK
  var openingHoursText = translate('openingHours', lang);
  var weekDays = translate('weekDays', lang);
  var openingHourEntries = [];
  var alwaysOpenedText = translate('alwaysOpened', lang);
  var mobileText = '';

  // check if open 24h
  var alwaysOpened = openingHours.filter((oh)=>
    (!oh.open || oh.open.time !== '0000' && oh.close)
  ).length === 0;

  if (alwaysOpened) {
    openingHourEntries.push(
      `<div class="opening-hours-entry">${alwaysOpenedText}</div>`);
    mobileText = alwaysOpenedText;
  } else {
    openingHours.forEach((ohEl)=> {
      openingHourEntries.push(renderOpeningHourEntry(ohEl, weekDays, alwaysOpenedText));
    });
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
      ${openingHourEntries.join('\n')}
    </div>
  </div>
  `;
};
