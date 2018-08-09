const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')

const Subheading = state => {
  const noTabs = (state.checkpoints && state.checkpoints.header.length === 1)
  if (noTabs && state.query.orderNo) 
    return html`
      <div class="pl-order-subheading">
        ${ translate('orderNo', state.query.lang.name) } ${ state.query.orderNo }
      </div>`
  else return null
}

module.exports = Subheading
