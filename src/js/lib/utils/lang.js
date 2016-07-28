var Utils = require('./utils.js');
var Static = require('../static.js');
var Templates = require('../../../templates/');

///////////////////////
// Internal function //
///////////////////////

/**
 * Validates if the element exists in the DOM
 * @param  {String} selector [description]
 */
function exists(selector) {
  return document.querySelector(selector);
}

/**
 * Tries to guess the language from different sources like: url, cookie or browser.
 * @param  {String} lang Language code (optional).
 */
function guessLang(lang) {
  if (!lang) {
    // prefered from window url.
    lang = Utils.getParamValue(window.location.href, 'lang', null);
    if (!lang) lang = (Utils.getCookie('lang') !== '') ? Utils.getCookie('lang') : null;
    if (!lang) {
      lang = navigator.languages ?
        navigator.languages[0] :
        (navigator.language || navigator.userLanguage);
    }
  }
  if (!lang) return null;
  if (Static.languages[lang])
    return Static.languages[lang];
  if (Static.languages[lang.substr(0, 2).toLowerCase()])
    return Static.languages[lang.substr(0, 2).toLowerCase()];
  return null;
}

/**
 * This prototype manages everything related with languages.
 * @param {String}   lang     Iso2 code of the language, e.g. 'en', 'de'.
 * @param {Function} callback This action is going to be called everytime te language selection changes.
 */
function Lang(lang, rootNode, callback) {
  this.code = this.lang = lang.code;
  this.label = lang.label;
  this.icon = lang.icon;
  this.name = lang.name;
  this.selected = null;
  this.dropdown = null;
  this.rootNode = document.querySelector(rootNode);
  this.callback = callback;
}

/**
 * Changes the current language.
 * @param  {String} lang ISO2 code for the language. e.g: 'en', 'de'.
 * @return {Object} The same lang instance.
 */
Lang.prototype.change = function (langCode) {
  Utils.toggleDisplay(this.dropdown);
  if (langCode === this.code || langCode === this.name) return this;
  var lang = guessLang(langCode);

  var inUrl = Utils.getParamValue(window.location.href, 'lang', null);
  if (inUrl && this.code)
    window.history.pushState('', this.data('title'), window.location.href.replace('lang=' + inUrl, ''));

  this.code = this.lang = lang.code;
  this.label = lang.label;
  this.icon = lang.icon;
  this.name = lang.name;

  Utils.setCookie('lang', this.name, 365);
  this.load();
  this.setLanguages(Static.languages);

  // call action after language changes.
  this.callback(this);
};

/**
 * Gets text from the translations object using the actual language.
 * @param  {String} key Name of the text.
 */
Lang.prototype.data = function (key) {
  if (!this.lang)
    return Static.translations.USA[key];
  return Static.translations[this.lang][key];
};

/**
 * Gets the error text from the translations object.
 * @param  {String} key Type of error.
 */
Lang.prototype.error = function (key) {
  if (!this.lang)
    return Static.translations.USA.error[key];
  return Static.translations[this.lang].error[key];
};

Lang.prototype.date = function (ts, time) {
  return this.code == 'DEU' ?
      Utils.dateToStringDe(ts, time) :
      Utils.dateToStringEn(ts, time);
};

/**
 * Initializes the listeners of the language selector.
 * @return {[type]} [description]
 */
Lang.prototype.initLanguageSelector = function () {
  var _this = this;
  if (!_this.rootNode) return;

  _this.selected = _this.rootNode.querySelector('#parcelLab_selectedLang');
  _this.dropdown = _this.rootNode.querySelector('#parcelLab_language');

  // if there's a selected language
  if (_this.selected) {
    _this.selected.addEventListener('click', function (e) {
      Utils.toggleDisplay(_this.dropdown);
    });

    document.querySelector('body').addEventListener('click', function (e) {
      if (e.target && !e.target.matches('#parcelLab_selectedLang')) {
        Utils.toggleDisplay(_this.dropdown, true);
      }
    });
  }

  // Dropdown listener
  Utils.eventFromParent('click', '#parcelLab_language', 'a.lang-select', function (e) {
    e.preventDefault();
    var target = e.target;
    var newLang = target.getAttribute('data-lang-id');
    _this.change(newLang);
  });
};

/**
 * Shows an error into the interface.
 * @param  {String} type     Error type.
 * @param  {String} errorHolder The error holder.
 */
Lang.prototype.showError = function (type, errorHolder) {
  var holder = document.querySelector(errorHolder);
  if(holder) holder.innerHTML = this.error(type);
};

/**
 * Set the languages into the dropdown.
 * @param {Array} languages, array of languages.
 * @param {String} langCode, language code.
 */
Lang.prototype.setLanguages = function setLanguages(languages) {
  var _this = this;
  var selected;
  var template = Templates.get('languages');
  var codes = Object.keys(languages);
  var langs = codes.map(function (code, index) {
    var result = languages[code];
    if (result.code === _this.code) selected = result;
    result.i = index;
    return result;
  });
  if(!_this.rootNode) return;
  _this.rootNode.innerHTML = template({ languages: langs });
  var html = '<img src = "' + selected.icon + '"/>  ' + selected.label + ' <span class="parcellab_caret"></span>';
  _this.rootNode.querySelector('#parcelLab_selectedLang').innerHTML = html;
  _this.initLanguageSelector();
};

/**
 * Shows the page in the giving this.
 */
Lang.prototype.load = function loadIn() {
  var _this = this;
  var prediction;
  var ids = Object.keys(Static.langIds);
  ids.forEach(function (id) {
    if (!exists(id)) return;

    var element = document.querySelector(id);
    var info = Static.langIds[id];
    if (info.type == 'empty') {
      element.innerHTML = '';
      return;
    }

    var value = _this[info.type](info.value);
    if (info.value === 'txt-prediction') value = prediction || '';
    if (info.sub) {
      if (info.subTarget === 'data')
        value = value[info.sub];
      else if (info.subTarget === 'this')
        value = value[element.value];
    }

    if (id === '#last_checkpoint') {
      prediction = value;
      return;
    }

    if (!info.attr)
      element.innerHTML = value;
    else if (info.attr)
      element.setAttribute(info.attr, value);

  });

  // set footnote if exists.
  if (exists('#footnote')) {
    var imprintLink = document.getElementById('parcelLab_imprintLink');
    var imprintUrl = null;
    if (imprintLink) imprintUrl = imprintLink.getAttribute('href');
    document.getElementById('footnote').innerHTML = this.data('footnote');
    if (imprintUrl) document.getElementById('parcelLab_imprintLink').setAttribute('href', imprintLink);
  }

  // set help texts
  var helpTexts = this.data('help');
  Object.keys(helpTexts).forEach(function (component) {
    if (exists('#' + component))
      document.getElementById('#' + component).innerHTML = helpTexts[component];
  });

  // set documents title
  document.title = this.data('title');
};

/**
 * Initialzes the hole lang module.
 * @param  {String}   rootNode The selector of the root node.
 * @param  {Function} callback Action being called everytime language changes.
 */
Lang.getLang = function getLang(rootNode, callback) {
  var langInfo = guessLang();
  if (!langInfo) return callback(new Lang({}));
  var lang = new Lang(langInfo, rootNode, callback);
  Utils.setCookie('lang', lang.name, 365);
  lang.load();
  lang.setLanguages(Static.languages);
  callback(lang);
};

module.exports = Lang;
