// API calls for all the modules
var status = {
  DONE: 4,
  OK: 200,
};

var get = function (url, isJson=false, callback) {
  if (window && window.fetch) {
    window.fetch(url)
    .then(res => {
      if (isJson) return res.json();
      else return res.text();
    })
    .then(json => callback(null, json))
    .catch(err => callback(err));
  } else {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
      if (request.readyState === status.DONE) {
        if (request.status >= 200 && request.status < 300) {
          var res = request.responseText.trim();
          if (isJson)
            res = JSON.parse(res);
          callback(null, res);
        } else {
          callback(request.responseText, null);
        }
      }
    };

    request.send();
  }
};

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

module.exports = { get, toURL };
