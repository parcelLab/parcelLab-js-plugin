const html = require('bel')
const Icon = require('./Icon')
const statics = require('../lib/static')

const IconState = ({ checkpoints, activeTracking }) => {
  const tHeader = checkpoints.header[activeTracking]
  const visibleCps = checkpoints.body[tHeader.id].filter(cp => cp.shown === true).reverse()
  const currentCp = visibleCps[0]
  if (!currentCp) return null // show nothing if no currentCp
  
  let transitStatus = statics.transitStates[currentCp.status]
  if (!transitStatus) transitStatus = statics.transitStates.default
  if (transitStatus.color) transitStatus.color = transitStatus.color.replace('#', '')

  let firstIcon = null
  let secondIcon = null
  let thirdIcon = null

  switch (currentCp.status) {
    case 'OrderProcessed':
      firstIcon = Icon(transitStatus.icon, transitStatus.color || undefined)
      secondIcon = Icon('in_transit', 'eeeeee')
      thirdIcon = Icon('success_standard', 'eeeeee')
      break
      
    case 'Delivered':
      firstIcon = Icon('order_processed', 'eeeeee')
      secondIcon = Icon('in_transit', 'eeeeee')
      thirdIcon = Icon(transitStatus.icon, transitStatus.color || undefined)
      break
      
    default:
      firstIcon = Icon('order_processed', 'eeeeee')
      secondIcon = Icon(transitStatus.icon, transitStatus.color || undefined)
      thirdIcon = Icon('success_standard', 'eeeeee')
      
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
