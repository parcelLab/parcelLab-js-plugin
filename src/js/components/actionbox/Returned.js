const html = require('nanohtml')
const Icon = require('../Icon')

const Returned = ({ actionBox }) => {
  if (!actionBox.label) return null

  let iconName = 'return'

  // custom icons for some return reasons
  if (actionBox.type === 'returned-Recall') {
    iconName = 'myicons/delivery/package_box_backward'
  } else if (actionBox.type === 'returned-DeliveryPayment') {
    iconName = 'myicons/money/money_wallet'
  } else if (actionBox.type === 'returned-NotCollected') {
    iconName = 'myicons/maps_navigation/pin_delete_disable'
  } else if (actionBox.type === 'returned-AddressIssue') {
    iconName = 'myicons/maps_navigation/pin_delete_disable'
  } else if (actionBox.type === 'returned-CustomerRefusal') {
    iconName = 'myicons/delivery/package_delivery_return'
  }

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${actionBox.label}
      </div>

      <div class="pl-box-body">
        ${Icon(iconName, null, '80')}
      </div>

      <div class="pl-box-footer">
        ${actionBox.caption}
      </div>
    </div>
  `
}

module.exports = Returned
