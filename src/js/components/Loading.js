const html = require('bel')

const Loading = () => html`
  <div class="pl-sk-three-bounce">
    <div class="pl-sk-child pl-sk-bounce1"></div>
    <div class="pl-sk-child pl-sk-bounce2"></div>
    <div class="pl-sk-child pl-sk-bounce3"></div>
  </div>
`

module.exports = Loading
