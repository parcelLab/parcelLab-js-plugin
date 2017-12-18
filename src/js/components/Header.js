const html = require('bel')
const { translate } = require('../../js/lib/translator.js')
const Tabs = require('./Tabs')

const Header = (state, emit) => {
  const tabs = Tabs(state, emit)
  const { query } = state
  if (tabs && query.orderNo) {
    const { header } = state.checkpoints

    return html`
    <div class="pl-header">
      <div class="pl-col-row">
        <div class="pl-order-no">
          ${ translate('orderNo', query.lang.code) } ${ query.orderNo }
        </div>

          <div class="pl-order-sub">
            ${ translate('containsOf', query.lang.code)} ${header.length} ${translate('deliveries', query.lang.code) }
          </div>

      </div>
      <div class="pl-col-row">${ tabs }</div>
    </div>
    `
  } else return null
}

module.exports = Header