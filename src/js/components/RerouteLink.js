const html = require('yo-yo')

const RerouteLink = ({ courier }) => {
  if (courier &&
    courier.rerouteurl &&
    courier.rerouteurl_label_long) {
    return html`
      <a href="${courier.rerouteurl}" target="_blank" class="pl-reroute-link">
        <i class="fa fa-calendar-check-o"></i> ${courier.rerouteurl_label_long}
      </a>
    `
  }
}

module.exports = RerouteLink
