const GOOGLE_API_KEY = require('../../../settings').google_api_key
const SHORTEN_ADDRESS_FOR = require('../../../settings').mapShortenAddressForCouriers

module.exports = function (elId, address, courier) {

  const loadScript = (src, callback) => {
    if (window.google && window.google.maps) return callback()

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

  const loadMap = coord => {
    const map = new window.google.maps.Map(document.getElementById('pl-pickup-location-map'), {
      zoom: 16,
      center: coord,
    })
    new window.google.maps.Marker({
      map: map,
      position: coord,
    })
  }

  const shortenAddress = address => {
    if ((SHORTEN_ADDRESS_FOR.indexOf(courier) >= 0) && (address.match(/,/g).length >= 2)) {
      address = address.split(',').slice(1).join(',').trim()
    }

    return address
  }

  const geoCodeAddress = (address, callback) => {
    const geocoder = new window.google.maps.Geocoder()
    address = shortenAddress(address)

    geocoder.geocode({
      address: address,
    }, results => {
      try {
        const location = results[0].geometry.location
        const coord = {
          lat: location.lat(),
          lng: location.lng(),
        }
        if (coord.lat === parseFloat(coord.lat) && coord.lng === parseFloat(coord.lng)) {
          callback(false, coord)
        } else {
          throw true
        }
      } catch (e) {
        callback(e)
      }
    })
  }

  // MAIN:
  loadScript('//maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY, () => {
    geoCodeAddress(address, (err, coord) => {
      if (err) {
        // kill map space
        document.getElementById(elId).style.height = '0px'
        console.log('⚠️  Could not geocode ' + address)
      } else {
        loadMap(coord)
      }
    })
  })
}
