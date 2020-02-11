const PickupLocation = require('./PickupLocation')
const Prediction = require('./Prediction')
const VoteCourier = require('./partials/Voting')
const PickupLocationUnknown = require('./PickupLocationUnknown')
const NextAction = require('./NextAction')
const Returned = require('./Returned')
const Default = require('./Default')
const DeliveryAddress = require('./partials/DeliveryAddress')
const LiveTrackingLink = require('./LiveTrackingLink')
const LiveTrackingMap = require('./LiveTrackingMap')

const ActionBox = (activeTracking, { query, options }, emit) => {
  const tHeader = activeTracking.header

  if (tHeader && tHeader.actionBox) {
    const { type } = tHeader.actionBox
    let result = null

    if (type === 'pickup-location' && tHeader.actionBox.data) {
      result = PickupLocation(tHeader, {
        lang: query.lang,
        emit
      })
    }

    if (type === 'vote-courier') {
      result = Default(tHeader, {
        options,
        slot: VoteCourier(tHeader, { options, emit })
      })
    }

    if (type === 'prediction') {
      if (tHeader.actionBox.data &&
        (tHeader.actionBox.data.dayOfWeek || tHeader.actionBox.data.deliveryLocation)) {
        result = Prediction(tHeader, {
          slot: DeliveryAddress(tHeader, { lang: query.lang })
        })
      }
    }

    if (type === 'pickup-location-unknown') {
      result = PickupLocationUnknown(tHeader, { lang: query.lang })
    }

    if (type === 'next-action') {
      result = NextAction(tHeader)
    }

    if (type && type.indexOf('returned') === 0) {
      result = Returned(tHeader)
    }

    if (type === 'live-tracking') {
      if (tHeader.actionBox.info && tHeader.courier && tHeader.courier.trackingurl) {
        result = LiveTrackingLink(tHeader, {
          lang: query.lang,
          userId: query.userId,
          animateTruck: options.animateTruck || false
        })
      }
    }

    if (type === 'live-tracking-map' && tHeader.actionBox.data) {
      result = LiveTrackingMap(tHeader, {
        lang: query.lang,
        slot: DeliveryAddress(tHeader, { lang: query.lang })
      })
    }

    result = result || Default(tHeader, {
      options,
      slot: DeliveryAddress(tHeader, { lang: query.lang })
    })

    return result
  }
}

module.exports = ActionBox
