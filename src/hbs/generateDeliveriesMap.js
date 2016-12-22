module.exports = function (gmapApiKey, startTime, endTime, deliveryLocation, nearbyDeliveries) {
    var map;
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
        loadScript("js/lib/markerLabel.js", function () {
            loadMap();
        });
    });
    function loadMap() {
        var home = {lat: deliveryLocation.lat, lng: deliveryLocation.lon};

        map = new google.maps.Map(document.getElementById('pl-map'), {
            zoom: 16,
            center: home
        });

        var icon = {
            url: "https://cdn.parcellab.com/img/maps/home-icon.png",
//            size: new google.maps.Size(20, 20),
//            origin: new google.maps.Point(0, 0),
//            anchor: new google.maps.Point(10, 10)
        };
        addMarker(home, icon, startTime + ' - ' + endTime);
        for (var index in nearbyDeliveries) {
            var nearbyDelivery = nearbyDeliveries[index];
            var time = nearbyDelivery.time.split(":");
            time = time[0] + ":" + time[1];
            addMarker({lat: nearbyDelivery.lat, lng: nearbyDelivery.lon}, "https://cdn.parcellab.com/img/maps/neighbours-icon.png", time);
        }
    }
    function addMarker(position, icon, label) {
        var marker = new MarkerWithLabel({
            position: position,
            map: map,
            icon: icon,
//            labelInBackground: true,
            labelContent: label,
            zIndex: 0,
            labelAnchor: new google.maps.Point(35, -5),
            labelClass: "pl-maps-markerLabels",
        });
    }

};
