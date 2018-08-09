const html = require('nanohtml')
const Icon = require('./Icon')
const statics = require('../lib/static')

const makeInactive = elem => {
  if (elem && elem.classList) {
    elem.classList.add('pl-state-icon-inactive')
  }

  return elem
}

const makeActive = elem => {
  if (elem && elem.classList) {
    elem.classList.add('pl-state-icon-active')
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
    case 'PickUpScheduled':
      firstIcon = makeActive(Icon(transitStatus.icon))
      secondIcon = makeInactive(Icon('in_transit'))
      thirdIcon = makeInactive(Icon('success_standard'))
      break
      
    case 'Delivered':
      firstIcon = makeInactive(Icon('order_processed'))
      secondIcon = makeInactive(Icon('in_transit'))
      thirdIcon = makeActive(Icon(transitStatus.icon))
      break
      
    default:
      firstIcon = makeInactive(Icon('order_processed'))
      secondIcon = makeActive(Icon(transitStatus.icon))
      thirdIcon = makeInactive(Icon('success_standard'))
      
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
