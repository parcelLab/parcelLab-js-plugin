// Cross-shared utility functions

var Static = require('../static.js');
var Templates = require('../../../templates/');
var errorText = Static.errorText;
var textData = Static.textData;

/**
 * Get all the parameters from the given url.
 * @param  {String} url, the url itself :O.
 * @param  {Array} params, the params that will be taken from the url.
 * @return {Array} the array with the values form the url.
 */
function getParamsFromUrl(url, params) {
  var query = [];
  var i = 0;
  params.forEach(function (param) {
    if (getParamValue(url, param, null))
      query[i] = {
        name: param,
        value: getParamValue(url, param, null),
      };
    i++;
  });

  return query;
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

function getParamValue(haystack, needle, defaultValue) {
  var result = defaultValue;
  if (haystack) {
    var params = haystack.substring(haystack.indexOf('?') + 1, haystack.length).split('&');
    for (var i = 0; i < params.length; i++) {
      var key = params[i].substring(0, params[i].indexOf('='));
      var value = params[i].substring(params[i].indexOf('=') + 1, params[i].length);
      if (isNaN(parseInt(value))) params[i] = params[i].replace(value, '\'' + value + '\'');
      if (key == needle) result = value;
    }
  }
  return result;
}

/**
 * Sets a cookie.
 * @param {String} cname, cookie name.
 * @param {String} cvalue, cookie value.
 * @param {Number} exdays, the number of day that the cookie will be valid.
 */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
}

/**
 * Gets a cookie.
 * @param  {String} cname, the name of the cookie.
 * @return {String} the cookie's value
 */
function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

/**
 * Formats the name and values of the query to be send into an API request.
 * @param  {Array} query, array of objects {name,value}.
 * @return {Object} queryObject, the object representation fo the query.
 */
function prepareQuery(query) {
  var queryObj = {};
  query.forEach(function (q) {
    switch (q.name) {
      case 'trackingNo':
        queryObj.tno = q.value;
        break;
      default:
        queryObj[q.name] = q.value;
        break;
    }
  });

  return queryObj;
}

/**
 * Removes the given class from a document object.
 * @param  {String} selector, to which elements this is going to work.
 * @param  {String} class, class to remove
 * @return {Array} returns the set of elements.
 */
function removeClass(selector, cls) {
  var elements = document.querySelectorAll(selector);
  var result = [];
  for (var i = 0; i < elements.length; i++) {
    var elem = elements[i];
    elem.className = elem.className.replace(cls, ' ');
    result.push(elem);
  }
  return result;
}

function removeClassToObject(elem, cls) {
  if (elem.className.indexOf(cls) >= 0)
    elem.className = elem.className.replace(cls, '');
  return elem;
}

/**
 * Adds the given class from a document object.
 * @param  {String} selector, to which elements this is going to work.
 * @param  {String} class, class to add
 * @return {Array} returns the set of elements.
 */
function addClass(selector, cls) {
  var elements = document.querySelectorAll(selector);
  var result = [];
  for (var i = 0; i < elements.length; i++) {
    var elem = elements[i];
    if (elem.className.indexOf(cls) <= 0)
      elem.className = elem.className + ' ' + cls;
    result.push(elem);
  }
  return result;
}

function addClassToObject(elem, cls) {
  if (elem.className.indexOf(cls) <= 0)
    elem.className = elem.className + ' ' + cls;
  return elem;
}

/**
 * Adds event to objects depending of the parent node
 * @param  {String} parent    parent selector.
 * @param  {String} selector  children selector.
 * @param  {Function} callaback the actual logic.
 */
function eventFromParent(type, parent, selector, callback) {
  parent = document.querySelector(parent);
  if (parent) {
    parent.addEventListener(type, function (e) {
      var objs = parent.querySelectorAll(selector);
      for (var i = 0; i < objs.length; i++) {
        var obj = objs[i];
        if (obj && (obj.contains(e.target) || e.target.matches(selector))) {
          e.stopPropagation();
          // e.target = obj;
          callback(e, obj);
          break;
        }
      }
    });
  } else {
    throw new Error("Couldn't find domNode ~> ", parent);
  }
}

function toggleDisplay(elem, showing) {
  if (elem.style.display != 'inline-block' && !showing)
    elem.style.display = 'inline-block';
  else
    elem.style.display = 'none';
}

function defaultsDeep(target, source) {
  for (var prop in source) {
    if (prop in target)
      if (typeof prop === 'object')
        defaultsDeep(target[prop], source[prop]);
    else
      target[prop] = source[prop];
  }

  return target;
}

module.exports = {
  prepareQuery: prepareQuery,
  getCookie: getCookie,
  setCookie: setCookie,
  getParamValue: getParamValue,
  padWithZero: padWithZero,
  dateToStringEn: dateToStringEn,
  dateToStringDe: dateToStringDe,
  getParamsFromUrl: getParamsFromUrl,
  addClass: addClass,
  removeClass: removeClass,
  eventFromParent: eventFromParent,
  addClassToObject: addClassToObject,
  removeClassToObject: removeClassToObject,
  toggleDisplay: toggleDisplay,
};
