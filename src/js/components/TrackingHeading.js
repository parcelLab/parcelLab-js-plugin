const { translate } = require('../../js/lib/translator.js')

const TrackingHeading = ({ checkpoints, activeTracking, query }) => {
  if (!checkpoints) return null

  try {
    const tHeader = checkpoints.header[activeTracking]
    const courier = checkpoints.header[activeTracking].courier.prettyname || query.courier
    return `${translate('delivery', query.lang.code)} ${tHeader.tracking_number} (${courier})`
  } catch (e) {
    console.log(e)
    return 'Unknown Tracking Number'
  }
}

module.exports = TrackingHeading
