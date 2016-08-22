// API calls for all the modules
var status = {
  DONE: 4,
  OK: 200,
};

//////////////
// Handlers //
//////////////

function handleFetchResponse(res) {
  if (res.status >= 200 && res.status < 300) {
    var ct = res.headers.get('content-type');
    if (ct && ct.indexOf('json') > -1)
      return res.json();
    else
      return res.text();
  } else {
    throw new Error(`Request Error at fetch POST: ${res.status} ~> ${res.statusText}`);
  }
}

function handleRequestResponse(request, callback) {
  if (request.status >= 200 && request.status < 300) {
    var res = request.responseText.trim();
    var ct = request.getResponseHeader('content-type');
    if (ct && ct.indexOf('json') > -1) res = JSON.parse(res);
    callback(null, res);
  } else {
    callback(`Request Error at fetch POST: ${request.status} ~> ${request.responseText}`);
  }
}

/////////////
// Helpers //
/////////////

var toURL = function (baseUrl, endpoint, query) {
  var url = baseUrl + endpoint + '/?';

  query.forEach(function (param) {
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
};

var urlAddQueryObject = function (url, queryObj) {
  var query = '?';
  for (var key in queryObj) {
    if (queryObj.hasOwnProperty(key)) {
      query += `${key}=${queryObj[key]}&`;
    }
  }

  return encodeURI(`${url}${query}`);
};

var get = function (url, callback) {
  if (window && window.fetch) {
    window.fetch(url)
    .then(res => handleFetchResponse(res))
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
};

var post = function (url, data, callback) {
  console.log(arguments);
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
};

////////////////////////////
// TODO: REAL API WRAPPER //
////////////////////////////

module.exports = { get, post, toURL, urlAddQueryObject };
