const html = require('nanohtml')
const Icon = require('../Icon')
const raw = require('nanohtml/raw')

const NextAction = ({ actionBox, last_delivery_status }) => {
  const { status, status_details } = last_delivery_status
  if (!actionBox.label && !status) return null

  let label = actionBox.label || status
  let details = actionBox.caption || status_details

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">

      <div class="pl-box-heading">
        ${ label }        
      </div>

      <div class="pl-box-body">
        ${ Icon('error', null, '80') }
      </div>

      <div class="pl-box-footer">
        <div>${ raw(details) }</div>
      </div>
    </div>
  `
}

module.exports = NextAction
