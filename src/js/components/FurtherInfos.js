const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const FurtherInfos = ({ courier, tracking_number: trackingNo }, langName) => {
  const sub = (trackingNo && trackingNo !== 'unknown')
    ? html`
    <div style="font-size:.9em;opacity:.6;">
      ${translate('delivery', langName)} ${trackingNo}
    </div>`
    : null

  if (courier && courier.trackingurl) {
    return html`
    <a id="pl-courier-fwd-link" href="${courier.trackingurl}" target="_blank">
      <div class="checkpoint">
        <div><b>${courier.trackingurl_label}</b></div>
        <div>${sub}</div>
      </div>
    </a>
    `
  } else return null
}

module.exports = FurtherInfos
