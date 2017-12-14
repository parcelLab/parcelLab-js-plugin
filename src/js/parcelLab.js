// deps
require('./lib/polyfills.js')
const Raven = require('raven-js')
const updateHTML = require('nanomorph')
const Store = require('nanostore')
const App = require('./components/App')

// libs
const Api = require('./lib/api')
const statics = require('./lib/static')
const { checkQuery } = require('./lib/helpers')
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
    if (!this.options.selectedTrackingNo) 
      this.options.selectedTrackingNo = this.getUrlQuery('selectedTrackingNo')
    
    // do a self update
    this.selfUpdate()
    
    // set up store
    const queryOK = checkQuery(this.getProps())
    const initialState = { query: this.getProps(), options: this.options, activeTracking: 0 }
    if (!queryOK) initialState['query_err'] = true
    const store = new Store(initialState)
    this.setupStore(store)

    // render app
    this.el = App(store.get(), store.emit)
    document.querySelector(this.rootNodeQuery).appendChild(this.el)

    if (queryOK) {
      store.emit('fetchCheckpoints')
      if (this.options.show_shopInfos) store.emit('fetchShopInfos')
    }
  }

  initLanguage() {
    this._langCode = navigator.language || navigator.userLanguage
    if (this.getUrlQuery('lang')) this._langCode = this.getUrlQuery('lang')
    else if (this.getUrlQuery('language')) this._langCode = this.getUrlQuery('language')
    try {
      if (this._langCode.indexOf('-') > 0) this._langCode = this._langCode.split('-')[0]
      if (statics.languages[this._langCode])
        this.lang = statics.languages[this._langCode]
      else
        throw new Error('whoops no lang found')
    } catch (err) {
      console.log('⚠️  Could not detect user language ... fallback to [EN]!')
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

  getProps() {
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

  sortCheckpoints(checkpoints={}) {
    try {
      let { header } = checkpoints
      const { body } = checkpoints

      if (header && header.length > 1) {
        header = header.sort((x, y) => {
          const xTime = x && x.id ? body[x.id][body.length - 1] : null
          const yTime = y && y.id ? body[y.id][body.length - 1] : null
          const xMS = xTime ? new Date(xTime) : null
          const yMS = yTime ? new Date(yTime) : null
          return xMS > yMS ? -1 : 1
        })
      }

      return { header, body }
    } catch (error) {
      console.log('💩  Could not sort checkpoints... ', error)
      return checkpoints
    }
  }

  findSelectedTrackingIndex({ header }) {
    const { selectedTrackingNo } = this.options
    if (selectedTrackingNo && header) {
      for (let i = 0; i < header.length; i++) {
        const elem = header[i]
        if (elem.tracking_number === selectedTrackingNo) return i
      }
    } else return 0
  }

  setupStore(store) {
    this.store = store

    // update app on ~all~ state changes
    this.store.subscribe(state => {
      console.log(state)
      const newApp = App(state, store.emit)
      updateHTML(this.el, newApp)
    })

    // fetch checkpoints
    this.store.on('fetchCheckpoints', () => {
      Api.getCheckpoints(this.store.get().query, (err, res) => {
        if (err) this.store.set({ fetchCheckpoints_failed: err, })
        else {
          let checkpoints = res || []
          checkpoints = this.sortCheckpoints(checkpoints)
          const activeTracking = this.findSelectedTrackingIndex(checkpoints)
          this.store.set({ checkpoints, activeTracking })
          this.store.emit('fetchActionBoxData')
        }
      })
    })

    this.store.on('fetchActionBoxData', () => {
      const { checkpoints } = store.get()
      if (checkpoints && checkpoints.header && checkpoints.header.length > 0) {
        checkpoints.header.forEach(cph => {
          const { actionBox } = cph
          if (actionBox.type === 'pickup-location') {
            store.emit('fetchPickupLocation', cph.id)
          }
          if (actionBox.type === 'prediction') {
            store.emit('fetchPrediction', cph.id)
          }
        })
      }
    })

    // fetch shop infos
    this.store.on('fetchShopInfos', () => {
      Api.getShopInfos(store.get().query, (err, res) => {
        if (err) this.store.set({ fetchShopInfos_failed: err })
        else this.store.set({ shopInfos: res })
      })
    })

    // fetch pickup location
    this.store.on('fetchPickupLocation', id => {
      console.log('fetching pickup location for ', id)
      Api.getPickupLocation({...store.get().query, id}, (err, res) => {
        if (err) this.store.set({ fetchPickupLocation_failed: err })
        else if (res) {
          const state = this.store.get()
          state.checkpoints.header = state.checkpoints.header.map(cph => {
            if (cph.id === id) cph.actionBox.data = res
            return cph
          })
          this.store.set(state)
        }
      })
    })

    // fetch prediction
    this.store.on('fetchPrediction', id => {
      Api.getPrediction({ ...store.get().query, id }, (err, res) => {
        if (err) this.store.set({ fetchPrediction_failed: err })
        else if (res) {
          const data = res[0]
          const state = this.store.get()
          state.checkpoints.header = state.checkpoints.header.map(cph => {
            if (cph.id === data._ref) cph.actionBox.data = data.prediction
            return cph
          })
          this.store.set(state)
        }
      })
    })

    this.store.on('setActiveTracking', id => {
      const state = this.store.get()
      state.checkpoints.header.forEach((cph, ind) => {
        if (cph.id === id) state.activeTracking = ind
      })
      state.showAllCheckpoints = false
      store.set(state)
    })

    this.store.on('showAllCheckpoints', () => {
      this.store.set({ showAllCheckpoints: true })
    })

    this.store.on('voteCourier', (v, tid) => {
      const state = this.store.get()
      Api.voteCourier(v, { ...store.query, id: tid }, (err, res) => {
        state.checkpoints.header = state.checkpoints.header.map(cph => {
          if (cph.id === tid) {
            if (err) cph.actionBox.voteErr = err
            else if (res) cph.actionBox.voteSuccess = res
          }
          return cph
        })
        this.store.set(state)
      })
    })

    this.store.on('toggleOpeningHours', tid => {
      const state = this.store.get()
      state.checkpoints.header = state.checkpoints.header.map(cph => {
        if (cph.id === tid) {
          cph.actionBox.boxOpen = !cph.actionBox.boxOpen
        }
        return cph
      })
      this.store.set(state)
    })

    this.store.on('searchOrder', input => {
      const state = this.store.get()
      const userId = state.options.userId
      const langVal = state.query.lang.name

      const props = [
        ['orderNo', input],
        ['u', userId],
        ['lang', langVal],
      ]
      const searchQuery = '?' + props.map(prop => `${prop[0]}=${prop[1]}&`).join('')
      window.location.search = searchQuery
    })
  }
}

module.exports = ParcelLab
