const html = require('nanohtml')
const { translate } = require('../../lib/translator')
const Icon = require('../Icon')

function parseIsoDatetime (dtstr) {
  var dt = dtstr.split(/[: T-]/).map(parseFloat)
  return new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0)
}

function isIEorEdge () {
  var ua = window.navigator.userAgent
  // MSIE used to detect old browsers and Trident used to newer ones
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1 || ua.indexOf('Edge/') > -1
}

const generateTime = timeStamp => {
  if (isIEorEdge()) {
    // also for IE?
    timeStamp = timeStamp ? parseIsoDatetime(timeStamp) : ''
    const date = timeStamp ? new Date(timeStamp) : new Date()
    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
  } else {
    // this is bug fix for safari since it cant parse yyyy-MM-dd dates
    timeStamp = timeStamp ? timeStamp.replace(/-/g, '/') : ''
    const date = new Date(timeStamp)
    return date.toLocaleTimeString(window.navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const LiveMap = (liveMapUrl, courier, coordinatesAvailable) => html`
  <div>
    ${coordinatesAvailable ? html`<div class="pl-live-map-label">
      <div class="pl-live-map-label-text">Live</div>
    </div>` : ''}
    <img src="${liveMapUrl}" alt="Live Tracking Map" class="pl-img-responsive" style="width:100%;">
  </div>
`

const PredictionLabel = (prediction, lang) => {
  const label = translate('liveTrackingPrediction', lang.name)
  if (prediction.startTime && prediction.endTime) {
    return html`
    <div class="pl-live-map-footer-prediction">
      <div>${label}</div>
      <div class="pl-live-map-footer-prediction-time">${prediction.startTime} - ${prediction.endTime}</div>
    </div>
  `
  } else if (prediction.startTime) {
    return html`
    <div class="pl-live-map-footer-prediction">
      <div>${label}</div>
      <div class="pl-live-map-footer-prediction-time">~ ${prediction.startTime}</div>
    </div>
  `
  } else return null
}

const Footer = ({ openStops, lastStatusUpdateAt, prediction }, lang, coordinatesAvailable) => {
  const iconColor = window.parcelLab_styles ? window.parcelLab_styles.liveMapColor : '#000'
  const timeIcon = Icon('clock', iconColor, '17')
  timeIcon.classList.add('pl-space-right')
  timeIcon.style.display = 'inline-block'
  timeIcon.style.verticalAlign = 'top'

  openStops = parseInt(openStops)
  const lastUpdateTime = lastStatusUpdateAt ? html`<div class="pl-live-map-footer-last-status">${translate('liveTrackingLastUpdate', lang.name)}: ${generateTime(lastStatusUpdateAt)} ${timeIcon}</div>` : ''
  let stations = translate('liveTrackingStations', lang.name).replace('###', openStops)
  let caption = translate('liveTrackingCaption', lang.name)
  if (openStops === 0) {
    stations = translate('liveTrackingStationsNext', lang.name).replace('###', openStops)
    caption = translate('liveTrackingCaptionNext', lang.name)
  } else if (openStops === 1) {
    stations = translate('liveTrackingStation', lang.name).replace('###', openStops)
    caption = translate('liveTrackingCaption', lang.name)
  }

  const predictionLabel = PredictionLabel(prediction || {}, lang)

  return html`
  <div class="pl-box-footer pl-live-map-footer">
    ${lastUpdateTime}
    <div class="pl-live-map-footer-stations">${stations}</div>
    <div class="pl-live-map-footer-caption">${caption}</div>
    ${predictionLabel}
  </div>
`
}

const LiveTrackingMap = ({ id, actionBox, courier }, { lang, slot }) => {
  return null // TODO: disabled for v4
  if (!actionBox.data || !actionBox.data.details || !actionBox.data.details.liveTrackingMap) return null

  const { details, coordinates } = actionBox.data
  // dont render liveTrackingMap if we don't have open stops count...
  if ((typeof details.openStops === 'undefined') || details.openStops === null) return null

  // hide liveLabel if no coordinates
  const coordinatesAvailable = (coordinates && coordinates.length > 0)
  return html`
    <div class="pl-box pl-action-box pl-box-location pl-box-live-location">
      <div class="pl-box-body pl-box-location-body">
        ${LiveMap(details.liveTrackingMap, courier, coordinatesAvailable)}
      </div>

      ${Footer(details, lang, coordinatesAvailable)}
      ${slot || null}
    </div>
  `
}

module.exports = LiveTrackingMap
