// deps
const Raven = require('raven-js');
var _$ = require('cash-dom');
if (typeof window.jQuery === 'function')
  _$ = window.jQuery;

// libs
const Api = require('./lib/api');
const statics = require('./lib/static');
const { translate } = require('./lib/translator.js');
const templates = require('../hbs');
const _settings = require('../settings');

// settings
const CURRENT_VERSION_TAG = require('raw!../../VERSION_TAG').trim();
const DEFAULT_ROOT_NODE = _settings.default_root_node;
const DEFAULT_OPTS = _settings.defualt_opts;

/**
 * {class} ParcelLab
 * find information about usage at
 * ~> https://github.com/parcelLab/parcelLab-js-plugin
 */
class ParcelLab {
  constructor(rootNodeQuery, opts) {
    if (!rootNodeQuery) rootNodeQuery = DEFAULT_ROOT_NODE;
    if (rootNodeQuery && typeof rootNodeQuery === 'string') {
      if (_$(rootNodeQuery).get(0)) {
        this.rootNodeQuery = rootNodeQuery;
        this._langCode = navigator.language || navigator.userLanguage;
        if (!opts && typeof opts !== 'object') this.options = DEFAULT_OPTS;
        else this.initOpts(opts);
      } else {
        console.error('🙀 Could not find the rootNode ~> ' + rootNodeQuery);
      }
    }
  }

  ///////////////////////
  // Instance methods //
  //////////////////////

  initialize() {
    Raven.config('https://2b7ac8796fe140b8b8908749849ff1ce@app.getsentry.com/94336', {
      whitelistUrls: [/cdn\.parcellab\.com/],
    }).install();
    this.loading();
    this.orderNo = this.getUrlQuery('orderNo');
    this.trackingNo = this.getUrlQuery('trackingNo');
    this.courier = this.getUrlQuery('courier');
    this.initLanguage();
    this.userId = this.getUrlQuery('u');

    if (this.options.styles) this.initStyles();

    if (this.propsCheck() === false) return this.showError(); // check yourself before you ...

    // do a self update
    this.selfUpdate();

    // get checkpoints
    Api.getCheckpoints(this.props(), (err, res) => {
      if (err) return this.handleError(err);
      else if (res && res.header && res.body) {
        this.checkpoints = res;
        this.renderLayout(this.checkpoints);
        this.initActionBox();
        if (this.options.show_shopInfos) this.initShopInfos();
        this.bindEvents();
      } else {
        this.showError();
      }
    });
  }

  initLanguage() {
    if (this.getUrlQuery('lang')) this._langCode = this.getUrlQuery('lang');
    if (statics.languages[this._langCode]) {
      this.lang = statics.languages[this._langCode];
    } else {
      this.handleWarning('Could not detect user language ... fallback to [EN]!');
      this.lang = statics.languages.en;
    }
  }

  initOpts(opts) {
    for (var key in DEFAULT_OPTS) {
      if (DEFAULT_OPTS.hasOwnProperty(key)) {
        if (!opts[key]) opts[key] = DEFAULT_OPTS[key];
      }
    }

    if (opts.show_searchForm && !opts.userId) console.error('⚠️  You must pass your userId in the options if you want to display a searchForm!');

    this.options = opts;
  }

  initStyles() {
    this.$find().addClass('parcellab-styles');
  }

  initShopInfos() {
    Api.getShopInfos(this.props(), (err, res) => {
      if (err) return this.handleError(err);
      if (res && res.name && res.address) {
        this.renderShopInfos(res);
      }
    });
  }

  initActionBox() {
    if (!this.checkpoints || !this.checkpoints.header) return;
    if (this.checkpoints.header.length > 1 || !this.checkpoints.header[0]) return;
    var actionBox = this.checkpoints.header[0].actionBox;
    if (!actionBox || !actionBox.type) return;
    switch (actionBox.type) {
      case 'pickup-location':
        Api.getPickupLocation(this.props(), (err, res) => {
          if (err) this.handleError(err);
          if (res) {
            res.type = actionBox.type;
            res.address = actionBox.address;
            this.renderActionBox(res);
          }
        });
        break;
      case 'vote-courier':
        this.renderActionBox(actionBox);
        break;
      case 'prediction':
        Api.getPrediction(this.props(), (err, res) => {
          if (err) this.handleError(err);

          // HACK: this will be killed in newer version
          if (res && res instanceof Array) {
            if (res.length === 1) res = res[0].prediction;
          }

          if (res) {
            if (!res.label &&
              this.checkpoints.header[0] &&
              this.checkpoints.header[0].actionBox)
              res.label = this.checkpoints.header[0].actionBox.label; // fallback
            this.renderActionBox(res);
          }
        });
        break;
    }
  }

  props() {
    return {
      trackingNo: this.trackingNo,
      orderNo: this.orderNo,
      courier: this.courier,
      userId: this.userId,
      lang: this.lang,
    };
  }

  propsCheck() {
    var result = false;
    if (this.trackingNo && this.courier) result = true;
    if (this.orderNo && this.userId) result = true;
    return result;
  }

  $find(sel) {
    var buildSelector = (sel) => {
      var res = this.rootNodeQuery;
      if (sel) res += ` ${sel}`;
      return res;
    };

    return _$(buildSelector(sel));
  }

  handleError(err) {
    if (typeof err === 'string')
      console.error(`🙀  ${err}`);
    else if (typeof err === 'object') {
      Raven.captureException(err);
      console.error(`🙀  ${err.message}`);
    }
  }

  handleWarning(err) {
    if (typeof err === 'string')
      console.log(`🐱  ${err}`);
    else if (typeof err === 'object')
      console.log(`🐱  ${err.message}`);
  }

  lsSet(key, val) {
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
        console.log(`😿 Sorry, it looks like your browser storage is corrupted.
        Please clear your storage by going to Tools -> Clear Recent History -> Cookies
        and set time range to 'Everything'.
        This will remove the corrupted browser storage across all sites.`);
      }
    }
  }

  lsGet(key) {
    var res = null;
    try {
      res = localStorage.getItem(key);
    } catch (e) {
      if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
        console.log(`😿 Sorry, it looks like your browser storage is corrupted.
        Please clear your storage by going to Tools -> Clear Recent History -> Cookies
        and set time range to 'Everything'.
        This will remove the corrupted browser storage across all sites.`);
      }
    } finally {
      return res;
    }
  }

  selfUpdate() {
    var lastUpdate = this.lsGet('parcelLab.js.updatedAt');

    // check if selfUpdate was executed in the last 12 h
    if (lastUpdate && lastUpdate > Date.now() - 43200000) {
      return;
    }

    console.log('👻 Searching for new parcelLab.js version...');
    Api.getCurrentPluginVersion((err, versionTag) => {
      if (err) return this.lsSet('parcelLab.js.updatedAt', Date.now());
      else {
        this.lsSet('parcelLab.js.updatedAt', Date.now());
        if (versionTag && versionTag !== CURRENT_VERSION_TAG) {
          console.log('👻 Updating plugin to version ~> ', versionTag);
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

  ///////////////////////////
  // DOM affecting methods //
  ///////////////////////////

  loading(isLoading = true) {
    if (isLoading) {
      this.$find().html(`<div class="pl-loading"><i class="fa fa-refresh fa-spin"></i></div>`);
    } else {
      this.$find().html('');
    }
  }

  showError() {
    var langCode = this.lang.code;
    var ctx = {
      message: statics.translations[langCode].error.delivery,
      showSearchForm: this.options.show_searchForm && this.options.userId,
      inputPlaceholder: translate('searchOrder', langCode),
      buttonText: translate('search', langCode),
    };

    this.innerHTML(templates.error(ctx));
    this.bindEvents();
  }

  bindEvents() {
    var _this = this;

    // show more checkpoints
    _this.$find('.pl-action.pl-show-more-button').on('click', (e) => {
      e.preventDefault();
      _this.$find('.pl-row.pl-alert.hidden').removeClass('hidden');
      _this.$find('.pl-action.pl-show-more-button').remove();
    });

    // toggle tabs
    _this.$find('.pl-tab.pl-btn').on('click', function (e) {
      e.preventDefault();
      var $this = _$(this);
      var $allTrackings = _this.$find('div.parcel_lab_tracking');

      // toggle all active
      _this.$find('.pl-tab.pl-btn').removeClass('pl-active');
      $this.addClass('pl-active');

      // toggle all hidden
      $allTrackings.addClass('hidden');
      _this.$find(`#${$this.attr('href')}`).removeClass('hidden');
    });

    // vote courier
    _this.$find('.pl-courier-vote').on('click', function (e) {
      e.preventDefault();
      var vote = this.dataset.vote;
      _this.$find('.rating-body').html('<i class="fa fa-refresh fa-spin fa-2x"></i>');
      Api.voteCourier(vote, _this.props(), (err) => {
        if (err) {
          _this.handleError(err);
          _this.$('.rating-body').html(`
            <small style="text-align:center;">
              An Error occurred, we are very sorry 😥
            </small>
          `);
        } else {
          _this.$find('.rating-body').html('<i class="fa fa-check fa-2x"></i>');
        }
      });
    });

    // tracking search form
    _this.$find('#pl-ts-search').on('click', function (e) {
      e.preventDefault();
      var orderNo = _this.$find('#pl-ts-trackingno').val();
      var userId = _this.options.userId;
      var langVal = _this.lang.name;

      var props = [
        ['orderNo', orderNo],
        ['u', userId],
        ['lang', langVal],
      ];
      var searchQuery = '?' + props.map(prop => `${prop[0]}=${prop[1]}&`).join('');
      window.location.search = searchQuery;
    });

  }

  switchLayout(full) {
    if (full) {
      this.$find('main.pl-col-8').removeClass('pl-col-8').addClass('pl-col-12');
    } else {
      this.$find('main.pl-col-12').removeClass('pl-col-12').addClass('pl-col-8');
    }
  }

  innerHTML(html) {
    this.loading(false);
    this.$find().html(html);
  }

  renderLayout(data) {
    var ctx = {
      data: data,
      props: this.props(),
    };
    this.innerHTML(templates.layout(ctx));
  }

  renderActionBox(data) {
    this.switchLayout(false);
    data.lang = this.lang; // pickup-loc HACK: add lang
    this.$find('#pl-action-box-container').html(templates.actionBox(data));

    // pickup-loc HACK: reveal opening hours
    var _this = this;
    _this.$find('.pl-toggle-opening-hours').on('click', function (e) {
      e.preventDefault();
      _this.$find('.pl-opening-hours-box>.pl-box-body').toggleClass('pl-open');
    });
  }

  renderShopInfos(data) {
    this.switchLayout(false);
    this.$find('#pl-shop-info-container').html(templates.shopInfos(data));
    this.$find('#pl-mobile-shop-info-container').html(templates.mobileShopInfos(data));
  }

}

module.exports = ParcelLab;
