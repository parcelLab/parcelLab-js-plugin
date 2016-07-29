// API calls for all the modules
var status = {
  DONE: 4,
  OK: 200,
};

var getNewestVersionTag = function (versionFileUrl, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', versionFileUrl);
  request.onreadystatechange = function () {
    if (request.readyState === status.DONE) {
      if (request.status >= 200 && request.status < 300) {
        callback(null, request.responseText.trim());
      } else {
        callback(request.responseText, null);
      }
    }
  };

  request.send();
};

var loadFromAPI = function (baseUrl, endpoint, query, method, data, callback) {
  var request = new XMLHttpRequest();

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

  request.open(method, url);
  request.setRequestHeader('Content-type', 'application/json');
  request.onreadystatechange = function () {
    if (request.readyState === status.DONE) {
      if (request.status >= 200 && request.status < 300) {
        var response;
        try {
          response = JSON.parse(request.responseText);
          callback(null, response);
        }
        catch (e) {
          callback(null, response);
        }
      } else {
        callback(request.responseText, null);
      }
    }
  };

  request.send(JSON.stringify(data));
};

module.exports = { loadFromAPI, getNewestVersionTag };
