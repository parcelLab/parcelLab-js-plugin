const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const transitStates = require('../../lib/static').transitStates

// hackish because of clarity icons ...
const makeBig = el => {
  if (el && el.style) {
    el.style.width = '80px'
    el.style.height = '80px'
  }

  return el
}

module.exports = function Fallback(tHeader) {
  if (!tHeader || !tHeader.last_delivery_status) return null
  const { code, status, status_details } = tHeader.last_delivery_status
  const transitState = transitStates[code] || transitStates.default
  const icon = transitState ? Icon(transitState.icon, null, '80') : null
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
