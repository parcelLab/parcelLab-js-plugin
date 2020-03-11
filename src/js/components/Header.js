const html = require('nanohtml')
const { translate } = require('../../js/lib/translator.js')
const Tabs = require('./Tabs')

const OrderStats = header => {
  if (header) {
    const orderStats = {}

    header.filter(h => h.last_delivery_status).forEach(({ last_delivery_status: current }) => {
      if (orderStats[current.status]) orderStats[current.status]++
      else orderStats[current.status] = 1
    })

    if (Object.keys(orderStats).length > 0) {
      return Object.keys(orderStats).map(stat => `${orderStats[stat]} ${stat}`).join(', ')
    }
  } else return null
}

const Header = (state, emit) => {
  const tabs = Tabs(state, emit)
  const { query } = state
  const { header } = state.checkpoints

  if (tabs && query.orderNo) {
    const orderStatsText = OrderStats(header)

    return html`
      <div class="pl-space-bottom">
        <div class="pl-header">
          <div class="pl-order-no">
            ${translate('orderNo', query.lang.name)} ${query.orderNo}
          </div>

          <div class="pl-order-sub">
            ${translate('containsOf', query.lang.name)} ${header.length} ${translate('deliveries', query.lang.name)}

            ${orderStatsText ? `(${orderStatsText})` : null}
          </div>

          ${tabs}
      </div>
    `
  } else if (!tabs && query.orderNo) {
    return html`
      <div class="pl-header pl-header-plain">
        <div class="pl-order-no">
          ${translate('orderNo', query.lang.name)} ${query.orderNo}
        </div>
      </div>`
  }
}

module.exports = Header
