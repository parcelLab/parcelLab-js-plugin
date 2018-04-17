require('../scss/main.scss')
const ParcelLab = require('./parcelLab.js')
const ParcelLabPrediction = require('./parcelLabPrediction.js')

if (window) {
  window.ParcelLab = ParcelLab
  window.ParcelLabPrediction = ParcelLabPrediction
} else if (module && module.exports) {
  exports.ParcelLab = ParcelLab
  exports.ParcelLabPrediction = ParcelLabPrediction
}
