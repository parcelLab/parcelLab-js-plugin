const html = require('bel')
const raw = require('bel/raw')
const Icon = require('../Icon')
const transitStates = require('../../lib/static').transitStates

module.exports = function Fallback(tHeader) {
  if (!tHeader || !tHeader.last_delivery_status) return null
  const { code, status, status_details } = tHeader.last_delivery_status
  const transitState = transitStates[code] || transitStates.default
  const iconColor = transitState.color ? transitState.color.replace('#', '') : undefined
  const icon = transitState ? Icon(transitState.icon, iconColor, '80') : null

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
