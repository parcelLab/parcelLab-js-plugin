const GOOGLE_API_KEY = require('../../../settings').google_api_key

function loadScript(src, callback) {
  let r = false
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true
      callback()
    }
  }
  const t = document.getElementsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}

function loadMap(elemId, startTime, endTime, deliveryLocation, nearbyDeliveries) {
  const home = { lat: deliveryLocation.lat, lng: deliveryLocation.lon }

  const map = new window.google.maps.Map(document.getElementById(elemId), {
    zoom: 16,
    center: home,
  })

  const icon = {
    url: 'https://cdn.parcellab.com/img/maps/home-icon.png',
    //      size: new google.maps.Size(20, 20),
    //      origin: new google.maps.Point(0, 0),
    //      anchor: new google.maps.Point(10, 10)
  }
  addMarker(map, home, icon, startTime + ' - ' + endTime)

  for (const index in nearbyDeliveries) {
    const nearbyDelivery = nearbyDeliveries[index]
    let time = nearbyDelivery.time.split(':')
    time = time[0] + ':' + time[1]
    addMarker(map, { lat: nearbyDelivery.lat, lng: nearbyDelivery.lon }, 'https://cdn.parcellab.com/img/maps/neighbours-icon.png', time)
  }
}

function addMarker(map, position, icon, label) {
  new window.MarkerWithLabel({
    map: map,
    position: position,
    icon: icon,
    labelContent: label,
    zIndex: 0,
    labelAnchor: new window.google.maps.Point(35, -5),
    labelClass: 'pl-prediction-map-markerLabels',
  })
}


module.exports = function (elemId, startTime, endTime, deliveryLocation, nearbyDeliveries) {
  if (window.google && window.google.maps)
    loadMap(elemId, startTime, endTime, deliveryLocation, nearbyDeliveries)

  else loadScript('//maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY, () => {
    loadScript('//cdn.parcellab.com/js/markerLabel.js', () => {
      loadMap(elemId, startTime, endTime, deliveryLocation, nearbyDeliveries)
    })
  })

  return ''
}
