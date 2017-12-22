import html from 'bel'

const Note = (state, emit) => {
  const handleClick = () => {
    emit('hideNote')  
  }

  return html`
    <div class="pl-note-box">
      <div class="pl-close-note-box hide-on-mobile" onclick="${handleClick}">
        <i class="fa fa-times"></i>
      </div>
      ${ state.options.show_note }
      <div class="pl-note-close-text hide-on-desktop" onclick="${handleClick}">
        tap to close note
      </div>
    </div>
  `
}

module.exports = Note