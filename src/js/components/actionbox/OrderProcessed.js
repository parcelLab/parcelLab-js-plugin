const html = require('bel')

const OrderProcessed = ({ actionBox }) => {

  return html`
    <div class="pl-box">
      <div class="pl-box-body" style="padding: 30px 25px; text-align: center;">
        <img src="https://png.icons8.com/cotton/128/000000/open-box.png">
      </div>

      <div class="pl-box-footer" align="center">
        ${ actionBox.label }
      </div>
    </div>
  `  
}

module.exports = OrderProcessed
