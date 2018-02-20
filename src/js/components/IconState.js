const html = require('bel')
const Icon = require('./Icon')
const statics = require('../lib/static')
const INACTIVE_OPACITY = '.3'

const makeOpacity = (elem, opacity='1') => {
  if (elem && elem.style) {
    elem.style.opacity = opacity
  }
  return elem
}

const IconState = ({ checkpoints, activeTracking }) => {
  const tHeader = checkpoints.header[activeTracking]
  const visibleCps = checkpoints.body[tHeader.id].filter(cp => cp.shown === true).reverse()
  const currentCp = visibleCps[0]
  if (!currentCp) return null // show nothing if no currentCp
  
  let transitStatus = statics.transitStates[currentCp.status]
  if (!transitStatus) transitStatus = statics.transitStates.default

  let firstIcon = null
  let secondIcon = null
  let thirdIcon = null

  switch (currentCp.status) {
    case 'OrderProcessed':
      firstIcon = Icon(transitStatus.icon)
      secondIcon = makeOpacity(Icon('in_transit'), INACTIVE_OPACITY)
      thirdIcon = makeOpacity(Icon('success_standard'), INACTIVE_OPACITY)
      break
      
    case 'Delivered':
      firstIcon = makeOpacity(Icon('order_processed'), INACTIVE_OPACITY)
      secondIcon = makeOpacity(Icon('in_transit'), INACTIVE_OPACITY)
      thirdIcon = Icon(transitStatus.icon)
      break
      
    default:
      firstIcon = makeOpacity(Icon('order_processed'), INACTIVE_OPACITY)
      secondIcon = Icon(transitStatus.icon)
      thirdIcon = makeOpacity(Icon('success_standard'), INACTIVE_OPACITY)
      
  }

  return html`
      <div class="pl-icon-hr-container">
        <div class="pl-icon-hr"></div>

        <div class="pl-hr-icon pl-hr-icon-left">
          ${ firstIcon }
        </div>
        <div class="pl-hr-icon pl-hr-icon-center">
          ${ secondIcon }
        </div>
        <div class="pl-hr-icon pl-hr-icon-right">
          ${ thirdIcon }
        </div>
      </div>
    `
}

module.exports = IconState
