const html = require('nanohtml')
const { translate } = require('../../lib/translator')
const Icon = require('../Icon')

const LiveMap = (liveMapUrl, courier) => html`
  <div>
    <div class="pl-live-map-label">
      <div class="pl-live-map-label-text">Live</div>
    </div>
    <img src="${liveMapUrl}" alt="Live Tracking Map" class="pl-img-responsive">
  </div>
`

const generateTime = timeStamp => {
  const date = new Date(timeStamp)
  return date.toLocaleTimeString(window.navigator.language, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const timeIcon = Icon('clock', '#000', '17')
timeIcon.classList.add('pl-space-right')
timeIcon.style.display = 'inline-block'
timeIcon.style.verticalAlign = 'top'

const Footer = (openStops, lastStatusFrom, query) => html`
  <div class="pl-box-footer pl-live-map-footer">
    ${lastStatusFrom ? html`<div class="pl-live-map-footer-last-status">${translate('liveTrackingLastUpdate', query.lang.name)}: ${generateTime(lastStatusFrom)} ${timeIcon}</div>` : ''}
    <div class="pl-live-map-footer-header">${translate('liveTrackingHeader', query.lang.name)}</div>
    <div class="pl-live-map-footer-stations">${translate('liveTrackingStations', query.lang.name).replace('###', openStops)}</div>
    <div class="pl-live-map-footer-caption">${translate('liveTrackingCaption', query.lang.name)}</div>
  </div>
`

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
