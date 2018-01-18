const html = require('bel')

const PickupLocationUnknown = ({ actionBox, courier }) => {
  if (!courier || !courier.trackingurl) return null

  return html`
    <div class="pl-box" style="margin-bottom:15px;">
      <div class="pl-box-body pl-pseudo-map-body" style="padding:0;">
        <div id="pl-pseudo-map">
          <a href="${courier.trackingurl}" title="${actionBox.label}" target="_blank">          
            <div class="pl-pseudo-map-link">
              <span>
                ${ actionBox.label }
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
}

module.exports = PickupLocationUnknown
