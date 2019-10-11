const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const FallbackFurtherInfos = ({ query, fallbackDeeplink }) => {
  const { courier, trackingNo, lang } = query
  if (courier && trackingNo && fallbackDeeplink) {
    const sub = (trackingNo && trackingNo !== 'unknown') ? html`<div style="font-size:.9em;opacity:.6;">${translate('delivery', lang.name)} ${trackingNo}</div>` : null

    return html`
    <a id="pl-courier-fwd-link" href="${fallbackDeeplink.url}" target="_blank">
      <div class="checkpoint">
        <div><b>${fallbackDeeplink.label}</b></div>
        <div>${sub}</div>
      </div>
    </a>
    `
  }
}

module.exports = FallbackFurtherInfos
