const html = require('nanohtml')
const Icon = require('./Icon')
// const { translate } = require('../../js/lib/translator.js')

const icon = Icon('dots', '#ccc', 20)
icon.style.margin = '0 auto'
const FurtherInfos = ({ courier, tracking_number: trackingNo }, langName) => {
  // const sub = (trackingNo && trackingNo !== 'unknown')
  //   ? html`
  //   <div style="font-size:.9em;opacity:.6;">
  //     ${translate('delivery', langName)} ${trackingNo}
  //   </div>`
  //   : null
  const sub = null

  if (courier && courier.trackingurl) {
    return html`
    <a id="pl-courier-fwd-link" href="${courier.trackingurl}" target="_blank">
      <div class="pl-courier-fwd-link-content"  style="text-align:center;">
        <div>
          ${icon}
          <b>${courier.trackingurl_label}</b></div>
        <div>${sub}</div>
      </div>
    </a>
    `
  } else return null
}

module.exports = FurtherInfos
