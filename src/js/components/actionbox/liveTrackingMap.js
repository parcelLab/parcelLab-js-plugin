const html = require('nanohtml')
const { base_url, static_map_endpoint } = require('../../../settings')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator')


//DO RIGHT MAP!
const liveMap = ({ city, destination_country_iso3 }) => {

}

const generateTruckIconSrc = userId => `http://cdn.parcellab.com/img/mail/_/truckonmap/${userId}.png`

//////////////
// time box //
//////////////

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

const DeliveryBox = (startTime, endTime, timeCaption, openStops) => {

  // TODO Caption for "Ankunftszeit ca... xx - xx"
  return html`
    <div class="pl-box pl-box-time">
      <div class="pl-box-body">
        <div>
        <--Hier rein kommt "Noch 2 Stopps...."--/>
        </div>
        <div class="pl-time-data">
          ${generatePrettyTime(startTime)} ${endTime ? ' - ' + generatePrettyTime(endTime) : ''}
        </div>
        ${ timeCaption ? html`
        <small class="pl-time-caption">${timeCaption}</small>` : ''}
      </div>
    </div>
    `
}

////////
// map//
////////

const LiveMap = (id, actionBox, courier, query, coordinates) => {

  // TODO get map and render truck on coordinates
  const elem = html``

  return elem
}

const LiveTrackingMap = ({ id, actionBox, courier, last_delivery_status }, query, animated = false) => {
  if (!actionBox.info || !(actionBox.info.city || actionBox.info.destination_country_iso3))
    return null

  const mapBox = html`
    <div class="pl-box pl-action-box pl-box-location">
      <div class="pl-box-body pl-box-location-body">
        <--DO MAP--/>
      </div>
    </div>
  `
  const scheduled = actionBox.info.scheduled
  const deliveryBox = (scheduled && scheduled.startTime)
    ? DeliveryBox(scheduled.startTime, scheduled.endTime, scheduled.timeCaption)
    : null

  return html`
    <div class="pl-spaced-list">
      ${ mapBox}    
      ${ deliveryBox}
    </div>
  `
}

module.exports = LiveTrackingMap
