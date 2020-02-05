const html = require('nanohtml')
const Icon = require('./Icon')

const RerouteLink = (courier) => {
  if (courier &&
    courier.rerouteurl &&
    courier.rerouteurl_label_short) {
    const color = window.parcelLab_styles.actionIconColor || window.parcelLab_styles.buttonColor
    const icon = Icon('event', color, 28)
    icon.style.margin = '0 auto 10px'

    return html`
      <a id="pl-reroute-link" href="${courier.rerouteurl}" target="_blank" class="pl-button pl-is-fullwidth">
        <div>
          ${icon}
        </div>
        <div>
          ${courier.rerouteurl_label_short}
        </div>
        <div style="font-size:10px;">
          ${courier.rerouteurl_label_info}
        </div>
      </a>
    `
  }
}

module.exports = RerouteLink
