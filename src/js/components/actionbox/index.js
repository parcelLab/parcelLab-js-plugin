const PickupLocation = require('./PickupLocation')
const Prediction = require('./Prediction')
const VoteCourier = require('./VoteCourier')
const PickupLocationUnknown = require('./PickupLocationUnknown')
const NextAction = require('./NextAction')
const Returned = require('./Returned')
const Fallback = require('./Fallback')
const DeliveryAddress = require('./DeliveryAddress')
const ZipInput = require('./ZipInput')
const LiveTrackingLink = require('./LiveTrackingLink')
const LiveTrackingMap = require('./LiveTrackingMap')

const ActionBox = ({ checkpoints, activeTracking, query, options, apiLoading }, emit) => {
  const tHeader = checkpoints.header[activeTracking]
  const containsPersonalData = !!tHeader.delivery_info
  const zipInput = (options.forceZip && !containsPersonalData) ? ZipInput(tHeader, query, apiLoading, emit) : null

  if (tHeader && tHeader.actionBox) {
    const { type } = tHeader.actionBox
    let result = []

    if (type === 'pickup-location' && tHeader.actionBox.data) {
      result = [
        PickupLocation(tHeader, query.lang, emit),
        zipInput
      ]
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
          zipInput || DeliveryAddress(tHeader, query.lang)
        ]
      }
    }

    if (type === 'pickup-location-unknown') {
      result = [PickupLocationUnknown(tHeader, query.lang)]
    }

    if (type === 'next-action') {
      result = [NextAction(tHeader), zipInput]
    }

    if (type && type.indexOf('returned') === 0) {
      result = [Returned(tHeader), zipInput]
    }

    if (type === 'live-tracking') {
      if (tHeader.actionBox.info && tHeader.courier && tHeader.courier.trackingurl) {
        result = [
          LiveTrackingLink(tHeader, query, options.animateTruck || false), zipInput
        ]
      }
    }

    if (type === 'live-tracking-map' && tHeader.actionBox.data) {
      result = [
        LiveTrackingMap(tHeader, query),
        zipInput || DeliveryAddress(tHeader, query.lang)
      ]
    }

    result = (result && result.length > 0) ? result : [ // fallback
      Fallback(tHeader, options),
      zipInput || DeliveryAddress(tHeader, query.lang)
    ]

    return result
  }
}

module.exports = ActionBox
