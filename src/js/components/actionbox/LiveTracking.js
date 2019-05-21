const html = require('nanohtml')
const GOOGLE_API_KEY = require('../../../settings').google_api_key
const { translate } = require('../../../js/lib/translator.js')

const generateMapSrc = address => `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(address)}&zoom=11`

const generateTruckIconSrc = userId => `http://cdn.parcellab.com/img/mail/_/truckonmap/${userId}.png`

const getDeliveryWindow = (checkpoints) => {
  let i = checkpoints.length
  while (i--) {
    if (['Scheduled'].indexOf(checkpoints[i].status) >= 0) {
      return checkpoints[i].full_courier_status
    }
  } return null
}

const Map = (id, actionBox, courier, query) => {
  const elem = html`
    <div id="pl-live-location-map" data-tid="${id}">
        <iframe src="${generateMapSrc(`${actionBox.info.cty},${actionBox.info.ctry.n}`)}" 
          frameborder="0" style="width:100%;height:100%;border:0px;z-index:2"">
        </iframe>
        <a href="${courier.trackingurl}" target="_blank">
        <div id="pl-map-overlay">
          <img id="pl-truck-icon" src="${generateTruckIconSrc(query.userId || 1612164)}" alt="" />
          <div id="pl-live-delivery-text">${translate('liveDelivery', query.lang.name)}</div>
        </div>
      </a>
    </div>
  `

  elem.isSameNode = function (target) {
    // dont rerender map if it is still the same tid
    return id === target.dataset['tid']
  }

  return elem
}

const LiveTracking = ({ id, actionBox, last_delivery_status, courier }, query, checkpoints) => {
  if (!actionBox.info || !actionBox.info.cty) return null

  const heading = last_delivery_status
    ? html`
        <div class="pl-box-heading pl-box-location-heading">
          ${last_delivery_status.status}
        </div>
      `
    : null

  const timeWindow = getDeliveryWindow(checkpoints)
  const footer = timeWindow 
    ? html`
      <div class="pl-box-footer">
        ${timeWindow}
      </div>
    `
    : null

  return html`
    <div class="pl-box pl-action-box pl-box-location">
      ${heading}
      <div class="pl-box-body pl-box-location-body">
        ${Map(id, actionBox, courier, query)}
      </div>
      ${footer}
    </div>
  `
}

module.exports = LiveTracking
