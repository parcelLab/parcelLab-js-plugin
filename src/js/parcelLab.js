const Api = require('./lib/api'); // TODO: drop this for native code [fetch]
const defaultsDeep = require('./lib/utils/defaultsDeep');
const statics = require('./lib/static');
const Checkpoints = require('./lib/checkpoints');
const Lang = require('./lib/utils/lang');
const Templates = require('../templates');

const CURRENT_VERSION_TAG = 'P7VM86ZW';
const BASE_URL = 'https://api.parcellab.com/';
const ENDPOINT = 'v2/checkpoints';
const VERSIONURL = 'https://cdn.parcellab.com/js/v2/version.txt';
const CSS_URL = 'https://localhost:3000/parcelLab.min.css'; // TODO: change this

// const FA_URL = 'http://localhost:3000/parcelLab.min.css';

/**
 *   TODO:
 *   (clean legacy code)
 *   (setLang method)
 *   (get & render sendrInfos if enabled)
 *   (render components to optional domNodes)
 */

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

    this.getCheckpoints((err, res)=> {
      if (err) return this.handleError(err);
      else {
        this.renderHTML(this.checkpointsToHTML(res));
      }
    });
  }

  initLanguage() {
    if (this.getUrlQuery('lang')) this._langCode = this.getUrlQuery('lang');
    if (statics.languages[this._langCode]) {
      this.lang = statics.languages[this._langCode];
    } else {
      this.handleError('Could not detect user language ... fallback to [EN]!');
      this.lang = statics.languages.en;
    }
  }

  handleError(err) {
    // TODO: send to sentry bro
    if (typeof err === 'string')
      console.error(err);
    else if (typeof err === 'object')
      console.error(err.message);
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

    console.log('👻 Searching for new parcelLab.js version...');
    Api.getNewestVersionTag(VERSIONURL, (err, versionTag)=> {
      if (err) this.handleError(err);
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
      var errMsg = 'ParcelLab instance has no trackingNo or orderNo! Check the url...';
      this.renderHTML(
        `<div class="pl-alert alert-danger">
          <i class="fa fa-error"></i> ${statics.translations[this.lang.code].error.delivery}
        </div>`
      );
      return this.handleError(errMsg);
    }

    if (this.lang) result.push({ name: 'lang', value: this.lang.code });
    return result;
  }

  //////////////////
  // API wrappers //
  //////////////////

  getCheckpoints(callback) {
    var lang = new Lang(this.lang, null);
    Checkpoints.getCheckpoints(BASE_URL, ENDPOINT, this.propsToQuery(), lang, callback);
  }

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
    // TODO: use external lib for dom stuff because of fkn firefox...
    // show more
    document.querySelector('.pl-btn.show-more-button').addEventListener('click', (e)=> {
      e.preventDefault();
      var allRows = document.querySelectorAll('.pl-row.pl-alert.hidden');
      [].forEach.call(allRows, (row) => {
        row.className = row.className.replace('hidden', '');
      });
      document.querySelector('.pl-btn.show-more-button').remove();
    });

    // toggle tabs
    var allTabBtns = document.querySelectorAll('.pl-tab.pl-btn');
    [].forEach.call(allTabBtns, (elem) => {
      elem.addEventListener('click', (e)=> {
        e.preventDefault();
        var allTrackings = document.querySelectorAll('div.parcel_lab_tracking');

        // remove active from all btns
        [].forEach.call(allTabBtns, (btn) => {
          btn.classList.remove('active');
        });

        // first hide all
        [].forEach.call(allTrackings, (tracking) => {
          tracking.classList.add('hidden');
        });

        // set btn to active
        elem.classList.add('active');

        // show only current trackings
        document.getElementById(elem.getAttribute('href')).classList.remove('hidden');
      });
    });
  }

  checkpointsToHTML(checkpointData) {
    var html = Templates.get('checkpoints')(checkpointData);
    return html;
  }

  renderHTML(html) {
    this.loading(false);
    this.rootNode.innerHTML = html;
    try {
      this.bindEvents();
    } catch (e) {
      this.handleError(e);
    }
  }
}

module.exports = ParcelLab;
