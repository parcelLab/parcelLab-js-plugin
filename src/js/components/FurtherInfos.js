const html = require('yo-yo')

const FurtherInfos = ({ courier }) => {
  if (courier && courier.trackingurl)
    return html`<a href="${courier.trackingurl}" target="_blank">
      <i class="fa fa-lightbulb-o"></i> ${ courier.trackingurl_label }
    </a>`
  else
    return html`<span style="opacity:.6;">
      <i class="fa fa-lightbulb-o"></i> ${ courier.trackingurl_label }
    </span>`
}

module.exports = FurtherInfos
