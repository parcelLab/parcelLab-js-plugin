const PickupLocation = require('./PickupLocation')
const Prediction = require('./Prediction')
const VoteCourier = require('./VoteCourier')
const PickupLocationUnknown = require('./PickupLocationUnknown')
const NextAction = require('./NextAction')
const Returned = require('./Returned')
const Fallback = require('./Fallback')
const DeliveryAddress = require('./DeliveryAddress')
const LiveTracking = require('./LiveTracking')

const ActionBox = ({ checkpoints, activeTracking, query, options }, emit) => {
  const tHeader = checkpoints.header[activeTracking]
  if (!tHeader) return null

  let result = null
  if (tHeader && tHeader.actionBox) {
    const type = tHeader.actionBox.type

    if (type === 'pickup-location' && tHeader.actionBox.data) {
      result = PickupLocation(tHeader, query.lang, emit)
    } else if (type === 'vote-courier') {
      result = Fallback(tHeader, options, VoteCourier(tHeader, options, emit))
    } else if (type === 'prediction' &&
    tHeader.actionBox.data &&
    (tHeader.actionBox.data.dayOfWeek || tHeader.actionBox.data.deliveryLocation)
    ) {
      result = Prediction(tHeader)
    } else if (type === 'pickup-location-unknown') {
      result = PickupLocationUnknown(tHeader, query.lang)
    } else if (type === 'next-action') {
      result = NextAction(tHeader)
    } else if (type === 'returned') {
      result = Returned(tHeader)
    } else if (type === 'live-tracking' &&
    tHeader.actionBox.info &&
    tHeader.courier &&
    tHeader.courier.trackingurl
    ) {
      result = LiveTracking(tHeader, query, options.animateTruck || false)
    }
  }

  if (!result) result = Fallback(tHeader, options, DeliveryAddress(tHeader, query.lang))

  return result
}

module.exports = ActionBox
