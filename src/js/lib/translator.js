const statics = require('./static')

const translate = function (word, lang='USA') {
  if (statics.translations[lang] && statics.translations[lang][word]) {
    return statics.translations[lang][word]
  } else {
    console.warn('Can not translate "' + word + '" into ' + lang)

    // try to translate to USA
    if (lang !== 'USA' && statics.translations.USA[word]) {
      return statics.translations.USA[word]
    } else return word
  }
}

const date = function (ts, time, code) {
  let res = ''
  if (['DEU', 'AUT', 'de'].indexOf(code) > -1) res = dateToStringDe(ts, time)
  else if (['FRA', 'fr'].indexOf(code) > -1) res = dateToStringFr(ts, time)
  else res = dateToStringEn(ts, time)
  return res
}

/**
 * Add cero before the given string.
 * @param  {String} s, the given number
 * @param  {Number} size, the number of zeros.
 * @return {String} the formatted string.
 */
function padWithZero(s, size) {
  s = s + ''
  while (s.length < size) s = '0' + s
  return s
}

/**
 * Converts the date into German  format.
 * @param  {Date} ts, timestamp or date.
 * @param  {Boolean} showTime, sets if the time also will be shown.
 * * @returns {String} the date with german format.
 */
function dateToStringDe(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero((ts.getMonth() + 1), 2) + '.' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2) + ' Uhr'
  return result
}

/**
 * Converts the date into English format.
 * @param  {Date} ts, timestamp or date.
 * @param  {Boolean} showTime, sets if the time also will be shown.
 * @returns {String} the date with english format.
 */
function dateToStringEn(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero((ts.getMonth() + 1), 2) + '.' + ts.getFullYear()
  if (showTime) {
    result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2)
    if (ts.getHours() < 12) result += ' a.m.'
    else result += ' p.m.'
  }
  return result
}

/**
 * Converts the date into French format.
 * @param  {Date} ts, timestamp or date.
 * @param  {Boolean} showTime, sets if the time also will be shown.
 * @returns {String} the date with french format.
 */
function dateToStringFr(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero(ts.getMonth() + 1, 2) + '.' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + 'h' + padWithZero(ts.getMinutes(), 2)
  return result
}

module.exports = { translate, date }
