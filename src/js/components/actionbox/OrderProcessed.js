const html = require('bel')
const BoxIcon = require('../svg/Box')

const OrderProcessed = ({ actionBox }) => {

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${ actionBox.label }
      </div>

    
      <div class="pl-box-body">
        ${ BoxIcon() }
      </div>
    </div>
  `  
}

module.exports = OrderProcessed
