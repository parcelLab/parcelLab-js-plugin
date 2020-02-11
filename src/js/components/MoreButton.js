const html = require('nanohtml')

const MoreButton = (text, tId, emit) => html`
  <button id="pl-show-more-button" class="pl-button pl-is-fullwidth pl-hide-on-desktop" onclick="${() => emit('showAllCheckpoints', tId)}">
      ${text}
  </button>
`

module.exports = MoreButton
