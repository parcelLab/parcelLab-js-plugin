const html = require('nanohtml')
const Icon = require('../Icon')
const { getIconName } = require('../../lib/static')

const OrderProcessed = ({ actionBox }, options) => {
  const xmas = options.xmas_theme || false
  let iconName = getIconName('OrderProcessed', xmas)

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${ actionBox.label }
      </div>

    
      <div class="pl-box-body">
        ${ Icon(iconName, null, '80') }
      </div>
    </div>
  `  
}

module.exports = OrderProcessed
