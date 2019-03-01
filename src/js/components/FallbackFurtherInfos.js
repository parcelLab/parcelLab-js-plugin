const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const FallbackFurtherInfos = ({ options, fallback_deeplink }) => {
  const { courier, trackingNo, lang } = options
  if (courier && trackingNo && fallback_deeplink) {
    const sub = (trackingNo && trackingNo !== 'unknown') ? html`<div style="font-size:.9em;opacity:.6;">${ translate('delivery', lang.name) } ${ trackingNo }</div>` : null

    return html`
    <a id="pl-courier-fwd-link" href="${ fallback_deeplink.url }" target="_blank" class="pl-button pl-is-fullwidth" style="margin-top:15px;">
      ${ fallback_deeplink.label }
      ${ sub }
    </a>`
  }
}

module.exports = FallbackFurtherInfos
