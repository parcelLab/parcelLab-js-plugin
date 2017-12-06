const html = require('yo-yo')
const store = require('../store')
const { setState } = require('../store/actions')

const MoreButton = text => html`
  <div class="pl-row pl-alert pl-action pl-show-more-button" onclick=${() => store(setState({ showAllCheckpoints: true }))}>
    <div class="pl-icon">
      <span class="fa-stack fa-lg">
        <i class="fa fa-circle fa-stack-2x" style="color:#eee;"></i>
        <i class="fa fa-ellipsis-h fa-stack-1x fa-inverse"></i>
      </span>
    </div>
    <div class="pl-text pl-show-more-text">
      ${ text }
      <br>
    </div>
  </div>
`

module.exports = MoreButton
