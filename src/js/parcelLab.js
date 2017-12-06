// deps
require('./lib/polyfills.js')
const Raven = require('raven-js')
const html = require('yo-yo')
const store = require('./store')
const App = require('./components/App')

// libs
const Api = require('./lib/api')
const statics = require('./lib/static')
const _settings = require('../settings')

// settings
const CURRENT_VERSION_TAG = require('raw!../../VERSION_TAG').trim()
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
      if (document.querySelector(rootNodeQuery)) {
        this.rootNodeQuery = rootNodeQuery
        this._langCode = navigator.language || navigator.userLanguage
        if (!opts && typeof opts !== 'object') this.options = DEFAULT_OPTS
        else this.initOpts(opts)
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

    this.orderNo = this.options.orderNo || this.getUrlQuery('orderNo')
    this.trackingNo = this.options.trackingNo || this.getUrlQuery('trackingNo')
    this.courier = this.options.courier || this.getUrlQuery('courier')
    this.userId = this.options.userId || this.getUrlQuery('u')
    this.secureHash = this.options.secureHash || this.getUrlQuery('s')
    this.initLanguage()

    if (this.options.styles) this.initStyles()

    // do a self update
    this.selfUpdate()

    // set up store
    store.set({ query: this.props(), options: this.options, activeTracking: 0 })
    this.setupStore(store)

    // render app
    this.el = App(store.get(), store.emit)
    document.querySelector(this.rootNodeQuery).appendChild(this.el)

    store.emit('fetchCheckpoints')
    if (this.options.show_shopInfos) store.emit('fetchShopInfos')
  }

  initLanguage() {
    if (!this._langCode && this.getUrlQuery('lang')) this._langCode = this.getUrlQuery('lang')
    else if (!this._langCode && this.getUrlQuery('language')) this._langCode = this.getUrlQuery('language')
    if (statics.languages[this._langCode]) {
      this.lang = statics.languages[this._langCode]
    } else {
      this.handleWarning('Could not detect user language ... fallback to [EN]!')
      this.lang = statics.languages.en
    }
  }

  initOpts(opts) {
    for (const key in DEFAULT_OPTS) {
      if (DEFAULT_OPTS.hasOwnProperty(key)) {
        if (!opts[key]) opts[key] = DEFAULT_OPTS[key]
      }
    }

    if (opts.show_searchForm && !opts.userId) 
      console.error('⚠️  You must pass your userId in the options if you want to display a searchForm!')

    this.options = opts
  }

  initStyles() {
    document.querySelector(this.rootNodeQuery).classList.add('parcellab-styles')
  }

  props() {
    return {
      trackingNo: this.trackingNo,
      orderNo: this.orderNo,
      courier: this.courier,
      userId: this.userId,
      lang: this.lang,
      s: this.secureHash,
    }
  }

  lsSet(key, val) {
    try {
      localStorage.setItem(key, val)
    } catch (e) {
      if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
        console.log(`😿 Sorry, it looks like your browser storage is corrupted.
        Please clear your storage by going to Tools -> Clear Recent History -> Cookies
        and set time range to 'Everything'.
        This will remove the corrupted browser storage across all sites.`)
      }
    }
  }

  lsGet(key) {
    let res = null
    try {
      res = localStorage.getItem(key)
    } catch (e) {
      if (e.name === 'NS_ERROR_FILE_CORRUPTED') {
        console.log(`😿 Sorry, it looks like your browser storage is corrupted.
        Please clear your storage by going to Tools -> Clear Recent History -> Cookies
        and set time range to 'Everything'.
        This will remove the corrupted browser storage across all sites.`)
      }
    } finally {
      return res
    }
  }

  selfUpdate() {
    const lastUpdate = this.lsGet('parcelLab.js.updatedAt')

    // check if selfUpdate was executed in the last 12 h
    if (lastUpdate && lastUpdate > Date.now() - 43200000) {
      return
    }

    console.log('👻 Searching for new parcelLab.js version...')
    Api.getCurrentPluginVersion((err, versionTag) => {
      if (err) return this.lsSet('parcelLab.js.updatedAt', Date.now())
      else {
        this.lsSet('parcelLab.js.updatedAt', Date.now())
        if (versionTag && versionTag !== CURRENT_VERSION_TAG) {
          console.log('👻 Updating plugin to version ~> ', versionTag)
          window.location.reload(true)
        }
      }
    })
  }

  getUrlQuery(key, url) {
    if (!url) url = window.location.href
    key = key.replace(/[\[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  setupStore(store) {
    // update app on ~all~ state changes
    store.subscribe(state => {
      const newApp = App(state, store.emit)
      html.update(this.el, newApp)
    })

    // fetch checkpoints
    store.on('fetchCheckpoints', () => {
      Api.getCheckpoints(store.get().query, (err, res) => {
        if (err) store.set({ apiError: err, })
        else store.set({ checkpoints: res })
      })
    })

    // fetch shop infos
    store.on('fetchShopInfos', () => {
      Api.getShopInfos(store.get().query, (err, res) => {
        if (err) store.get({ apiError: err })
        else store.get({ shopInfos: res })
      })
    })

    // fetch pickup location
    store.on('fetchPickupLocation', () => {
      Api.getPickupLocation(store.get().query, (err, res) => {
        if (err) store.get({ apiError: err })
        else store.get({ pickupLocation: res })
      })
    })

    // fetch prediction
    store.on('fetchPrediction', () => {
      Api.getPrediction(store.get().query, (err, res) => {
        if (err) store.get({ apiError: err })
        else store.get({ pickupLocation: res })
      })
    })

    store.on('showAllCheckpoints', () => {
      store.set({ showAllCheckpoints: true })
    })
  }
}

module.exports = ParcelLab
