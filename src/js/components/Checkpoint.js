const html = require('nanohtml')
const raw = require('nanohtml/raw')

const Checkpoint = cp => html`
  <div class="pl-checkpoint ${cp.alert ? `pl-${cp.alert}` : ''}">
    <div class="pl-checkpoint-date">${cp.dateText}  ${cp.locationText}</div>
    <div class="pl-checkpoint-status"><b>${cp.status_text}</b></div>
    <div class="pl-checkpoint-details">${raw(cp.status_details)}</div>
  </div>
`

module.exports = Checkpoint
