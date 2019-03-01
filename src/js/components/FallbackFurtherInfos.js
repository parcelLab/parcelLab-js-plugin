const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const FallbackFurtherInfos = ({ options, courier_tracking_url }) => {
  const { courier, trackingNo, lang } = options
  if (courier && trackingNo && courier_tracking_url) {
    const sub = (trackingNo && trackingNo !== 'unknown') ? html`<div style="font-size:.9em;opacity:.6;">${ translate('delivery', lang.name) } ${ trackingNo }</div>` : null

    return html`
    <a id="pl-courier-fwd-link" href="${ courier_tracking_url.url }" target="_blank" class="pl-button pl-is-fullwidth" style="margin-top:15px;">
      ${ courier_tracking_url.label }
      ${ sub }
    </a>`
  }
}

module.exports = FallbackFurtherInfos
