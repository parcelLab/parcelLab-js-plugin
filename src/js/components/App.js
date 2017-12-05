const html = require('yo-yo')
const store = require('../store')
const actions = require('../store/actions')

const App = state => {

  return html`
    <div>
      ${ state.checkpoints ? 'fin' : 'loading' }
    </div>
  `
}

module.exports = App
