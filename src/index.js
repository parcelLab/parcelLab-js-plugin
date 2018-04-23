require('./scss/main.scss')
const ParcelLab = require('./js/parcelLab.js')
const ParcelLabPrediction = require('./js/parcelLabPrediction.js')

if (window) {
  window.ParcelLab = ParcelLab
  window.ParcelLabPrediction = ParcelLabPrediction
}
