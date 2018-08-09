const html = require('nanohtml')
const Icon = require('../Icon')

const OrderProcessed = ({ actionBox }) => {

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${ actionBox.label }
      </div>

    
      <div class="pl-box-body">
        ${ Icon('order_processed', null, '80') }
      </div>
    </div>
  `  
}

module.exports = OrderProcessed
