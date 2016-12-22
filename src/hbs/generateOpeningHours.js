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

module.exports = function (openingHours, lang) {
  console.log(openingHours);
  if (!lang || typeof lang !== 'string') lang = 'USA'; // HACK
  var openingHoursText = translate('openingHours', lang);
  var weekDays = translate('weekDays', lang);
  var openingHourEntries = [];
  var alwaysOpenedText = translate('alwaysOpened', lang);

  // check if open 24h
  var alwaysOpened = openingHours.filter((oh)=>
    (!oh.open || oh.open.time !== '0000' && oh.close)
  ).length === 0;

  if (alwaysOpened) {
    openingHourEntries.push(
      `<div class="opening-hours-entry">${alwaysOpenedText}</div>`);
  } else {
    openingHours.forEach((ohEl)=> {
      openingHourEntries.push(renderOpeningHourEntry(ohEl, weekDays, alwaysOpenedText));
    });
  }

  return `
  <div class="pl-box pl-opening-hours-box">
    <div class="pl-box-heading pl-toggle-opening-hours">
      ${openingHoursText}
    </div>
    <div class="pl-box-body">
      ${openingHourEntries.join('\n')}
    </div>
  </div>
  `;
};
