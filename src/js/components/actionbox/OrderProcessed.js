const html = require('bel')
const BoxIcon = require('./svg/Box')

const OrderProcessed = ({ actionBox }) => {

  return html`
    <div class="pl-box">
      <div class="pl-box-body" style="padding: 30px 25px; text-align: center;">
        ${ BoxIcon() }
      </div>

      <div class="pl-box-footer" align="center">
        ${ actionBox.label }
      </div>
    </div>
  `  
}

module.exports = OrderProcessed
