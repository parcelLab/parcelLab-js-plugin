const html = require('bel')

const MoreButton = (text, emit) => html`
  <div class="pl-row pl-alert pl-action pl-show-more-button" onclick=${() => emit('showAllCheckpoints')}>
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
