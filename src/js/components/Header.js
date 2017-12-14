const html = require('bel')
const { translate } = require('../../js/lib/translator.js')
const Tabs = require('./Tabs')

const Header = (state, emit) => {
  const tabs = Tabs(state, emit)
  const { query } = state
  if (query.orderNo) {
    const { header } = state.checkpoints

    return html`
    <div class="pl-header">
      <div class="pl-col-row">
        <div class="pl-order-no">
          ${ translate('orderNo', query.lang.code) } ${ query.orderNo }
        </div>
        ${ tabs ? html`
          <div class="pl-order-sub">
            ${ translate('containsOf', query.lang.code)} ${header.length} ${translate('deliveries', query.lang.code) }
          </div>
          ` : null }
      </div>
      ${ tabs ? html`<div class="pl-col-row">${ tabs }</div>` : null }
    </div>
    `
  } else return null
}

module.exports = Header