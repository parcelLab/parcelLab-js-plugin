const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const { getIconName } = require('../../lib/static')
const { makeBig } = require('../../lib/helpers')

module.exports = function Fallback(tHeader, options) {
  if (!tHeader || !tHeader.last_delivery_status) return null
  const { code, status, status_details } = tHeader.last_delivery_status
  const xmas = options.xmas_theme || false
  const iconName = getIconName(code, xmas)
  const icon = Icon(iconName, null, '80')
  makeBig(icon)

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${ status }
      </div>

      <div class="pl-box-body">
        ${ icon }
      </div>

      <div class="pl-box-footer">
        ${ raw(status_details) }
      </div>
    </div>
  `
}
