const GOOGLE_API_KEY = require('../../settings').google_api_key;

module.exports = function (address, ctx) {
  const shortenAddressForCouriers = ['ups-express'];
  const courier = ctx.data.root.courier;

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

  function loadMap(coord) {
    var map = new window.google.maps.Map(document.getElementById('pl-pickup-location-map'), {
      zoom: 16,
      center: coord,
    });
    new window.google.maps.Marker({
      map: map,
      position: coord,
    });
  }

  function shortenAddress(address) {
    if ((shortenAddressForCouriers.indexOf(courier) >= 0) && (address.match(/,/g).length >= 2)) {
      address = address.split(',').slice(1).join(',').trim();
    }

    return address;
  }

  function geoCodeAddress(address, callback) {
    var geocoder = new window.google.maps.Geocoder();
    address = shortenAddress(address);

    geocoder.geocode({
      address: address,
    }, function (results) {
      try {
        var location = results[0].geometry.location;
        var coord = {
          lat: location.lat(),
          lng: location.lng(),
        };
        if (coord.lat === parseFloat(coord.lat) && coord.lng === parseFloat(coord.lng)) {
          callback(false, coord);
        } else {
          throw true;
        }
      } catch (e) {
        callback(e);
      }
    });
  }

  // MAIN:
  loadScript('//maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY, function () {
    geoCodeAddress(address, function (err, coord) {
      if (err) { // kill map space
        document.querySelector('#pl-pickup-location-map').style.height = '0px';
        console.log('⚠️  Could not geocode ' + address);
      } else {
        loadMap(coord);
      }
    });
  });
};
