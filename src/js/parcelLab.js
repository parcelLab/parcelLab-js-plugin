const Api = require('./lib/api'); // TODO: drop this for native code [fetch]
const statics = require('./lib/static');
const Template = require('../hbs');
const _settings = require('json!../../settings.json');

var $ = require('cash-dom');
if (typeof window.jQuery === 'function')
  $ = window.jQuery;

const CURRENT_VERSION_TAG = require('raw!../../VERSION_TAG').trim();
const BASE_URL = _settings.base_url;
const CHECKPOINTS_ENDPOINT = _settings.checkpoints_endpoint;
const VOTE_ENDPOINT = _settings.vote_endpoint;
const VERSION_URL = _settings.version_url;

/**
 *   TODO:
 *   (get & render shop-infos if needed)
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
      if ($(rootNodeQuery).get(0)) {
        this.rootNodeQuery = rootNodeQuery;
        this.$ = $(rootNodeQuery);
        this._langCode = navigator.language || navigator.userLanguage;
      } else {
        console.error('🙀 Could not find the rootNode ~> ' + rootNodeQuery);
      }
    }

    this.options = opts;
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
    this.actionBox = true; // HACK

    this.selfUpdate();

    // this.loadCSS(); // TODO: problems with fa css

    this.getCheckpoints((err, res)=> {
      if (err) return this.handleError(err);
      else {
        res.header[0].actionBox = {type: 'maps', address: 'Crailsheim'};
        if (res.header.length >= 2) this.actionBox = false; // HACK hide on order
        this.renderHTML(this.checkpointsToHTML(res));
        this.bindEvents();
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

  props() {
    return {
      trackingNo: this.trackingNo,
      orderNo: this.orderNo,
      courier: this.courier,
      userId: this.userId,
      lang: this.lang,
      actionBox: this.actionBox, // TODO: kill
    };
  }

  getCheckpoints(callback) {
    Api.get(Api.toURL(BASE_URL, CHECKPOINTS_ENDPOINT, this.propsToQuery()), true, callback);
  }

  handleError(err) {
    // TODO: send to sentry bro
    if (typeof err === 'string')
      console.error(`🙀  ${err}`);
    else if (typeof err === 'object')
      console.error(`🙀  ${err.message}`);
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
    Api.get(VERSION_URL, false, (err, versionTag)=> {
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
        `<div class="pl-alert pl-alert-danger">
          <i class="fa fa-error"></i> ${statics.translations[this.lang.code].error.delivery}
        </div>`
      );
      return this.handleError(errMsg);
    }

    if (this.lang) result.push({ name: 'lang', value: this.lang.code });
    return result;
  }

  ///////////////////////////
  // DOM affecting methods //
  ///////////////////////////

  loading(isLoading=true) {
    if (isLoading) {
      this.$.html(`<div class="pl-loading"><i class="fa fa-refresh fa-spin"></i></div>`);
    } else {
      this.$.html('');
    }
  }

  bindEvents() {
    var _this = this;

    // show more checkpoints
    _this.$.find('.pl-action.pl-show-more-button').on('click', (e)=> {
      e.preventDefault();
      $('.pl-row.pl-alert.hidden').removeClass('hidden');
      $('.pl-action.pl-show-more-button').remove();
    });

    // toggle tabs
    _this.$.find('.pl-tab.pl-btn').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var $allTrackings = $('div.parcel_lab_tracking');

      // toggle all active
      $('.pl-tab.pl-btn').removeClass('pl-active');
      $this.addClass('pl-active');

      // toggle all hidden
      $allTrackings.addClass('hidden');
      $(`#${$this.attr('href')}`).removeClass('hidden');
    });

    // vote courier
    _this.$.find('.pl-courier-vote').on('click', function (e) {
      e.preventDefault();
      var vote = this.dataset.vote;
      var url = Api.toURL(BASE_URL, `${VOTE_ENDPOINT}${vote}`, _this.propsToQuery());
      _this.$.find('.rating-body').html('<i class="fa fa-refresh fa-spin fa-2x"></i>');
      Api.post(url, null, false, (err)=> {
        if (err) {
          _this.handleError(err);
          _this.$.find('.rating-body').html(`
            <small style="text-align:center;">
              An Error occurred, we are very sorry 😥
            </small>
          `);
        } else {
          _this.$.find('.rating-body').html('<i class="fa fa-check fa-2x"></i>');
        }
      });
    });
  }

  checkpointsToHTML(checkpointData) {
    var context = {
      data: checkpointData,
      props: this.props(),
    };
    var html = Template(context);
    return html;
  }

  renderHTML(html) {
    this.loading(false);
    this.$.html(html);
  }
}

module.exports = ParcelLab;
