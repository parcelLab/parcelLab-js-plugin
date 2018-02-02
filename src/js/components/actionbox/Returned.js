const html = require('bel')
const ReturnIcon = require('./svg/Return')

const Returned = ({ actionBox }) => {
  if (!actionBox.label) return null

  return html`
    <div class="pl-box pl-action-box pl-box-icon-status">
      <div class="pl-box-heading">
        ${ actionBox.label }
      </div>

      <div class="pl-box-body">
        ${ ReturnIcon() }
      </div>
    </div>
  `
}

module.exports = Returned
