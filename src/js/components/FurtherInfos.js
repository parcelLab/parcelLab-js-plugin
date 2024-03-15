const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const FurtherInfos = ({ courier, tracking_number, foreign_tracking_number }, langName) => {
  const sub = (foreign_tracking_number) ? html`<div style="font-size:.9em;opacity:.6;">${ translate('delivery', langName) } ${ foreign_tracking_number }</div>` : (tracking_number && tracking_number !== 'unknown') ? html`<div style="font-size:.9em;opacity:.6;">${ translate('delivery', langName) } ${ tracking_number }</div>` : null

  if (courier && courier.trackingurl && !courier.hide_trackingurl)
    return html`<a id="pl-courier-fwd-link" href="${courier.trackingurl}" target="_blank" class="pl-button pl-is-fullwidth">
      ${ courier.trackingurl_label }
      ${ sub }
    </a>`
  else return null
}

module.exports = FurtherInfos
