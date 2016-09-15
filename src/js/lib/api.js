const _settings = require('json!../../../settings.json');
const BASE_URL = _settings.base_url;
const CHECKPOINTS_ENDPOINT = _settings.checkpoints_endpoint;
const VOTE_ENDPOINT = _settings.vote_endpoint;
const SENDER_ENDPOINT = _settings.sender_endpoint;
const PREDICTION_ENDPOINT = _settings.prediction_endpoint;
const SHOP_PREDICTION_ENDPOINT = _settings.shop_prediction_endpoint;
const VERSION_URL = _settings.version_url;

// API calls for all the modules
var status = {
  DONE: 4,
  OK: 200,
};

//////////////
// Handlers //
//////////////

function handleJSON(text) {
  var json = null;
  try {
    json = JSON.parse(text);
  } catch (err) {
    return text;
  }

  if (json) return json;
  else return text;
}

function handleFetchResponse(res) {
  if (!res) throw new Error('Cant parse empty handleFetchResponse');
  if (!res.headers) return res.text();
  if (res.status >= 200 && res.status < 300) {
    return res.text();
  } else {
    if (res.status === 404) return null; // HACK: for tracking not found
    else throw new Error(`Request Error at fetch: ${res.status} ~> ${res.statusText}`);
  }
}

function handleRequestResponse(request, callback) {
  if (!request) return callback(new Error('Cant parse empty requestResponse'));
  if (request && request.status >= 200 && request.status < 300) {
    return callback(null, handleJSON(request.responseText.trim()));
  } else {
    return callback(`Request Error at xhr request: ${request.status} ~> ${request.responseText}`);
  }
}

/////////////
// METHODS //
/////////////

function _get(url, callback) {
  if (window && window.fetch) {
    window.fetch(url)
    .then(res => handleFetchResponse(res))
    .then(res =>  handleJSON(res))
    .then(res => callback(null, res))
    .catch(err => callback(err));
  } else {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
      if (request.readyState === status.DONE) {
        handleRequestResponse(request, callback);
      }
    };

    request.send();
  }
}

function _post(url, data, callback) {
  if (!data) data = {};
  if (window && window.fetch) {
    window.fetch(url, { method: 'POST', body: JSON.stringify(data), })
    .then(res => handleFetchResponse(res))
    .then(json => callback(null, json))
    .catch(err => callback(err));
  } else {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function () {
      if (request.readyState === status.DONE) {
        handleRequestResponse(request, callback);
      }
    };

    if (typeof data === 'object')
      request.send(JSON.stringify(data));
    else
      request.send(data);
  }
}

function _toURL(baseUrl, endpoint, queryArr) {
  var url = baseUrl + endpoint + '/?';

  queryArr.forEach(function (param) {
    switch (param.name) {
      case 'trackingNo':
        param.name = 'tno';
        break;
      case 'u':
        param.name = 'user';
        break;
    }
    url += param.name + '=' + param.value + '&';
  });

  return url;
}

function _objToQueryArr(propsObj) {
  var result = [];
  if (propsObj.trackingNo) {
    // query for checkpoints by trackingNo
    if (propsObj.trackingNo) result.push({ name: 'trackingNo', value: propsObj.trackingNo });
    if (propsObj.courier) result.push({ name: 'courier', value: propsObj.courier });
  } else if (propsObj.orderNo) {
    // query for checkpoints by orderNo
    if (propsObj.orderNo) result.push({ name: 'orderNo', value: propsObj.orderNo });
    if (propsObj.userId) result.push({ name: 'user', value: propsObj.userId });
    if (propsObj.courier) result.push({ name: 'courier', value: propsObj.courier }); // why not?
  } else if (propsObj.location) {
    // query for a shop prediction
    if (propsObj.location) result.push({ name: 'location', value: propsObj.location });
    if (propsObj.userId) result.push({ name: 'u', value: propsObj.userId });
    if (propsObj.courier) result.push({ name: 'courier', value: propsObj.courier });
  }

  if (propsObj.lang) result.push({ name: 'lang', value: propsObj.lang.code });
  return result;
}

/////////////
// Exports //
/////////////

exports.get = _get;

exports.post = _post;

exports.toURL = _toURL;

exports.getCheckpoints = function (propsObj, callback) {
  _get(_toURL(BASE_URL, CHECKPOINTS_ENDPOINT, _objToQueryArr(propsObj)), callback);
};

exports.getPrediction = function (propsObj, callback) {
  _get(_toURL(BASE_URL, PREDICTION_ENDPOINT, _objToQueryArr(propsObj)), callback);
};

exports.getShopPrediction = function (propsObj, callback) {
  _get(_toURL(BASE_URL, SHOP_PREDICTION_ENDPOINT, _objToQueryArr(propsObj)), callback);
};

exports.getCurrentPluginVersion = function (callback) {
  _get(VERSION_URL, (err, vt)=> {
    if (err)  return callback(err);
    else if (vt && vt.length > 0) {
      var newLineRgx = /\r?\n|\r/g;
      var spaceRgx = /\s/g;
      vt = vt.replace(newLineRgx, '').replace(spaceRgx, '');
      callback(null, vt);
    }
  });
};

exports.getShopInfos = function (propsObj, callback) {
  var url = _toURL(BASE_URL, SENDER_ENDPOINT, _objToQueryArr(propsObj));
  _get(url, callback);
};

exports.voteCourier = function (vote, propsObj, callback) {
  if (['up', 'down'].indexOf(vote) < 0) callback(new Error('Wrong argument for vote!'));
  var url = _toURL(BASE_URL, `${VOTE_ENDPOINT}${vote}`, _objToQueryArr(propsObj));
  _post(url, {}, callback);
};
