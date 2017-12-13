const html = require('bel')
const OpeningHours = require('./OpeningHours')
const initiatePickupLocationMap = require('./initiatePickupLocationMap')

const MapsLink = address => `https://www.google.com/maps/place/${ encodeURIComponent(address) }/`

const PickupLocation = ({ id, actionBox, courier }, lang, emit) => {
  if (!actionBox.address) return null

  const openingHours = (actionBox.data && actionBox.data.openingHours) ? OpeningHours({ id, actionBox }, lang.code, emit) : null

  setTimeout(() => {
    if (document.getElementById('pl-pickup-location-map').children.length < 1)
      initiatePickupLocationMap('pl-pickup-location-map', actionBox.address, courier)
  }, 10)

  return html`
    <div id="pl-loc-${id}" class="pl-box" style="margin-bottom:15px;">
      <div class="pl-box-body" style="padding:0;">
        <div id="pl-pickup-location-map"></div>
      </div>

      <div class="pl-box-footer" align="left" style="padding:10px 20px;">
        <a href="${ MapsLink(actionBox.address) }" title="${ actionBox.address }" target="_blank">
          <div class="pl-box-action-info">
            ${ actionBox.address }
            <i class="fa fa-road"></i>
          </div>
        </a>
      </div>

      <div class="pl-box-body" style="padding:0;">
        ${ openingHours }
      </div>
    </div>
  `
}

module.exports = PickupLocation
