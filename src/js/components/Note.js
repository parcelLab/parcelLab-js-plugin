const html = require('nanohtml')
const Icon = require('./Icon')


const Note = (state, emit) => {
  const handleClick = () => {
    emit('hideNote')  
  }

  return html`
    <div class="pl-box pl-note-box pl-space-bottom">
      <div class="pl-close-note-box hide-on-mobile" onclick="${handleClick}">
        ${ Icon('times', '#aaa', '20') }
      </div>
      ${ state.options.show_note }
      <div class="pl-note-close-text hide-on-desktop" onclick="${handleClick}">
        tap to close note
      </div>
    </div>
  `
}

module.exports = Note