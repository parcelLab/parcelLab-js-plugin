const html = require('nanohtml')
const Icon = require('../Icon')

const NextAction = ({ actionBox, last_delivery_status: lastDeliveryStatus }) => {
  const { status, status_details: statusDetails } = lastDeliveryStatus
  if (!actionBox.label && !status) return null

  const label = actionBox.label || status
  const details = actionBox.caption || statusDetails

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">

      <div class="pl-box-heading">
        ${label}        
      </div>

      <div class="pl-box-body">
        ${Icon('error', null, '80')}
      </div>

      <div class="pl-box-footer">
        <div>${details}</div>
      </div>
    </div>
  `
}

module.exports = NextAction
