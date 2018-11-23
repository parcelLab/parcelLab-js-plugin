const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const FurtherInfos = ({ courier, tracking_number }, langName) => {
  const sub = (tracking_number && tracking_number !== 'unknown') ? html`<div style="font-size:.9em;opacity:.6;">${ translate('delivery', langName) } ${ tracking_number }</div>` : null

  if (courier && courier.trackingurl)
    return html`<a id="pl-courier-fwd-link" href="${courier.trackingurl}" target="_blank" class="pl-button pl-is-fullwidth">
      ${ courier.trackingurl_label }
      ${ sub }
    </a>`
  else
    return html`<div style="opacity:.6;" class="pl-button pl-is-fullwidth">
        ${ courier.trackingurl_label }
        ${ sub }
    </div>`
}

module.exports = FurtherInfos
