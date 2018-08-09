const html = require('nanohtml')
const raw = require('nanohtml/raw')

const Checkpoint = cp => html`
  <div class="pl-checkpoint ${ cp.alert ? `pl-${cp.alert}` : '' }">
    <div><small>${ cp.dateText}  ${cp.locationText }</small></div>
    <div><b>${ cp.status_text}</b></div>
    <div>${ raw(cp.status_details) }</div>
  </div>
`

module.exports = Checkpoint
