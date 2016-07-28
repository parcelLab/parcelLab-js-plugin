const _Promise = require('promise'); // TODO: drop this for native code [Promise]
const Api = require('./lib/api'); // TODO: drop this for native code [fetch]
const defaultsDeep = require('./lib/utils/defaultsDeep');
const statics = require('./lib/static');
const Checkpoints = require('./lib/checkpoints');
const Lang = require('./lib/utils/lang');
const Templates = require('../templates');

const CURRENT_VERSION_TAG = 'P7VM86ZW';
const BASE_URL = 'https://api.parcellab.com/';
const ENDPOINT = 'v2/checkpoints';
const CSS_URL = 'http://localhost:3000/parcelLab.min.css'; // TODO: change this

// const FA_URL = 'http://localhost:3000/parcelLab.min.css';

var defaultRootNodeQuery = '#parcelLab-trace-wrapper';
var defaultOpts = {
  senderInfos: {
    enabled: true,
    bindToNodes: {
      faq: '#parcelLab-faq',
      imprint: '#parcelLab-imprint-link',
      questionBox: '#tickets-holder',
      infoBox: '#parcelLab-sender',
      resultBox: '#result-ticket',
    },
  },
  languageSelector: {
    rootNode: '#parcelLab-lang-wrapper',
  },
  errorMessages: {
    bindToNodes: {
      trace: '#parcelLab-trace-wrapper',
      sender: '#parcelLab-sender',
    },
  },
};

/**
 * {Class} ParcelLab
 *   usage:
 *     var parcelLab = new ParcelLab('#root-node-for-checkpoints', opts);
 *     parcelLab.initialize();
 */
class ParcelLab {
  constructor(rootNodeQuery=defaultRootNodeQuery, opts=defaultOpts) {
    // set rootNode
    if (rootNodeQuery && typeof rootNodeQuery === 'string') {
      var rootNode = document.querySelector(rootNodeQuery);
      if (rootNode) {
        this.rootNodeQuery = rootNodeQuery;
        this.rootNode = rootNode;
        this._langCode = navigator.language || navigator.userLanguage;
      } else {
        console.error('🙀 Could not find the rootNode ~> ' + rootNodeQuery);
      }
    }

    // fill up opts with defaultOpts
    this.options = defaultsDeep(opts, defaultOpts);
  }

  ///////////////////////
  // Instance methods //
  //////////////////////

  initialize() {
    this.loading();
    this.orderNo = this.getUrlQuery('orderNo');
    this.trackingNo = this.getUrlQuery('trackingNo');
    this.courier = this.getUrlQuery('courier');
    this.initLanguage();
    this.userId = this.getUrlQuery('u');

    this.selfUpdate();

    // this.loadCSS(); // TODO: problems with fa css

    this.getCheckpoints()
    .then(res => this.renderHTML(this.checkpointsToHTML(res)))
    .catch(err => console.error(err));
  }

  initLanguage() {
    if (this.getUrlQuery('lang')) this._langCode = this.getUrlQuery('lang');
    if (statics.languages[this._langCode]) {
      this.lang = statics.languages[this._langCode];
    } else {
      console.error('🙀 Could not detect user language ... fallback to [EN]!');
      this.lang = statics.languages.en;
    }
  }

  ///////////////////////////
  // Global window methods //
  ///////////////////////////

  selfUpdate() {
    var lastUpdate = localStorage.getItem('parcelLab.js.updatedAt');

    // check if selfUpdate was executed in the last 12 h
    if (lastUpdate && lastUpdate > Date.now() - 43200000) {
      return;
    }

    Api.getNewestVersionTag((err, versionTag)=> {
      if (err) console.error(err);
      else {
        if (versionTag !== CURRENT_VERSION_TAG) {
          console.log('👻 Updating plugin to version ~> ', versionTag);
          localStorage.setItem('parcelLab.js.updatedAt', Date.now());
          window.location.reload(true);
        }
      }
    });
  }

  loadCSS() {
    var link = document.createElement('link');
    link.href = CSS_URL;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  getUrlQuery(key, url) {
    if (!url) url = window.location.href;
    key = key.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  propsToQuery() {
    var result = [];
    if (this.trackingNo) {
      // query for checkpoints by trackingNo
      if (this.trackingNo) result.push({ name: 'trackingNo', value: this.trackingNo });
      if (this.courier) result.push({ name: 'courier', value: this.courier });
    } else if (this.orderNo) {
      // query for checkpoints by orderNo
      if (this.orderNo) result.push({ name: 'orderNo', value: this.orderNo });
      if (this.userId) result.push({ name: 'user', value: this.userId });
      if (this.courier) result.push({ name: 'courier', value: this.courier }); // why not?
    } else {
      var errMsg = '🙀 ParcelLab instance has no trackingNo or orderNo! Check the url...';
      console.error(errMsg);
      throw new Error(errMsg);
    }

    if (this.lang) result.push({ name: 'lang', value: this.lang.code });
    return result;
  }

  //////////////////
  // API wrappers //
  //////////////////

  getCheckpoints() {
    return new _Promise((resolve, reject)=> {
      var lang = new Lang(this.lang, null);
      Checkpoints.getCheckpoints(BASE_URL, ENDPOINT, this.propsToQuery(), lang,
        function (err, res) {
          if (err)
            reject(err);
          else
            resolve(res);
        });
    });
  }

  checkpointsToHTML(checkpointData) {
    var html = Templates.get('checkpoints')(checkpointData);
    return html;
  }

  // getCheckpoints() {
  //   return new _Promise((resolve, reject)=> {
  //     Api.loadFromAPI(BASE_URL, ENDPOINT, this.propsToQuery(), 'GET', null,
  //       function (err, result) {
  //         if (err) reject(err);
  //         else resolve(result);
  //       });
  //   });
  // }

  ///////////////////////////
  // DOM affecting methods //
  ///////////////////////////

  loading(isLoading=true) {
    if (isLoading) {
      this.rootNode.innerHTML = `<div class="loading"><i class="fa fa-refresh fa-spin"></i></div>`;
    } else {
      this.rootNode.innerHTML = '';
    }
  }

  bindEvents() {
    document.querySelector('.pl-btn.show-more-button').addEventListener('click', (e)=> {
      e.preventDefault();
      document.querySelectorAll('.pl-row.pl-alert.hidden').forEach(row => {
        row.className = row.className.replace('hidden', '');
      });
      e.srcElement.remove();
    });
  }

  renderHTML(html) {
    this.loading(false);
    this.rootNode.innerHTML = html;
    try {
      this.bindEvents();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ParcelLab;
