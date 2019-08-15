const html = require('nanohtml')
const T = require('../lib/translator.js')
const statics = require('../lib/static')
const Checkpoint = require('./Checkpoint')
const MoreButton = require('./MoreButton')
const IconState = require('./IconState')

const showTimeOnCheckpoint = (d, i) => {
  if (!d || i === 0) return false
  else if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCMilliseconds() === 0)
    return false
  else return true
}

const prepareCheckpoints = (checkpoints, query) => checkpoints.map((cp, i) => {
  const ts = cp.timestamp ? new Date(cp.timestamp) : null
  if (ts) cp.dateText = T.date(ts, showTimeOnCheckpoint(ts, i), query.lang.name)

  cp.transitStatus = statics.transitStates[cp.status]
  if (typeof cp.transitStatus === 'undefined')
    cp.transitStatus = statics.transitStates.default

  cp.locationText = cp.location ? ' (' + cp.location + ')' : ''
  cp.alert = i === checkpoints.length - 1 ?
    'checkpoint-' + (cp.transitStatus.alert ?
      cp.transitStatus.alert : 'info') : ''

  return cp
}).filter(cp => true && cp.shown).reverse()

const TrackingTrace = (state, emit) => {
  const { checkpoints, activeTracking, query, showAllCheckpoints, options } = state
  if (!checkpoints) return null

  // const aceptedStatus = 'OutForDelivery DestinationDeliveryCenter'
  const tHeader = checkpoints.header[activeTracking]
  const tBody = checkpoints.body[tHeader.id]
  const iconState = IconState({ checkpoints, activeTracking, options })
  // const furtherInfos = FurtherInfos(tHeader, query.lang.name)
  
  let tCheckpoints = prepareCheckpoints(tBody, query)
  let moreButton = MoreButton(T.translate('more', query.lang.name), emit)

  const boxBody = html`
  <div class="pl-box-body">
    ${ iconState }
    ${ tCheckpoints.map(tCp => Checkpoint(tCp)) }
  </div>
  `

  return html`
    <div id="pl-t-${tHeader.id}" class="pl-box pl-box-trace ${ showAllCheckpoints ? 'pl-scrollable' : ''}">

      ${ boxBody }
      
      ${ moreButton }
    </div>
  `
}

module.exports = TrackingTrace
