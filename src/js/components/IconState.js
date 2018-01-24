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

  let showOnMobile = 2
  let firstIcon = null
  let secondIcon = null
  let thirdIcon = null
  console.log(currentCp.status)
  switch (currentCp.status) {
    case 'OrderProcessed':
      firstIcon = Icon(transitStatus.icon, transitStatus.color || undefined)
      secondIcon = Icon('truck', 'eeeeee')
      thirdIcon = Icon('success-standard', 'eeeeee')
      showOnMobile = 1
      break
      
    case 'Delivered':
      firstIcon = Icon('bundle', 'eeeeee')
      secondIcon = Icon('truck', 'eeeeee')
      thirdIcon = Icon(transitStatus.icon, transitStatus.color || undefined)
      showOnMobile = 3
      break
      
    default:
      firstIcon = Icon('bundle', 'eeeeee')
      secondIcon = Icon(transitStatus.icon, transitStatus.color || undefined)
      thirdIcon = Icon('success-standard', 'eeeeee')
      
  }

  return html`
      <div class="pl-col-row pl-icon-state">
        <div class="pl-col pl-col-4 ${ showOnMobile !== 1 ? 'hide-on-mobile' : ''}" align="center">
          ${ firstIcon }
        </div>
        <div class="pl-col pl-col-4 ${ showOnMobile !== 2 ? 'hide-on-mobile' : ''}" align="center">
          ${ secondIcon }
        </div>
        <div class="pl-col pl-col-4 ${ showOnMobile !== 3 ? 'hide-on-mobile' : ''}" align="center">
          ${ thirdIcon }
        </div>
      </div>
    `
}

module.exports = IconState
