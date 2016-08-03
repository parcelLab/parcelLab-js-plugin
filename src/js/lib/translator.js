const statics = require('./static');

var translate = function (word, lang='USA') {
  if (statics.translations[lang] && statics.translations[lang][word]) {
    return statics.translations[lang][word];
  } else {
    console.error('🙀  Can not translate ' + word + ' into ' + lang);
    return word;
  }
};

var date = function (ts, time, code) {
  return code === 'DEU' ?
      dateToStringDe(ts, time) :
      dateToStringEn(ts, time);
};

/**
 * Add cero before the given string.
 * @param  {String} s, the given number
 * @param  {Number} size, the number of zeros.
 * @return {String} the formatted string.
 */
function padWithZero(s, size) {
  s = s + '';
  while (s.length < size) s = '0' + s;
  return s;
}

/**
 * Converts the date into German  format.
 * @param  {Date} ts, timestamp or date.
 * @param  {Boolean} showTime, sets if the time also will be shown.
 * * @returns {String} the date with german format.
 */
function dateToStringDe(ts, showTime) {
  var result = '';
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero((ts.getMonth() + 1), 2) + '.' + ts.getFullYear();
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2) + ' Uhr';
  return result;
}

/**
 * Converts the date into English format.
 * @param  {Date} ts, timestamp or date.
 * @param  {Boolean} showTime, sets if the time also will be shown.
 * @returns {String} the date with english format.
 */
function dateToStringEn(ts, showTime) {
  var result = '';
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero((ts.getMonth() + 1), 2) + '.' + ts.getFullYear();
  if (showTime) {
    result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2);
    if (ts.getHours() < 12) result += ' a.m.';
    else result += ' p.m.';
  }
  return result;
}

module.exports = { translate, date };
