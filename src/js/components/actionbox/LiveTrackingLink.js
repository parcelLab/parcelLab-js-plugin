const html = require('nanohtml')
const { base_url: baseUrl, static_map_endpoint: staticMapEndpoint } = require('../../../settings')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator')

const generateStaticMapSrc = ({ city, destination_country_iso3: destinationCountry }) => {
  const endpoint = `${baseUrl}${staticMapEndpoint}`
  if (city && destinationCountry) {
    return `${endpoint}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(destinationCountry)}`
  } else {
    return `${endpoint}?country=${encodeURIComponent(destinationCountry)}`
  }
}

const generateTruckIconSrc = userId => `http://cdn.parcellab.com/img/mail/_/truckonmap/${userId}.png`

// time box

const checkTimeFormat = function (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const generatePrettyTime = timeString => {
  if (!timeString) return null
  const date = new Date(timeString)
  const hours = checkTimeFormat(date.getHours())
  const mins = checkTimeFormat(date.getMinutes())
  return `${hours}:${mins}`
}

const TimeBox = (startTime, endTime, timeCaption) => {
  const icon = Icon('clock', '#000', '25')
  icon.classList.add('pl-space-left')
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'bottom'
  icon.style.marginBottom = '3px'

  return html`
    <div class="pl-box-time">
      <hr>
        <div class="pl-time-data">
          ${generatePrettyTime(startTime)} ${endTime ? ' - ' + generatePrettyTime(endTime) : ''} ${icon}
        </div>
        ${timeCaption ? html`
        <small class="pl-time-caption">${timeCaption}</small>` : ''}

    </div>
    `
}

/// /////
// map//
/// /////

const Map = (id, actionBox, courier, lang, userId, animated = false) => {
  const elem = html`
    <div id="pl-live-location-map" data-tid="${id}">
      <div style="width:100%;height:100%;background-position: center;background-repeat: no-repeat;background-size: cover;background-image:url(${generateStaticMapSrc(actionBox.info)});"></div>


      <a href="${courier.trackingurl}" target="_blank">
        <div id="pl-map-overlay">
          <img id="pl-truck-icon" class="${animated ? 'pl-truck-animated' : ''}" src="${generateTruckIconSrc(userId || 1612164)}" alt="" />
          <div id="pl-live-delivery-btn-container">
            <div class="pl-button pl-is-fullwidth">${translate('liveDelivery', lang.name)}</div>
          </div>
        </div>
      </a>
    </div>
  `

  elem.isSameNode = function (target) {
    // dont rerender map if it is still the same tid
    return id === target.dataset.tid
  }

  return elem
}

const LiveTrackingLink = ({ id, actionBox, courier, last_delivery_status: lastDeliveryStatus }, { lang, userId, animateTruck }) => {
  if (!actionBox.info || !(actionBox.info.city || actionBox.info.destination_country_iso3)) return null

  const scheduled = actionBox.info.scheduled
  const timeBox = (scheduled && scheduled.startTime)
    ? TimeBox(scheduled.startTime, scheduled.endTime, scheduled.timeCaption)
    : null

  const mapBox = html`
    <div class="pl-box pl-action-box pl-box-location">
      <div class="pl-box-heading pl-box-location-heading">
          ${actionBox.label || lastDeliveryStatus.status}
      </div>
      <div class="pl-box-body pl-box-location-body">
        ${Map(id, actionBox, courier, lang, userId, animateTruck)}
      </div>
      <div class="pl-box-footer">
        ${actionBox.caption || lastDeliveryStatus.status_details}
        ${timeBox}
      </div>
    </div>
  `

  return mapBox
}

module.exports = LiveTrackingLink
