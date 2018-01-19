const PickupLocation = require('./PickupLocation')
const Prediction = require('./Prediction')
const VoteCourier = require('./VoteCourier')
const PickupLocationUnknown = require('./PickupLocationUnknown')
const OrderProcessed = require('./OrderProcessed')
const NextAction = require('./NextAction')
const Returned = require('./Returned')

const ActionBox = ({ checkpoints, activeTracking, query }, emit) => {
  const tHeader = checkpoints.header[activeTracking]

  if (tHeader && tHeader.actionBox) {
    switch (tHeader.actionBox.type) {
      case 'pickup-location':
        if (tHeader.actionBox.data) {
          return PickupLocation(tHeader, query.lang, emit)
        }
        else return null
      case 'vote-courier':
        return VoteCourier(tHeader, emit)
      case  'prediction':
        if (tHeader.actionBox.data) return Prediction(tHeader)
        else return null
      case 'pickup-location-unknown':
        return PickupLocationUnknown(tHeader)
      case 'order-processed':
        return OrderProcessed(tHeader)
      case 'next-action':
        return NextAction(tHeader)
      case 'returned':
        return Returned(tHeader)
      default:
        return null
    }

  }
}

module.exports = ActionBox