module.exports = function (startTime, endTime, deliveryLocation, nearbyDeliveries) {
  const GOOGLE_API_KEY = require('../settings').google_api_key;

  function loadScript(src, callback) {
    var r = false;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        callback();
      }
    };
    var t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }

  loadScript('//maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY, function () {
    loadScript('//cdn.parcellab.com/js/markerLabel.js', function () {
      loadMap();
    });
  });

  function loadMap() {
    var home = {lat: deliveryLocation.lat, lng: deliveryLocation.lon};

    var map = new google.maps.Map(document.getElementById('pl-prediction-map'), {
      zoom: 16,
      center: home,
    });

    var icon = {
      url: 'https://cdn.parcellab.com/img/maps/home-icon.png',
//      size: new google.maps.Size(20, 20),
//      origin: new google.maps.Point(0, 0),
//      anchor: new google.maps.Point(10, 10)
    };
    addMarker(map, home, icon, startTime + ' - ' + endTime);

    for (var index in nearbyDeliveries) {
      var nearbyDelivery = nearbyDeliveries[index];
      var time = nearbyDelivery.time.split(':');
      time = time[0] + ':' + time[1];
      addMarker(map, {lat: nearbyDelivery.lat, lng: nearbyDelivery.lon}, 'https://cdn.parcellab.com/img/maps/neighbours-icon.png', time);
    }
  }

  function addMarker(map, position, icon, label) {
    var marker = new MarkerWithLabel({
      map: map,
      position: position,
      icon: icon,
      labelContent: label,
      zIndex: 0,
      labelAnchor: new google.maps.Point(35, -5),
      labelClass: 'pl-prediction-map-markerLabels',
    });
  }

};
