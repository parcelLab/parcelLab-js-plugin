const html = require('yo-yo')

function generateRerouteCaption(courier) {
  if (courier && courier.rerouteurl_label_info) {
    return html`
      <br>
      <small>${courier.rerouteurl_label_info}</small>
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
      <a href="${courier.rerouteurl}" target="_blank" class="pl-reroute-link-short">
        <span class="fa fa-calendar-check-o"></span>&nbsp;&nbsp;
        ${courier.rerouteurl_label_short}
        ${generateRerouteCaption(courier)}
      </a>
    `
  }
}

module.exports = RerouteLinkShort
