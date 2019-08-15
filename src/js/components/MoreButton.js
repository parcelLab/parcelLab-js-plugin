const html = require('nanohtml')

const MoreButton = (text, emit, action = 'showAllCheckpoints') => html`
<div class="pl-show-more-button-container">
  <button  class="pl-is-fullwidth pl-show-more-button" onclick="${() => emit(action)}">
      ${ text }
  </button>
</div>
`

module.exports = MoreButton
