const html = require('nanohtml')
const Icon = require('./Icon')
const { getIconName } = require('../lib/static')

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

const IconState = (activeTracking, options) => {
  const visibleCps = activeTracking.body.filter(cp => cp.shown === true).reverse()
  const currentCp = visibleCps[0]
  if (!currentCp) return null // show nothing if no currentCp

  const theme = options.theme
  const cpStateIconName = getIconName(currentCp.status, theme)
  const orderProcessedIconName = getIconName('OrderProcessed', theme)
  const inTransitIconName = getIconName('InTransit', theme)
  const successIconName = getIconName('Delivered', theme)

  let firstIcon = null
  let secondIcon = null
  let thirdIcon = null

  switch (currentCp.status) {
    case 'OrderProcessed':
    case 'PickUpScheduled':
      firstIcon = makeActive(Icon(cpStateIconName))
      secondIcon = makeInactive(Icon(inTransitIconName))
      thirdIcon = makeInactive(Icon(successIconName))
      break

    case 'Delivered':
      firstIcon = makeInactive(Icon(orderProcessedIconName))
      secondIcon = makeInactive(Icon(inTransitIconName))
      thirdIcon = makeActive(Icon(cpStateIconName))
      break

    default:
      firstIcon = makeInactive(Icon(orderProcessedIconName))
      secondIcon = makeActive(Icon(cpStateIconName))
      thirdIcon = makeInactive(Icon(successIconName))
  }

  return html`
      <div class="pl-icon-hr-container">
        <div class="pl-icon-hr"></div>

        <div class="pl-hr-icon pl-hr-icon-left">
          ${firstIcon}
        </div>
        <div class="pl-hr-icon pl-hr-icon-center">
          ${secondIcon}
        </div>
        <div class="pl-hr-icon pl-hr-icon-right">
          ${thirdIcon}
        </div>
      </div>
    `
}

module.exports = IconState
