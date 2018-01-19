const html = require('bel')

const NextAction = ({ actionBox }) => {
  if (!actionBox.label) return null

  return html`
    <div class="pl-box" style="margin-bottom:15px;">
      <div class="pl-box-body" style="padding: 30px 25px; text-align: center;">
        <img src="https://png.icons8.com/office/128/000000/door.png">
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
