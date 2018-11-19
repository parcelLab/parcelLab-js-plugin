const html = require('nanohtml')
const Icon = require('./Icon')

const RerouteLink = ({ courier }, options) => {
  if (courier &&
    courier.rerouteurl &&
    courier.rerouteurl_label_long &&
    options.rerouteButton !== 'left') {

    const icon = Icon('event', window.parcelLab_styles.buttonColor, 28)
    icon.style.margin = '0 auto 10px'

    return html`
      <a id="pl-reroute-link" href="${courier.rerouteurl}" target="_blank" class="pl-button pl-is-fullwidth">
        ${icon}
        ${courier.rerouteurl_label_long}
      </a>
    `
  }
}

module.exports = RerouteLink
