const html = require('bel')
const OpeningHours = require('./OpeningHours')
const initiatePickupLocationMap = require('./initiatePickupLocationMap')

const MapsLink = address => `https://www.google.com/maps/place/${ encodeURIComponent(address) }/`

const Map = (id, actionBox, courier) => {
  setTimeout(() => {
    if (document.getElementById('pl-pickup-location-map').children.length < 1)
      initiatePickupLocationMap('pl-pickup-location-map', actionBox.address, courier)
  }, 10)
  const elem = html`<div id="pl-pickup-location-map" data-tid="${id}"></div>`

  elem.isSameNode = function (target) { // dont rerender map if it is still the same tid
    return id === target.dataset['tid']
  }

  return elem
}

const PickupLocation = ({ id, actionBox, courier }, lang, emit) => {
  if (!actionBox.address) return null

  const openingHours = (actionBox.data && actionBox.data.openingHours) ? OpeningHours({ id, actionBox }, lang.code, emit) : null

  return html`
    <div class="pl-box">
      <div class="pl-box-body" style="padding:0;">
        ${ Map(id, actionBox, courier) }
      </div>

      <div style="padding:10px 20px;">
        <a href="${ MapsLink(actionBox.address) }" title="${ actionBox.address }" target="_blank" class="pl-button pl-is-fullwidth">
          ${ actionBox.address }
        </a>
      </div>

      <div class="pl-box-body" style="padding:0;">
        ${ openingHours }
      </div>
    </div>
  `
}

module.exports = PickupLocation
