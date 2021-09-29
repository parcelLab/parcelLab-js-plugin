require('./scss/main.scss')
const ParcelLab = require('./js/parcelLab.js')
const ParcelLabPrediction = require('./js/parcelLabPrediction.js')

if (typeof window !== 'undefined') {
  window.ParcelLab = ParcelLab
  window.ParcelLabPrediction = ParcelLabPrediction
}

module.exports = {
  ParcelLab,
  ParcelLabPrediction
}
