const html = require('nanohtml')
const { translate } = require('../../lib/translator')
const Icon = require('../Icon')

const LiveMap = (liveMapUrl, courier) => html`
  <div>
    <div class="pl-live-map-label">
      <div class="pl-live-map-label-text">Live</div>
    </div>
    <img src="${liveMapUrl}" alt="Live Tracking Map" class="pl-img-responsive" style="width:100%;">
  </div>
`

const generateTime = timeStamp => {
  // this is bug fix for safari since it cant parse yyyy-MM-dd dates
  timeStamp = timeStamp ? timeStamp.replace(/-/g, '/') : ''
  const date = new Date(timeStamp)
  return date.toLocaleTimeString(window.navigator.language, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const Footer = (openStops, lastStatusFrom, query) => {
  const iconColor = window.parcelLab_styles ? window.parcelLab_styles.liveMapColor : '#000'
  const timeIcon = Icon('clock', iconColor, '17')
  timeIcon.classList.add('pl-space-right')
  timeIcon.style.display = 'inline-block'
  timeIcon.style.verticalAlign = 'top'

  openStops = parseInt(openStops)
  const time = lastStatusFrom ? html`<div class="pl-live-map-footer-last-status">${translate('liveTrackingLastUpdate', query.lang.name)}: ${generateTime(lastStatusFrom)} ${timeIcon}</div>` : ''
  let stations = translate('liveTrackingStations', query.lang.name).replace('###', openStops)
  let caption = translate('liveTrackingCaption', query.lang.name)
  if (openStops === 0) {
    stations = translate('liveTrackingStationsNext', query.lang.name).replace('###', openStops)
    caption = translate('liveTrackingCaptionNext', query.lang.name)
  } else if (openStops === 1) {
    stations = translate('liveTrackingStation', query.lang.name).replace('###', openStops)
    caption = translate('liveTrackingCaption', query.lang.name)
  }
  return html`
  <div class="pl-box-footer pl-live-map-footer">
    ${time}
    <div class="pl-live-map-footer-stations">${stations}</div>
    <div class="pl-live-map-footer-caption">${caption}</div>
  </div>
`
}

const LiveTrackingMap = ({ id, actionBox, courier }, query) => {
  if (!actionBox.data || !actionBox.data.details || !actionBox.data.details.liveTrackingMap) return null

  const { details } = actionBox.data
  return html`
    <div class="pl-box pl-action-box pl-box-location pl-box-live-location">
      <div class="pl-box-body pl-box-location-body">
        ${LiveMap(details.liveTrackingMap, courier)}
      </div>

      ${Footer(details.openStops, details.lastStatusUpdateAt, query)}
    </div>
  `
}

module.exports = LiveTrackingMap
