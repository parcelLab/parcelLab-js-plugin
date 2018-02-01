const html = require('bel')
const OpeningHours = require('./OpeningHours')
const initiatePickupLocationMap = require('./initiatePickupLocationMap')

const MapsLink = address => `https://www.google.com/maps/place/${encodeURIComponent(address)}/`

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

const PickupLocation = ({ id, actionBox, courier, last_delivery_status }, lang, emit) => {
  if (!actionBox.address) return null

  const openingHours = (actionBox.data && actionBox.data.openingHours) ? OpeningHours({ id, actionBox }, lang.code, emit) : null
  
  const heading = last_delivery_status ? html`
    <div class="pl-box-heading pl-box-location-heading">
      ${ last_delivery_status.status }
    </div>
  ` : null

  return html`
    <div class="pl-box pl-action-box pl-box-location">
      ${ heading }
      <div class="pl-box-body pl-box-location-body">
        ${ Map(id, actionBox, courier)}

        <div class="pl-location-link-container">
          <a href="${ MapsLink(actionBox.address)}" title="${actionBox.address}" target="_blank" class="pl-button pl-is-fullwidth pl-location-link">
            ${ actionBox.address}
          </a>
        </div>
      </div>

      <div class="pl-box-body">
        ${ openingHours}
      </div>
    </div>
  `
}

module.exports = PickupLocation
