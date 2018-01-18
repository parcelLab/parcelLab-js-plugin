const PickupLocation = require('./PickupLocation')
const Prediction = require('./Prediction')
const VoteCourier = require('./VoteCourier')
const PickupLocationUnknown = require('./PickupLocationUnknown')

const ActionBox = ({ checkpoints, activeTracking, query }, emit) => {
  const tHeader = checkpoints.header[activeTracking]
  tHeader.actionBox = { type: 'pickup-location-unknown', label: 'Weitere Details zum Standort Ihrer Sendung finden Sie auf der Website von DHL.' }
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
      default:
        return null
    }

  }
}

module.exports = ActionBox