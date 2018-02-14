const html = require('bel')
const Icon = require('./Icon')

function generateRerouteCaption(courier) {
  if (courier && courier.rerouteurl_label_info) {
    return html`
      <div>
        <small>${courier.rerouteurl_label_info}</small>
      </div>
    `
  } else return ''
}

const RerouteLinkShort = ({ checkpoints, activeTracking, options }) => {
  if (!checkpoints) return null

  let courier = null
  const header = checkpoints.header[activeTracking]
  if (header) courier = header.courier

  if (courier &&
    courier.rerouteurl &&
    courier.rerouteurl_label_short &&
    options.rerouteButton &&
    options.rerouteButton === 'left') {

    const icon = Icon('event', window.parcelLab_styles.buttonColor, 28)
    icon.style.margin = '0 auto 10px'

    return html`
      <a id="pl-reroute-link" href="${courier.rerouteurl}" target="_blank" class="pl-button pl-is-fullwidth pl-space-bottom">
        <div>
          ${ icon }
        </div>
        <div>
          ${courier.rerouteurl_label_short}
        </div>
        <div style="font-size:.75em;">
          ${courier.rerouteurl_label_info}
        </div>
      </a>
    `
  }
}

module.exports = RerouteLinkShort
