// deps
require('./lib/polyfills.js')
const updateHTML = require('nanomorph')
const Store = require('nanostore')
const App = require('./components/App')

// libs
const Api = require('./lib/api')
const statics = require('./lib/static')
const { checkQuery } = require('./lib/helpers')
const _settings = require('../settings')

// settings^
const DEFAULT_ROOT_NODE = _settings.default_root_node
const DEFAULT_OPTS = _settings.defualt_opts
const DEFAULT_STYLES = _settings.default_styles

/**
 * {class} ParcelLab
 * find information about usage at
 * ~> https://github.com/parcelLab/parcelLab-js-plugin
 */
class ParcelLab {
  constructor (rootNodeQuery, opts) {
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

  /// ////////////////////
  // Instance methods //
  /// ///////////////////

  initialize () {
    this.orderNo = this.getUrlQuery('orderNo') || this.options.orderNo
    this.xid = this.getUrlQuery('xid') || this.options.xid
    this.trackingNo =
      this.getUrlQuery('trackingNo') ||
      this.getUrlQuery('tno') ||
      this.options.trackingNo
    this.courier =
      this.getUrlQuery('courier') ||
      this.getUrlQuery('c') ||
      this.options.courier
    this.userId =
      this.getUrlQuery('plUserId') || this.getUrlQuery('userId') || this.getUrlQuery('u') || this.options.userId
    this.secureHash =
      this.getUrlQuery('s') ||
      this.getUrlQuery('secureHash') ||
      this.options.secureHash
    this.client =
      this.getUrlQuery('client') ||
      this.getUrlQuery('shop') ||
      this.options.client
    this.zip = this.getUrlQuery('zip') || this.options.zip

    // get note fron url
    this.options.show_note = this.getUrlQuery('show_note')
      ? window.decodeURIComponent(this.getUrlQuery('show_note'))
      : this.options.show_note || null

    this.initLanguage()

    if (this.options.styles) {
      this.initStyles()
      this.setGlobalStyles(this.options.customStyles)
    }

    if (this.getUrlQuery('selectedTrackingNo')) {
      this.options.selectedTrackingNo = this.getUrlQuery('selectedTrackingNo')
    }

    if (this.getUrlQuery('show_searchForm')) {
      this.options.show_searchForm = this.getUrlQuery('show_searchForm')
    }
    if (this.getUrlQuery('show_zipCodeInput')) {
      this.options.show_zipCodeInput = this.getUrlQuery('show_zipCodeInput')
    }
    if (this.getUrlQuery('rerouteButton')) {
      this.options.rerouteButton = this.getUrlQuery('rerouteButton')
    }

    if (this.getUrlQuery('animateTruck')) {
      this.options.animateTruck = true
    }

    if (this.getUrlQuery('banner_image')) {
      this.options.banner_image = decodeURIComponent(
        this.getUrlQuery('banner_image')
      )
    }
    if (this.getUrlQuery('banner_link')) {
      this.options.banner_link = decodeURIComponent(
        this.getUrlQuery('banner_link')
      )
    }

    if (this.getUrlQuery('pwrdBy_parcelLab')) {
      this.options.disableBranding = true
    }
    if (this.getUrlQuery('disableVoting')) {
      this.options.disableVoting = true
    }
    if (this.getUrlQuery('show_articleList')) {
      this.options.show_articleList = true
    }

    if (this.options.icon_theme) {
      // transfer attr for more clarity
      this.options.theme = this.options.icon_theme
    }
    if (this.getUrlQuery('xmas_theme')) {
      this.options.theme = 'xmas'
    }
    if (this.getUrlQuery('easter_theme')) {
      this.options.theme = 'easter'
    }
    if (this.getUrlQuery('icon_theme')) {
      this.options.theme = this.getUrlQuery('icon_theme')
    }

    if (this.getUrlQuery('forceZip')) {
      this.options.forceZip = this.getUrlQuery('forceZip')
    }

    if (this.getUrlQuery('customCss')) {
      this.options.customCssURL = this.getUrlQuery('customCss')
    }

    if (this.getUrlQuery('openinghrs_warn')) {
      this.options.openingHoursWarning = this.getUrlQuery('openinghrs_warn')
    }

    if (this.getUrlQuery('hide_cancelled')) {
      this.options.hideCancelled = ['yes', 'true', '1'].includes(this.getUrlQuery('hide_cancelled'))
    }

    if (this.getUrlQuery('use_origin_courier')) {
      this.options.showOriginCourier = ['yes', 'true', '1'].includes(this.getUrlQuery('use_origin_courier'))
    }

    this.comingFromSearch = !!this.getUrlQuery('comingFromSearch')

    // add custom css if possible
    if (this.options.customCssURL) this.addCustomCss(this.options.customCssURL)

    // set up store
    const queryOK = checkQuery(this.getProps())
    const initialState = {
      query: this.getProps(),
      options: this.options,
      activeTracking: 0,
      comingFromSearch: this.comingFromSearch
    }

    if (!queryOK) initialState.query_err = true
    const store = new Store(initialState)
    this.setupStore(store)

    // render app
    this.el = App(store.get(), store.emit)
    document.querySelector(this.rootNodeQuery).appendChild(this.el)

    if (queryOK) {
      this.__cphash = ''
      store.emit('fetchCheckpoints')

      // instagram post integration
      if (
        this.options.banner_image &&
        this.options.banner_image === 'instagram'
      ) {
        store.emit('fetchInstagram')
      } else if (this.options.show_articleList) {
        store.emit('fetchArticleList')
      }
    }
  }

  initLanguage () {
    const navigatorLang = navigator.language || navigator.userLanguage
    this._langCode = navigatorLang
    if (this.getUrlQuery('lang'))
      this._langCode = this.getUrlQuery('lang')
    else if (this.getUrlQuery('language'))
      this._langCode = this.getUrlQuery('language')
    else if (this.options.lang)
      this._langCode = this.options.lang

    try {
      const fullCode = this._langCode.trim().toLowerCase().split('-')
      fullCode[1] = fullCode[1] || navigatorLang.split('-').pop().toLowerCase()
      this._langCode = fullCode[0]

      if (statics.languages[this._langCode]) {
        this.lang = statics.languages[this._langCode]
        this.lang.fullCode = fullCode.join('-')
      } else {
        throw new Error('whoops no lang found')
      }
    } catch (err) {
      console.log('⚠️  Could not detect user language ... fallback to [EN]!')
      this.lang = statics.languages.en
      this.lang.fullCode = 'en-gb'
    }
  }

  initOpts (opts) {
    Object.keys(DEFAULT_OPTS).forEach(key => {
      if (!opts[key]) opts[key] = DEFAULT_OPTS[key]
    })

    if (opts.show_searchForm && !opts.userId) {
      console.error(
        '⚠️  You must pass your userId in the options if you want to display a searchForm!'
      )
    }

    this.options = opts

    if (opts.customTranslations) {
      window.parcelLab_customTranslations = opts.customTranslations
    }
  }

  initStyles () {
    document.querySelector(this.rootNodeQuery).classList.add('parcellab-styles')
  }

  setGlobalStyles (customStyles) {
    if (!customStyles) customStyles = {}

    if (this.getUrlQuery('borderColor')) {
      customStyles.borderColor = `#${this.getUrlQuery('borderColor')}`
    }
    if (this.getUrlQuery('borderRadius')) {
      customStyles.borderRadius = this.getUrlQuery('borderRadius')
    }
    if (this.getUrlQuery('buttonColor')) {
      customStyles.buttonColor = `#${this.getUrlQuery('buttonColor')}`
    }
    if (this.getUrlQuery('buttonBackground')) {
      customStyles.buttonBackground = `#${this.getUrlQuery('buttonBackground')}`
    }
    if (this.getUrlQuery('buttonBackground')) {
      customStyles.buttonBackground = `#${this.getUrlQuery('buttonBackground')}`
    }
    if (this.getUrlQuery('margin')) {
      customStyles.margin = decodeURIComponent(`${this.getUrlQuery('margin')}`)
    }
    if (this.getUrlQuery('iconColor')) {
      customStyles.iconColor = decodeURIComponent(
        `#${this.getUrlQuery('iconColor')}`
      )
    }
    if (this.getUrlQuery('tabIconColor')) {
      customStyles.tabIconColor = decodeURIComponent(
        `#${this.getUrlQuery('tabIconColor')}`
      )
    }
    if (this.getUrlQuery('activeTabIconColor')) {
      customStyles.activeTabIconColor = decodeURIComponent(
        `#${this.getUrlQuery('activeTabIconColor')}`
      )
    }
    if (this.getUrlQuery('actionIconColor')) {
      customStyles.actionIconColor = decodeURIComponent(
        `#${this.getUrlQuery('actionIconColor')}`
      )
    }
    if (this.getUrlQuery('liveMapColor')) {
      customStyles.liveMapColor = `#${this.getUrlQuery('liveMapColor')}`
    }
    if (this.getUrlQuery('liveMapBackground')) {
      customStyles.liveMapBackground = `#${this.getUrlQuery(
        'liveMapBackground'
      )}`
    }

    Object.keys(DEFAULT_STYLES).forEach(key => {
      if (!customStyles[key]) customStyles[key] = DEFAULT_STYLES[key]
    })

    window.parcelLab_styles = customStyles
  }

  getProps () {
    return {
      trackingNo: this.trackingNo,
      orderNo: this.orderNo,
      xid: this.xid,
      courier: this.courier,
      userId: this.userId,
      client: this.client,
      lang: this.lang,
      s: this.secureHash,
      zip: this.zip
    }
  }

  getUrlQuery (key, url) {
    if (!url) url = window.location.href
    key = key.replace(/[\[\]]/g, '\\$&') // eslint-disable-line
    const regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  sortCheckpoints (checkpoints = {}) {
    try {
      let { header } = checkpoints
      const { body } = checkpoints

      if (header && header.length > 1) {
        let delivered = header.filter(
          h => h.last_delivery_status.code === 'Delivered'
        )
        let notDelivered = header.filter(
          h => h.last_delivery_status.code !== 'Delivered'
        )

        const sortFunc = (x, y) => {
          const xTime = x && x.id ? body[x.id][body.length - 1] : null
          const yTime = y && y.id ? body[y.id][body.length - 1] : null
          const xMS = xTime ? new Date(xTime) : null
          const yMS = yTime ? new Date(yTime) : null
          return xMS > yMS ? -1 : 1
        }

        delivered = delivered.sort(sortFunc)
        notDelivered = notDelivered.sort(sortFunc)
        header = [...notDelivered, ...delivered]
      }

      return { header, body }
    } catch (error) {
      console.log('Could not sort checkpoints... ', error)
      return checkpoints
    }
  }

  findSelectedTrackingIndex ({ header }) {
    const { selectedTrackingNo } = this.options
    let selectedTrackingIndex = 0

    if (selectedTrackingNo && header) {
      for (let i = 0; i < header.length; i++) {
        const elem = header[i]
        if (elem.tracking_number === selectedTrackingNo) {
          selectedTrackingIndex = i
        }
      }
    }

    return selectedTrackingIndex
  }

  setupStore (store) {
    this.store = store

    // update app on ~all~ state changes
    this.store.subscribe(state => {
      const newApp = App(state, store.emit)
      updateHTML(this.el, newApp)

      // run optional onRendered hook
      if (
        this.options.onRendered &&
        typeof this.options.onRendered === 'function'
      ) {
        window.setTimeout(() => {
          try {
            this.options.onRendered(state)
          } catch (e) {
            console.log('ERROR @ onRendered hook!', e.message)
          }
        }, 10)
      }
    })

    // fetch checkpoints
    this.store.on('fetchCheckpoints', () => {
      const { query, options } = this.store.get()
      Api.getCheckpoints(query, options, (err, res) => {
        this.store.set({ apiLoading: false })
        if (err) {
          this.store.set({ fetchCheckpoints_failed: err })
          if (err === 404) store.emit('fetchCourierTrackingUrl')
        } else {
          if (res && res._rt) {
            // refetch checkpoints after 3 sek
            window.setTimeout(() => {
              this.store.emit('fetchCheckpoints')
            }, 3000)
          }

          if (this.__cphash && this.__cphash === this._generateCPhash(res)) {
            // nothing changed after refetch . dont update state
            return null
          } else {
            this.__cphash = this._generateCPhash(res)
            let checkpoints = res || {}
            checkpoints = this.sortCheckpoints(checkpoints)
            const activeTracking = this.findSelectedTrackingIndex(checkpoints)
            this.store.set({ checkpoints, activeTracking })
            this.store.emit('fetchActionBoxData')
          }
        }
      })
    })

    this.store.on('fetchActionBoxData', () => {
      const { checkpoints } = store.get()
      if (checkpoints && checkpoints.header && checkpoints.header.length > 0) {
        checkpoints.header.forEach(cph => {
          const { actionBox } = cph
          if (!actionBox) return null
          if (actionBox.type === 'pickup-location') {
            this.store.emit('fetchPickupLocation', cph.id)
          }
          if (actionBox.type === 'prediction') {
            this.store.emit('fetchPrediction', cph.id)
          }
          if (actionBox.type === 'live-tracking-map') {
            this.store.emit('fetchLiveTrackingCoordinates', cph.id)
          }
        })
      }
    })

    // fetch pickup location
    this.store.on('fetchPickupLocation', id => {
      Api.getPickupLocation({ ...store.get().query, id }, (err, res) => {
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
        else if (res && res.length > 0) {
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

    // fetch prediction
    this.store.on('fetchArticleList', () => {
      Api.getArticleList(this.store.get().query, (err, res) => {
        if (err) this.store.set({ fetchArticleList_failed: err })
        else if (res) {
          const state = this.store.get()
          state.articleList = res
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
      state.showAllArticles = false
      store.set(state)
    })

    this.store.on('showAllCheckpoints', () => {
      this.store.set({ showAllCheckpoints: true })
    })

    this.store.on('showAllArticles', () => {
      this.store.set({ showAllArticles: true })
    })

    this.store.on('voteCourier', (v, tid) => {
      const state = this.store.get()
      Api.voteCourier(v, { ...store.query, id: tid }, (err, res) => {
        state.checkpoints.header = state.checkpoints.header.map(cph => {
          if (cph.id === tid) {
            if (err) cph.actionBox.voteCourierErr = err
            else if (res) cph.actionBox.voteCourierSuccess = res
          }
          return cph
        })
        this.store.set(state)
      })
    })

    this.store.on('voteCommunication', (v, tid) => {
      const state = this.store.get()
      Api.voteCommunication(v, { ...store.query, id: tid }, (err, res) => {
        state.checkpoints.header = state.checkpoints.header.map(cph => {
          if (cph.id === tid) {
            if (err) cph.actionBox.voteCommunicationErr = err
            else if (res) cph.actionBox.voteCommunicationSuccess = res
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

    this.store.on('searchOrder', (input, zip) => {
      const state = this.store.get()
      const userId = state.query.userId || state.options.userId
      const langVal = state.query.lang.name

      const props = [
        ['orderNo', encodeURIComponent(input)],
        ['u', userId],
        ['lang', langVal],
        ['comingFromSearch', 'true']
      ]
      if (zip) props.push(['zip', encodeURIComponent(zip)])
      let searchQuery =
        '?' + props.map(prop => `${prop[0]}=${prop[1]}&`).join('')
      if (searchQuery[searchQuery.length - 1] === '&') {
        searchQuery = searchQuery.slice(0, -1)
      }
      window.location.search = searchQuery
    })

    this.store.on('hideNote', () => {
      this.store.set({ hideNote: true })
    })

    // fetch latest ig post served by our api
    this.store.on('fetchInstagram', () => {
      Api.get(
        _settings.instagram_api_url + '?uid=' + this.userId,
        (err, res) => {
          console.log('RES', { res })
          // console.log('got instagram_api response: ', err, res)
          const state = this.store.get()

          if (res && res.Item && res.Item.posts && res.Item.posts.length > 0) {
            state.options.instagram = res.Item
          } else {
            // log error and fail silently
            console.log('⚠️ failed to retrieve latest instagram post', err)
            state.options.banner_image = null
          }

          this.store.set(state)
        }
      )
    })

    this.store.on('fetchCourierTrackingUrl', () => {
      Api.getCourierTrackingURL({ ...store.get().query }, (err, res) => {
        if (err) return null
        if (res && res.fallback_deeplink) {
          store.set({ fallback_deeplink: res.fallback_deeplink })
        }
      })
    })

    this.store.on('fetchLiveTrackingCoordinates', tid => {
      const { zip, s, lang } = store.get().query
      Api.getLiveTrackingCoordinates({ id: tid, zip, s, lang }, (err, res) => {
        if (err) this.store.set({ liveTrackingMap: err })
        else if (res) {
          const state = this.store.get()
          state.checkpoints.header = state.checkpoints.header.map(cph => {
            if (cph.id === tid) cph.actionBox.data = res
            return cph
          })
          this.store.set(state)
        }
      })
    })

    this.store.on('setZipCode', zip => {
      this.store.set({ apiLoading: true })
      const { query } = store.get()
      query.zip = zip
      // this changes the browser url to contain zip
      if (window.history.replaceState) {
        let url = window.location.href
        let splitter = null
        ;['&zip=', '?zip='].forEach(sp => {
          if (url.indexOf(sp) >= 0) splitter = sp
        })
        if (splitter) {
          let [preZip, restUrl] = url.split(splitter)
          restUrl =
            restUrl.indexOf('&') >= 0
              ? restUrl.substring(restUrl.indexOf('&'))
              : ''
          url = [preZip, `${splitter}${zip}`, restUrl].join('')
        } else {
          let toAppend = `zip=${zip}`
          if (url[url.length - 1] !== '&') toAppend = '&' + toAppend
          url = url + toAppend
        }
        window.history.replaceState(null, document.title, url)
      }
      this.store.set({ query })
      this.store.emit('fetchCheckpoints')
      this.store.emit('fetchArticleList')
    })
  }

  _generateCPhash (obj = {}) {
    if (obj && typeof obj === 'object' && obj.header && obj.body) {
      const { header, body } = obj
      return JSON.stringify({ header, body }).length
    } else return false
  }

  addCustomCss (url) {
    const CSSID = 'pl-customcss'
    const testRGX = /^https:\/\/cdn\.parcellab\.com\/.*\.css$/i
    if (!testRGX.test(url)) {
      return console.log('Custom CSS must be located on the parcelLab CDN.')
    }

    if (!document.getElementById(CSSID)) {
      const head = document.getElementsByTagName('head')[0]
      const newLink = document.createElement('link')
      newLink.id = CSSID
      newLink.rel = 'stylesheet'
      newLink.type = 'text/css'
      newLink.href = url
      newLink.media = 'all'
      head.appendChild(newLink)
    }
  }
}

module.exports = ParcelLab
