const html = require('nanohtml')

const LiveMap = (liveMapUrl, courier) => html`
  <div>
    <div class="pl-live-map-label">
      <div class="pl-live-map-label-text">Live</div>
    </div>
    <img src="${liveMapUrl}" alt="Live Tracking Map" class="pl-img-responsive">
  </div>
`

const Footer = (openStops, lastStatusFrom) => html`
  <div class="pl-box-footer pl-live-map-footer">
    ${lastStatusFrom ? html`<div class="pl-live-map-footer-last-status">Letzter Stand: ${lastStatusFrom}</div>` : ''}
    <div class="pl-live-map-footer-header">Der Fahrer ist auf dem Weg.</div>
    <div class="pl-live-map-footer-stations">Noch ${openStops} Zwischenstopp(s)</div>
    <div class="pl-live-map-footer-caption">bis deine Sendung bei dir ist.</div>
  </div>
`

const LiveTrackingMap = ({ id, actionBox, courier }, query) => {
  if (!actionBox.data || !actionBox.data.liveMapUrl) return null

  const { liveMapUrl, details } = actionBox.data
  return html`
    <div class="pl-box pl-action-box pl-box-location pl-box-live-location">
      <div class="pl-box-body pl-box-location-body">
        ${LiveMap(liveMapUrl, courier)}
      </div>

      ${Footer(details.openStops, details.lastStatusUpdate)}
    </div>
  `
}

module.exports = LiveTrackingMap
