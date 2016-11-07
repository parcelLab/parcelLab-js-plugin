module.exports = function (gmapApiKey, address) {
    function loadScript(src, callback)
    {
        var s, r, t;
        r = false;
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = src;
        s.onload = s.onreadystatechange = function () {
            if (!r && (!this.readyState || this.readyState == 'complete')) {
                r = true;
                callback();
            }
        };
        t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(s, t);
    }

    loadScript("//maps.googleapis.com/maps/api/js?key=" + gmapApiKey, function () {
        geoCodeAddress(address, function (err, coord) {
            if (!err) {
                loadMap(coord);
            }
        });
    });
    function loadMap(coord) {
        var map = new google.maps.Map(document.getElementById('pl-map-dsadas'), {
            zoom: 16,
            center: coord
        });
        new google.maps.Marker({
            position: coord,
            map: map,
        });
    }

    function geoCodeAddress(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: address
        }, function (results) {
            try {
                var location = results[0].geometry.location;
                var coord = {
                    lat: location.lat(),
                    lng: location.lng()
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
};
