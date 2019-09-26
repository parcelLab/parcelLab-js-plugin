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

  if (tHeader && tHeader.actionBox) {
    const { type } = tHeader.actionBox
    let result = null

    if (type === 'pickup-location' && tHeader.actionBox.data) {
      result = PickupLocation(tHeader, query.lang, emit)
    }

    if (type === 'vote-courier') {
      result = [
        Fallback(tHeader, options),
        VoteCourier(tHeader, options, emit)
      ]
    }

    if (type === 'prediction') {
      if (tHeader.actionBox.data &&
        (tHeader.actionBox.data.dayOfWeek || tHeader.actionBox.data.deliveryLocation)) {
        result = [
          Prediction(tHeader),
          DeliveryAddress(tHeader, query.lang)
        ]
      }
    }

    if (type === 'pickup-location-unknown') {
      result = PickupLocationUnknown(tHeader, query.lang)
    }

    if (type === 'next-action') {
      result = NextAction(tHeader)
    }

    if (type === 'returned') {
      result = Returned(tHeader)
    }

    if (type === 'live-tracking') {
      if (tHeader.actionBox.info && tHeader.courier && tHeader.courier.trackingurl) {
        result = LiveTracking(tHeader, query, options.animateTruck || false)
      }
    }

    result = result || [ // fallback
      Fallback(tHeader, options),
      DeliveryAddress(tHeader, query.lang)
    ]

    return result
  }
}

module.exports = ActionBox
