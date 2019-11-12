const html = require('nanohtml')
const Icon = require('../Icon')

const Returned = ({ actionBox }) => {
  if (!actionBox.label) return null

  let iconName = 'return'

  // custom icons for some return reasons
  if (actionBox.type === 'returned-AddressIssue') {
    iconName = 'questionmark'
  } else if (actionBox.type === 'returned-NotColleccted') {
    iconName = 'not_delivered'
  }

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${ actionBox.label }
      </div>

      <div class="pl-box-body">
        ${ Icon(iconName, null, '80') }
      </div>

      <div class="pl-box-footer">
        ${ actionBox.caption }
      </div>
    </div>
  `
}

module.exports = Returned
