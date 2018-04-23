const statics = require('./static')

const translate = function (word, lang='en') {
  if (statics.translations[lang] && statics.translations[lang][word]) {
    return statics.translations[lang][word]
  } else {
    console.warn('Can not translate "' + word + '" into ' + lang)

    // try to translate to en
    if (lang !== 'en' && statics.translations.en[word]) {
      return statics.translations.en[word]
    } else return word
  }
}

const date = function (ts, time, code) {
  let res = ''
  if (['DEU', 'AUT', 'CHE', 'de'].indexOf(code) > -1) res = dateToStringDe(ts, time)
  else if (['FRA', 'fr'].indexOf(code) > -1) res = dateToStringFr(ts, time)
  else if (['BEL', 'ITA', 'it', 'ESP', 'es'].indexOf(code) > -1) res = dateToStringSlash(ts, time)
  else if (['NOR', 'no', 'nb', 'CZE', 'cs', 'POL', 'pl'].indexOf(code) > -1) res = dateToStringDot(ts, time)
  else if (['DNK', 'da', 'FIN', 'fi', 'NLD', 'nl'].indexOf(code) > -1) res = dateToStringDash(ts, time)
  else if (['USA', 'IRL', 'GBR', 'en'].indexOf(code) > -1) res = dateToStringEn(ts, time)
  else res = dateToStringIso(ts, time)
  return res
}

/**
 * Add zero before the given string.
 * @param  {String} s, the given number
 * @param  {Number} size, the number of zeros.
 * @return {String} the formatted string.
 */
function padWithZero(s, size) {
  s = s + ''
  while (s.length < size) s = '0' + s
  return s
}


function dateToStringDe(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero((ts.getMonth() + 1), 2) + '.' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2) + ' Uhr'
  return result
}

function dateToStringSlash(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '/' + padWithZero((ts.getMonth() + 1), 2) + '/' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2)
  return result
}

function dateToStringDot(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero((ts.getMonth() + 1), 2) + '.' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2)
  return result
}

function dateToStringDash(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '-' + padWithZero((ts.getMonth() + 1), 2) + '-' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2)
  return result
}

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

function dateToStringFr(ts, showTime) {
  let result = ''
  result += padWithZero(ts.getDate(), 2) + '.' + padWithZero(ts.getMonth() + 1, 2) + '.' + ts.getFullYear()
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + 'h' + padWithZero(ts.getMinutes(), 2)
  return result
}

function dateToStringIso(ts, showTime) {
  let result = ''
  result += ts.getFullYear() + '-' + padWithZero(ts.getMonth() + 1, 2) + '-' + padWithZero(ts.getDate(), 2)
  if (showTime) result += ', ' + padWithZero(ts.getHours(), 2) + ':' + padWithZero(ts.getMinutes(), 2)
  return result
}

module.exports = { translate, date }
