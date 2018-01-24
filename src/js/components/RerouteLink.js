const html = require('bel')

const RerouteLink = ({ courier }) => {
  if (courier &&
    courier.rerouteurl &&
    courier.rerouteurl_label_long) {
    return html`
      <a id="pl-reroute-link" href="${courier.rerouteurl}" target="_blank" class="pl-button pl-is-fullwidth">
        ${courier.rerouteurl_label_long}
      </a>
    `
  }
}

module.exports = RerouteLink
