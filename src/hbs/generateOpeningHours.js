const translate = require('../js/lib/translator').translate;

var currentWorkingDay = new Date().getDay();

function formatHourElement(hel) {
  if (hel.length === 4) {
    return `${hel.substring(0, 2)}:${hel.substring(2)}`;
  } else return hel;
}

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

function generateRemainingOpeningTimeText(openingHours, lang) {
  var result = '';
  var now = new Date();
  var opHours = null;
  var closing = null;

  openingHours.forEach((oh)=> {
    if (oh.open.day === now.getDay()) opHours = oh;
  });

  if (opHours && opHours.close && opHours.close.time) {
    result += translate('closesIn', lang);
    var remaining = null;
    if (opHours.close.day === now.getDay()) {
      // closes today
      closing = new Date();
      closing.setHours(opHours.close.time.substring(0, 2));
      closing.setMinutes(opHours.close.time.substring(2));
      remaining = Math.abs(now - closing) / 36e5;
      result += `${Math.round(remaining)} h`;
    } else {
      // close next day
      closing = new Date();
      closing.setHours(opHours.close.time.substring(0, 2));
      closing.setHours(opHours.close.time.substring(0, 2));
      closing.setMinutes(opHours.close.time.substring(2));
      var ref = new Date(closing);
      closing.setDate(ref.getDate() + 1); // add 1 day
      remaining = Math.abs(now - closing) / 36e5;
      result += `${Math.round(remaining)} h`;
    }
  } else if (opHours && opHours.open && opHours.open.time === '0000') {
    // open 24h
    result = translate('alwaysOpened', lang);
  }

  return result;
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
    mobileText = generateRemainingOpeningTimeText(openingHours, lang);
  }

  return `
  <div class="pl-box pl-opening-hours-box">
    <div class="pl-box-heading pl-toggle-opening-hours">
      <span class="hide-on-mobile">
        ${openingHoursText}
        ${!alwaysOpened ? `<br><span class="pl-closes-in">(${mobileText})</span>` : ''}
      </span>
      <span class="hide-on-desktop">${mobileText}</span>
    </div>
    <div class="pl-box-body">
      ${openingHourEntries.join('\n')}
    </div>
  </div>
  `;
};
