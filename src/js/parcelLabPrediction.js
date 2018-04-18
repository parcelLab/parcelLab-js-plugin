// deps
const Raven = require('raven-js')
let _$ = require('cash-dom')
if (typeof window.jQuery === 'function')
  _$ = window.jQuery

// libs
const Api = require('./lib/api')
const statics = require('./lib/static')
const _settings = require('../settings')

// settings
const DEFAULT_ROOT_NODE = _settings.default_root_node
const DEFAULT_OPTS = _settings.defualt_opts

/**
 * {class} ParcelLab
 * find information about usage at
 * ~> https://github.com/parcelLab/parcelLab-js-plugin
 */
class ParcelLab {
  constructor(rootNodeQuery, opts) {
    if (!rootNodeQuery) rootNodeQuery = DEFAULT_ROOT_NODE
    if (rootNodeQuery && typeof rootNodeQuery === 'string') {
      if (_$(rootNodeQuery).get(0)) {
        this.rootNodeQuery = rootNodeQuery
        this._langCode = navigator.language || navigator.userLanguage
        if (!opts && typeof opts !== 'object') opts = DEFAULT_OPTS
        this.options = opts
      } else {
        console.error('🙀 Could not find the rootNode ~> ' + rootNodeQuery)
      }
    }
  }

  ///////////////////////
  // Instance methods //
  //////////////////////

  initialize() {
    Raven.config('https://2b7ac8796fe140b8b8908749849ff1ce@app.getsentry.com/94336', {
      whitelistUrls: [/cdn\.parcellab\.com/],
    }).install()
    this.initLanguage()

    if (this.propsCheck() === false) return this.showError() // check yourself before you ...

    // do a self update
    this.selfUpdate()

    // get the prediction
    Api.getShopPrediction(this.props(), (err, res) => {
      if (err) return this.handleError(err)
      else if (res) {

        if (res.confidence && res.confidence > 40) {

          const offset = this.options.offset ? this.options.offset : 0
          const min = res.minDeliveryTime + offset
          const max = res.maxDeliveryTime + offset

          let prediction = min === max ? min : min + '-' + max
          if (this.options.prefix) prediction = this.options.prefix + ' ' + prediction
          if (this.options.suffix) prediction += ' ' + this.options.suffix

          this.innerHTML(prediction)

          if (this.options.infoCaption && res.infoCaption && res.infoCaption.length > 0)
            this.$findGlobal(this.options.infoCaption).text(res.infoCaption)
        }

      } else this.showError()
    })
  }

  initLanguage() {
    this._langCode = this.options.language ? this.options.language : 'en'
    if (statics.languages[this._langCode]) {
      this.lang = statics.languages[this._langCode]
    } else {
      this.handleError('Could not detect user language ... fallback to [EN]!')
      this.lang = statics.languages.en
    }
  }

  props() {
    return {
      userId: this.options.userId,
      location: this.options.location,
      courier: this.options.courier,
      lang: {
        code: this._langCode,
      },
    }
  }

  propsCheck() {
    return this.options.userId && this.options.location && this.options.courier
  }

  $find(sel) {
    const buildSelector = sel => {
      let res = this.rootNodeQuery
      if (sel) res += ` ${sel}`
      return res
    }

    return _$(buildSelector(sel))
  }

  $findGlobal(sel) {
    if (!sel) return null
    if (sel && typeof sel === 'string') if (_$(sel)) return _$(sel)
    return null
  }

  handleError(err) {
    if (typeof err === 'string')
      console.error(`🙀  ${err}`)
    else if (typeof err === 'object') {
      Raven.captureException(err)
      console.error(`🙀  ${err.message}`)
    }
  }

  ///////////////////////////
  // DOM affecting methods //
  ///////////////////////////

  // TODO: specifiy where to write errors, currently all errors are silent
  showError() {
    // currently, do nothing
  }

  innerHTML(html) {
    this.$find().html(html)
  }

}

module.exports = ParcelLab
