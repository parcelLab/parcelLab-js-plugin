const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const { getIconName } = require('../../lib/static')
const { makeBig, animatePulse } = require('../../lib/helpers')

module.exports = function Default (tHeader, { options, slot }) {
  if (!tHeader || !tHeader.last_delivery_status) return null
  const { code, status, status_details: statusDetails } = tHeader.last_delivery_status
  const theme = options.theme
  const iconName = getIconName(code, theme)
  const icon = Icon(iconName, null, '80')
  makeBig(icon)
  animatePulse(icon, 1)

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${status}
      </div>

      <div class="pl-box-body">
        ${icon}
      </div>

      <div class="pl-box-footer">
        <div class="pl-status-details">
          ${raw(statusDetails)}
        </div>
        ${slot ? html`
        <div class="pl-space-top">
          ${slot}
        </div>
      ` : null}
      </div>
    </div>
  `
}
