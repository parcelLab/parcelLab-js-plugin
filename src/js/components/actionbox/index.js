const PickupLocation = require('./PickupLocation')
const Prediction = require('./Prediction')
const VoteCourier = require('./VoteCourier')
const PickupLocationUnknown = require('./PickupLocationUnknown')
const OrderProcessed = require('./OrderProcessed')
const NextAction = require('./NextAction')
const Returned = require('./Returned')
const Fallback = require('./Fallback')
const DeliveryAddress = require('./DeliveryAddress')
const ArticleList = require('./ArticleList')

const ActionBox = ({ checkpoints, activeTracking, query, options }, emit) => {
  const tHeader = checkpoints.header[activeTracking]

  if (tHeader && tHeader.actionBox) {

    switch (tHeader.actionBox.type) {
    case 'pickup-location':
      if (tHeader.actionBox.data)
        return PickupLocation(tHeader, query.lang, emit)
      else
        return [Fallback(tHeader), ArticleList(tHeader, query.lang)]
    case 'vote-courier':
      return [Fallback(tHeader), VoteCourier(tHeader, options, emit)]
    case  'prediction':
      if (tHeader.actionBox.data &&
          (tHeader.actionBox.data.dayOfWeek || tHeader.actionBox.data.deliveryLocation))
        return [Prediction(tHeader), ArticleList(tHeader, query.lang)]
      else
        return [Fallback(tHeader), DeliveryAddress(tHeader, query.lang), ArticleList(tHeader, query.lang)]
    case 'pickup-location-unknown':
      return PickupLocationUnknown(tHeader, query.lang)
    case 'order-processed':
      return [OrderProcessed(tHeader), ArticleList(tHeader, query.lang)]
    case 'next-action':
      return [NextAction(tHeader), ArticleList(tHeader, query.lang)]
    case 'returned':
      return Returned(tHeader)
    default:
      return [Fallback(tHeader), DeliveryAddress(tHeader, query.lang), ArticleList(tHeader, query.lang)]

    }

  }
}

module.exports = ActionBox