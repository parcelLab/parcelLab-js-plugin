const html = require('nanohtml')
const Icon = require('./Icon')
// const { translate } = require('../../js/lib/translator.js')

const FurtherInfos = ({ courier, tracking_number: trackingNo }, langName) => {
  if (courier && courier.trackingurl) {
    const icon = Icon('dots', '#ccc', 20)
    icon.style.margin = '0 auto'

    return html`
    <a id="pl-courier-fwd-link" href="${courier.trackingurl}" target="_blank">
      <div class="pl-courier-fwd-link-content"  style="text-align:center;">
        <div>
          ${icon}
          <b>${courier.trackingurl_label}</b>
        </div>
      </div>
    </a>
    `
  } else return null
}

module.exports = FurtherInfos
