const html = require('bel')

const FurtherInfos = ({ courier }) => {
  if (courier && courier.trackingurl)
    return html`<a href="${courier.trackingurl}" target="_blank" class="pl-button pl-is-fullwidth">
      ${ courier.trackingurl_label }
    </a>`
  else
    return html`<span style="opacity:.6;">
        ${ courier.trackingurl_label }
    </span>`
}

module.exports = FurtherInfos
