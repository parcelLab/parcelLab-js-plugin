const html = require('nanohtml')

const MoreButton = (text, emit, emitType='showAllCheckpoints') => html`
  <button id="pl-show-more-button" class="pl-button pl-is-fullwidth" onclick="${() => emit(emitType)}">
      ${ text }
  </button>
`

module.exports = MoreButton
