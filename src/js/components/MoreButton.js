const html = require('nanohtml')

const MoreButton = (text, emit) => html`
  <button id="pl-show-more-button" class="pl-button pl-is-fullwidth" onclick="${() => emit('showAllCheckpoints')}">
      ${ text }
  </button>
`

module.exports = MoreButton
