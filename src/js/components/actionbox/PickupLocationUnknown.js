const html = require('bel')

const PickupLocationUnknown = ({ actionBox, courier, last_delivery_status }) => {
  if (!courier || !courier.trackingurl) return null

  const status = last_delivery_status ? html`
    <div class="pl-pseudo-map-status pl-space-bottom">${ last_delivery_status.status }</div>
  ` : null

  return html`
    <div class="pl-box pl-action-box pl-box-pseudo-map">
      <div class="pl-box-body">
        <div id="pl-pseudo-map">
          <a href="${courier.trackingurl}" title="${actionBox.label}" target="_blank">          
            <div class="pl-pseudo-map-text">
              <span>
                ${ status }
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
