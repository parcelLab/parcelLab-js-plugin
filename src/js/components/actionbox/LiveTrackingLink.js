const html = require('nanohtml')
const { base_url, static_map_endpoint } = require('../../../settings')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator')

const generateStaticMapSrc = ({ city, destination_country_iso3 }) => {
  const endpoint = `${base_url}${static_map_endpoint}`
  if (city && destination_country_iso3) {
    return `${endpoint}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(destination_country_iso3)}`
  } else {
    return `${endpoint}?country=${encodeURIComponent(destination_country_iso3)}`
  }
}

const generateTruckIconSrc = userId => `http://cdn.parcellab.com/img/mail/_/truckonmap/${userId}.png`

/* -------------------------------- Time Box -------------------------------- */

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
  icon.classList.add('pl-space-right')
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'bottom'
  icon.style.marginBottom = '3px'

  return html`
    <div class="pl-box pl-box-time">
      <div class="pl-box-body">
        <div class="pl-time-data">
          ${icon} ${generatePrettyTime(startTime)} ${endTime ? ' - ' + generatePrettyTime(endTime) : ''}
        </div>
        ${timeCaption ? html`
        <small class="pl-time-caption">${timeCaption}</small>` : ''}
      </div>
    </div>
    `
}

/* ----------------------------------- map ---------------------------------- */

const Map = (id, actionBox, courier, query, animated = false) => {
  const elem = html`
    <div id="pl-live-location-map" data-tid="${id}">
      <div style="width:100%;height:100%;background-position: center;background-repeat: no-repeat;background-size: cover;background-image:url(${generateStaticMapSrc(actionBox.info)});"></div>


      <a href="${courier.trackingurl}" target="_blank">
        <div id="pl-map-overlay">
          <img id="pl-truck-icon" class="${animated ? 'pl-truck-animated' : ''}" src="${generateTruckIconSrc(query.userId || 1612164)}" alt="" />
          <div id="pl-live-delivery-btn-container">
            <div class="pl-button pl-is-fullwidth">${translate('liveDelivery', query.lang.name)}</div>
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

const LiveTrackingLink = ({ id, actionBox, courier, last_delivery_status }, query, animated = false) => {
  if (!actionBox.info ||
  !(actionBox.info.city || actionBox.info.destination_country_iso3)) {
    return null
  }

  const mapBox = html`
    <div class="pl-box pl-action-box pl-box-location">
      <div class="pl-box-heading pl-box-location-heading">
          ${actionBox.label || last_delivery_status.status}
      </div>
      <div class="pl-box-body pl-box-location-body">
        ${Map(id, actionBox, courier, query, animated)}
      </div>
      <div class="pl-box-footer">
        ${actionBox.caption || last_delivery_status.status_details}
      </div>
    </div>
  `

  const scheduled = actionBox.info.scheduled
  const timeBox = (scheduled && scheduled.startTime)
    ? TimeBox(scheduled.startTime, scheduled.endTime, scheduled.timeCaption)
    : null

  return html`
    <div class="pl-spaced-list">
      ${mapBox}
      ${timeBox}
    </div>
  `
}

module.exports = LiveTrackingLink
