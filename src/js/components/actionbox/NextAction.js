const html = require('bel')
const CancelIcon = require('./svg/Cancel')

const NextAction = ({ actionBox }) => {
  if (!actionBox.label) return null

  return html`
    <div class="pl-box">
      <div class="pl-box-body" style="padding: 30px 25px; text-align: center;">
        ${ CancelIcon() }
      </div>

      <div class="pl-box-seperator">
        ${ actionBox.label}
      </div>
      <div class="pl-box-body" style="padding:10px 25px;">
        <div>${ actionBox.caption }</div>
      </div>
    </div>
  `
}

module.exports = NextAction
