const html = require('bel')

const Returned = ({ actionBox }) => {
  if (!actionBox.label) return null

  return html`
    <div class="pl-box" style="margin-bottom:15px;">
      <div class="pl-box-body" style="padding: 30px 25px; text-align: center;">
        <img src="https://png.icons8.com/cotton/126/000000/rotate.png">
      </div>

      <div class="pl-box-footer" align="center">
        ${ actionBox.label }
      </div>
    </div>
  `
}

module.exports = Returned
