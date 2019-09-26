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
      <a id="pl-courier-fwd-link" href="${courier.trackingurl}" target="_blank" class="pl-button pl-is-fullwidth">
        ${courier.trackingurl_label}
        ${sub}
    </a>`
  } else return null
}

module.exports = FurtherInfos
