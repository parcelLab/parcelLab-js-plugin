const html = require('bel')
const ReturnIcon = require('./svg/Return')

const Returned = ({ actionBox }) => {
  if (!actionBox.label) return null

  return html`
    <div class="pl-box">
      <div class="pl-box-body" style="padding: 30px 25px; text-align: center;">
        ${ ReturnIcon() }
      </div>

      <div class="pl-box-footer" align="center">
        ${ actionBox.label }
      </div>
    </div>
  `
}

module.exports = Returned
