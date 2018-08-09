const html = require('nanohtml')
const GOOGLE_API_KEY = require('../../../../settings').google_api_key
const OpeningHours = require('./OpeningHours')

const generateLinkSrc = address =>
  `https://www.google.com/maps/place/${encodeURIComponent(address)}/`

const generateMapSrc = address =>
  `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(address)}`


const Map = (id, actionBox) => {
  const elem = html`
    <div id="pl-pickup-location-map" data-tid="${id}">
      <iframe src="${generateMapSrc(actionBox.address)}" frameborder="0" style="width:100%;height:100%;border:0px;"></iframe>
    </div>
  `

  elem.isSameNode = function (target) { // dont rerender map if it is still the same tid
    return id === target.dataset['tid']
  }

  return elem
}

const PickupLocation = ({ id, actionBox, last_delivery_status }, lang, emit) => {
  if (!actionBox.address) return null

  const openingHours = (actionBox.data && actionBox.data.openingHours) ? OpeningHours({ id, actionBox }, lang.name, emit) : null
  
  const heading = last_delivery_status ? html`
    <div class="pl-box-heading pl-box-location-heading">
      ${ last_delivery_status.status }
    </div>
  ` : null

  return html`
    <div class="pl-box pl-action-box pl-box-location">
      ${ heading }
      <div class="pl-box-body pl-box-location-body">
        ${ Map(id, actionBox) }

        <div class="pl-location-link-container">
          <a href="${ generateLinkSrc(actionBox.address) }" title="${actionBox.address}" target="_blank" class="pl-button pl-is-fullwidth pl-location-link">
            ${ actionBox.address }
          </a>
        </div>
      </div>

      <div class="pl-box-body">
        ${ openingHours }
      </div>
    </div>
  `
}

module.exports = PickupLocation
