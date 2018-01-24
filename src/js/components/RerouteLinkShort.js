const html = require('bel')

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
    return html`
      <a id="pl-reroute-link" href="${courier.rerouteurl}" target="_blank" class="pl-button pl-is-fullwidth pl-space-top">
        ${courier.rerouteurl_label_short}
        ${generateRerouteCaption(courier)}
      </a>
    `
  }
}

module.exports = RerouteLinkShort
