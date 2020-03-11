const html = require('nanohtml')

module.exports = function StyleSet () {
  return html`
    <style>
      .parcellab-styles #pl-plugin-wrapper {
        margin: ${window.parcelLab_styles.margin};
      }
      .parcellab-styles .pl-box {
        border: 1px solid ${window.parcelLab_styles.borderColor};
        border-width: ${window.parcelLab_styles.boxBorderWidth || '1px'};
      }
      .parcellab-styles .pl-box,
      .parcellab-styles .pl-form-input,
      .parcellab-styles .pl-alert,
      .parcellab-styles .pl-button,
      .parcellab-styles .pl-courier-vote {
        border-radius: ${window.parcelLab_styles.borderRadius};
      }
      .parcellab-styles .pl-button {
        background-color: ${window.parcelLab_styles.buttonBackground};
        color: ${window.parcelLab_styles.buttonColor};
      }
      .parcellab-styles .pl-box-live-location .pl-live-map-footer {
        background-color: ${window.parcelLab_styles.liveMapBackground};
        color: ${window.parcelLab_styles.liveMapColor};
      }
    </style>
  `
}
