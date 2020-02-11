const { translate } = require('../../js/lib/translator.js')

const TrackingHeading = ({ checkpoints, activeTrackingIndex, query }) => {
  if (!checkpoints) return null

  try {
    const tHeader = checkpoints.header[activeTrackingIndex]
    const courier = tHeader ? tHeader.courier.prettyname : query.courier
    return `${translate('delivery', query.lang.name)} ${tHeader.tracking_number} (${courier})`
  } catch (e) {
    return 'Unknown Tracking Number'
  }
}

module.exports = TrackingHeading
