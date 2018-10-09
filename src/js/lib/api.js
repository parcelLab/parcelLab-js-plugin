const _settings = require('../../settings')
const BASE_URL = _settings.base_url
const CHECKPOINTS_ENDPOINT = _settings.checkpoints_endpoint
const VOTE_ENDPOINT = _settings.vote_endpoint
const VOTE_COMMUNICATION_ENDPOINT = _settings.vote_communication_endpoint
const PICKUP_LOCATION_ENDPOINT = _settings.pickup_location_endpoint
const PREDICTION_ENDPOINT = _settings.prediction_endpoint
const SHOP_PREDICTION_ENDPOINT = _settings.shop_prediction_endpoint
const USER_ACTIVITY_ENDPOINT = _settings.user_activity_endpoint

// API calls for all the modules
const status = {
  DONE: 4,
  OK: 200,
}

//////////////
// Handlers //
//////////////

function handleJSON(text) {
  let json = null
  try {
    json = JSON.parse(text)
  } catch (err) {
    return text
  }

  if (json) return json
  else return text
}

function handleFetchResponse(res) {
  if (!res) throw new Error('Cant parse empty handleFetchResponse')
  if (!res.headers) return res
  if (res.status >= 200 && res.status < 300) {
    return res
  } else if (res.status === 404) return null // HACK: for tracking not found
  else throw new Error(`Request Error at fetch: ${res.status} ~> ${res.statusText}`)
}

function handleRequestResponse(request, callback) {
  if (!request) return callback(new Error('Cant parse empty requestResponse'))
  if (request && request.status >= 200 && request.status < 300) {
    return callback(null, handleJSON(request.responseText.trim()))
  } else {
    return callback(`Request Error at xhr request: ${request.status} ~> ${request.responseText}`)
  }
}

/////////////
// METHODS //
/////////////

function _get(url, callback) {
  if (window && window.fetch) {
    window.fetch(url)
      .then(res => handleFetchResponse(res))
      .then(res => res.text())
      .then(res =>  handleJSON(res))
      .then(res => callback(null, res))
      .catch(err => callback(err))
  } else {
    // Fallback if no fetch available
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.onreadystatechange = function () {
      if (request.readyState === status.DONE) {
        handleRequestResponse(request, callback)
      }
    }

    request.send()
  }
}

function _post(url, data, callback) {
  if (!data) data = {}
  if (window && window.fetch) { // use fetch api
    const headers = {}
    if (typeof data === 'object') headers['Content-Type'] = 'application/json'
    window.fetch(url, { method: 'POST', headers, body: JSON.stringify(data) })
      .then(res => handleFetchResponse(res))
      .then(res => res.text())
      .then(json => callback(null, json))
      .catch(err => callback(err))
  } else { // use XMLHttpRequest // TODO : send json
    const request = new XMLHttpRequest()
    request.open('POST', url)
    if (typeof data === 'object') request.setRequestHeader('Content-Type', 'application/json')
    request.onreadystatechange = function () {
      if (request.readyState === status.DONE) {
        handleRequestResponse(request, callback)
      }
    }

    if (typeof data === 'object')
      request.send(JSON.stringify(data))
    else
      request.send(data)
  }
}

function _toURL(baseUrl, endpoint, queryArr) {
  let url = baseUrl + endpoint + '/?'

  queryArr.forEach(param => {
    // query transformations for API
    switch (param.name) {
    case 'trackingNo':
      param.name = 'tno'
      param.value = encodeURIComponent(param.value)
      break
    case 'u':
      param.name = 'user'
      break
    case 'orderNo':
      param.value = encodeURIComponent(param.value)
      break
    case 'client':
      param.value = encodeURIComponent(param.value)
      break
    }

    url += param.name + '=' + param.value + '&'
  })

  return url
}

function _objToQueryArr(propsObj) {
  const result = []
  if (propsObj.id) {
    result.push({ name: 'id', value: propsObj.id })
  } else if (propsObj.trackingNo) {
    // query for checkpoints by trackingNo
    if (propsObj.trackingNo) result.push({ name: 'trackingNo', value: propsObj.trackingNo })
    if (propsObj.courier) result.push({ name: 'courier', value: propsObj.courier })
    if (propsObj.zip) result.push({ name: 'zip', value: propsObj.zip })
  } else if (propsObj.orderNo) {
    // query for checkpoints by orderNo
    if (propsObj.orderNo) result.push({ name: 'orderNo', value: propsObj.orderNo })
    if (propsObj.userId) result.push({ name: 'user', value: propsObj.userId })
    if (propsObj.courier) result.push({ name: 'courier', value: propsObj.courier }) // why not?
    if (propsObj.zip) result.push({ name: 'zip', value: propsObj.zip })
    if (propsObj.client) result.push({ name: 'client', value: propsObj.client })
  } else if (propsObj.xid) {
    if (propsObj.xid) result.push({ name: 'xid', value: propsObj.xid })
    if (propsObj.userId) result.push({ name: 'user', value: propsObj.userId })
    if (propsObj.zip) result.push({ name: 'zip', value: propsObj.zip })
  } else if (propsObj.location) {
    // query for a shop prediction
    if (propsObj.location) result.push({ name: 'location', value: propsObj.location })
    if (propsObj.userId) result.push({ name: 'u', value: propsObj.userId })
    if (propsObj.courier) result.push({ name: 'courier', value: propsObj.courier })
  }

  if (propsObj.lang) result.push({ name: 'lang', value: propsObj.lang.name })
  if (propsObj.s) result.push({ name: 's', value: propsObj.s })

  return result
}

/////////////
// Exports //
/////////////

exports.get = _get

exports.post = _post

exports.toURL = _toURL

exports.getCheckpoints = function (propsObj, callback) {
  _get(_toURL(BASE_URL, CHECKPOINTS_ENDPOINT, _objToQueryArr(propsObj)), callback)
}

exports.getPickupLocation = function (propsObj, callback) {
  _get(_toURL(BASE_URL, PICKUP_LOCATION_ENDPOINT, _objToQueryArr(propsObj)), callback)
}

exports.getPrediction = function (propsObj, callback) {
  _get(_toURL(BASE_URL, PREDICTION_ENDPOINT, _objToQueryArr(propsObj)), callback)
}

exports.getShopPrediction = function (propsObj, callback) {
  _get(_toURL(BASE_URL, SHOP_PREDICTION_ENDPOINT, _objToQueryArr(propsObj)), callback)
}

exports.voteCourier = function (vote, propsObj, callback) {
  if (['up', 'down'].indexOf(vote) < 0) callback(new Error('Wrong argument for vote!'))
  const url = _toURL(BASE_URL, `${VOTE_ENDPOINT}${vote}`, _objToQueryArr(propsObj))
  _post(url, {}, callback)
}

exports.voteCommunication = function (vote, propsObj, callback) {
  if (['up', 'down'].indexOf(vote) < 0) callback(new Error('Wrong argument for vote!'))
  const url = _toURL(BASE_URL, `${VOTE_COMMUNICATION_ENDPOINT}${vote}`, _objToQueryArr(propsObj))
  _post(url, {}, callback)
}

exports.saveUAct = function (link, propsObj, callback) {
  const url = _toURL(BASE_URL, USER_ACTIVITY_ENDPOINT, _objToQueryArr(propsObj))
  const data = { link: link }
  _post(url, data, callback)
}
