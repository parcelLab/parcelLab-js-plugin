const { translate } = require('../../js/lib/translator.js')

const Heading = ({ checkpoints, activeTracking, query }) => {
  if (!checkpoints) return null

  if (query.orderNo) {
    return `${translate('orderNo', query.lang.code)} ${query.orderNo}`
  } else if (query.trackingNo) {
    let res = ''
    const courier = checkpoints.header[activeTracking].courier.prettyname || query.courier
    res += `${translate('delivery', query.lang.code)} ${query.trackingNo} (${courier})`
    return res
  } else {
    return 'Unknown tracking'
  }
}

module.exports = Heading
