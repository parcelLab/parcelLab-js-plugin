// deps
const Raven = require('raven-js');
var _$ = require('cash-dom');
if (typeof window.jQuery === 'function')
  _$ = window.jQuery;

// libs
const Api = require('./lib/api');
const statics = require('./lib/static');
const Template = require('../hbs');
const _settings = require('json!../../settings.json');

// settings
const CURRENT_VERSION_TAG = require('raw!../../VERSION_TAG').trim();
const BASE_URL = _settings.base_url;
const CHECKPOINTS_ENDPOINT = _settings.checkpoints_endpoint;
const VOTE_ENDPOINT = _settings.vote_endpoint;
const PREDICTION_ENDPOINT = _settings.prediction_endpoint;
const VERSION_URL = _settings.version_url;
const DEFAULT_ROOT_NODE = _settings.default_root_node;
const DEFAULT_OPTS = _settings.default_opts;

/**
 * {class} ParcelLab
 * find information about usage at
 * ~> https://github.com/parcelLab/parcelLab-js-plugin
 */
class ParcelLab {
  constructor(rootNodeQuery=DEFAULT_ROOT_NODE, opts=DEFAULT_OPTS) {
    // set rootNode
    if (rootNodeQuery && typeof rootNodeQuery === 'string') {
      if (_$(rootNodeQuery).get(0)) {
        this.rootNodeQuery = rootNodeQuery;
        this.$ = _$(rootNodeQuery);
        this.$el = ()=> _$(rootNodeQuery);
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
    Raven.config('https://2b7ac8796fe140b8b8908749849ff1ce@app.getsentry.com/94336', {
      whitelistUrls: [/cdn\.parcellab\.com/]
    }).install();
    this.loading();
    this.orderNo = this.getUrlQuery('orderNo');
    this.trackingNo = this.getUrlQuery('trackingNo');
    this.courier = this.getUrlQuery('courier');
    this.initLanguage();
    this.userId = this.getUrlQuery('u');
    this.showActionBox = true; // HACK

    this.selfUpdate();

    this.getCheckpoints((err, res)=> {
      if (err) return this.handleError(err);
      else {
        if (res.header.length >= 2) this.showActionBox = false; // HACK

        // render layout and bind events
        this.renderHTML(this.checkpointsToHTML(res));
        this.bindEvents();
        // get prediction
        if (res && res.header &&res.header[0] && res.header[0].actionBox.type === 'prediction') {
          this.getPrediction((err, res) => {
            if (err) {
              this.hideActionBox();
              this.handleError(err);
            }

            if (res && res.actionBox) {
              this.renderPrediciton(res.actionBox);
            } else {
              this.hideActionBox();
            }
          });
        }
      
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
      showActionBox: this.showActionBox, // HACK
    };
  }

  selector(sel) {
    var res = this.rootNodeQuery;
    if (sel) res += ` ${sel}`;
    return res; 
  }

  // TODO: transfer em to api.js
  getCheckpoints(callback) {
    Api.get(Api.toURL(BASE_URL, CHECKPOINTS_ENDPOINT, this.propsToQuery()), callback);
  }

  getPrediction(callback) {
    Api.get(
      Api.toURL(BASE_URL, PREDICTION_ENDPOINT, this.propsToQuery()),
      callback
    );
  }

  handleError(err) {
    if (typeof err === 'string')
      console.error(`🙀  ${err}`);
    else if (typeof err === 'object') {
      Raven.captureException(err);
      console.error(`🙀  ${err.message}`);
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

    console.log('👻 Searching for new parcelLab.js version...');
    Api.get(VERSION_URL, (err, versionTag)=> {
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
    var sel = _this.selector.bind(_this); // HACK : because of cash-dom
    
    // show more checkpoints
    _$(sel('.pl-action.pl-show-more-button')).on('click', (e)=> {
      e.preventDefault();
      _$(sel('.pl-row.pl-alert.hidden')).removeClass('hidden');
      _$(sel('.pl-action.pl-show-more-button')).remove();
    });
    
    // toggle tabs
    _$(sel('.pl-tab.pl-btn')).on('click', function (e) {
      e.preventDefault();
      var $this = _$(this);
      var $allTrackings = _$(sel('div.parcel_lab_tracking'));

      // toggle all active
      _$(sel('.pl-tab.pl-btn')).removeClass('pl-active');
      $this.addClass('pl-active');

      // toggle all hidden
      $allTrackings.addClass('hidden');
      _$(sel(`#${$this.attr('href')}`)).removeClass('hidden');
    });

    // vote courier
    _$(sel('.pl-courier-vote')).on('click', function (e) {
      e.preventDefault();
      var vote = this.dataset.vote;
      var url = Api.toURL(BASE_URL, `${VOTE_ENDPOINT}${vote}`, _this.propsToQuery());
      _$(sel('.rating-body')).html('<i class="fa fa-refresh fa-spin fa-2x"></i>');
      Api.post(url, {}, (err)=> {
        if (err) {
          _this.handleError(err);
          _$(sel('.rating-body')).html(`
            <small style="text-align:center;">
              An Error occurred, we are very sorry 😥
            </small>
          `);
        } else {
          _$(sel('.rating-body')).html('<i class="fa fa-check fa-2x"></i>');
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

  renderPrediciton(data) {
    var $predictionRoot = this.$.find('.pl-box-prediction');
    if (!data || !data.label || !data.dateOfMonth || !data.month || !data.dayOfWeek) {
      var $aside = $predictionRoot.parent().parent();
      return $aside.removeClass('pl-box-aside');
    }

    var cal = `
      <div class="pl-cal-week-day">${data.dayOfWeek}</div>
      <div class="pl-cal-day">${data.dateOfMonth}</div>
      <div class="pl-cal-month">${data.month}</div>
    `;
    $predictionRoot.html(cal);
    this.$.find('.pl-prediction-caption').html(data.caption);
    if (data.startTime) {
      var timeText = data.startTime;
      if (data.endTime) timeText += ' - ' + data.endTime;
      if (data.timeCaption) timeText += `<br> <small>${data.timeCaption}</small>`;
      this.$.find('.pl-time-container').html(`
        <div class="pl-box pl-box-time">
          ${timeText}
        </div>
      `);
      this.$.find('.pl-time-caption').html(data.caption);
    }
  }

  hideActionBox() {
    this.$.find('aside').remove();
    this.$.find('.pl-main.pl-col-8').removeClass('pl-col-8').addClass('pl-col-12');
  }
}

module.exports = ParcelLab;
