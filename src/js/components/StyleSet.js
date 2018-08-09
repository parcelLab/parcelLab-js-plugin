const html = require('nanohtml')
// border-radius: .pl-box .pl-form-input .pl-alert .pl-button

module.exports = function StyleSet() {
  return html`
    <style>
      .parcelLab-style #pl-plugin-wrapper, .parcellab-style #pl-plugin-wrapper, .parcelLab-styles #pl-plugin-wrapper, .parcellab-styles #pl-plugin-wrapper
      {
        margin: ${window.parcelLab_styles.margin};
      }
      .parcelLab-style .pl-box, .parcellab-style .pl-box, .parcelLab-styles .pl-box, .parcellab-styles .pl-box
      {
        border: 1px solid ${window.parcelLab_styles.borderColor};
      }
      .parcelLab-style .pl-box, .parcelLab-style .pl-form-input, .parcelLab-style .pl-alert, .parcelLab-style .pl-button, .parcelLab-style
      .pl-courier-vote, .parcellab-style .pl-box, .parcellab-style .pl-form-input, .parcellab-style .pl-alert, .parcellab-style
      .pl-button, .parcellab-style .pl-courier-vote, .parcelLab-styles .pl-box, .parcelLab-styles .pl-form-input, .parcelLab-styles
      .pl-alert, .parcelLab-styles .pl-button, .parcelLab-styles .pl-courier-vote, .parcellab-styles .pl-box, .parcellab-styles
      .pl-form-input, .parcellab-styles .pl-alert, .parcellab-styles .pl-button, .parcellab-styles .pl-courier-vote
      {
        border-radius: ${window.parcelLab_styles.borderRadius};
      }
      .parcelLab-style .pl-button, .parcellab-style .pl-button, .parcelLab-styles .pl-button, .parcellab-styles .pl-button
      {
        background-color: ${window.parcelLab_styles.buttonBackground};
        color: ${window.parcelLab_styles.buttonColor};
      }
      .parcelLab-style .pl-highlighted, .parcellab-style .pl-highlighted, .parcelLab-styles .pl-highlighted, .parcellab-styles .pl-highlighted
      {
        background-color: ${window.parcelLab_styles.highlightColor};
      }
      .parcelLab-style .pl-color-highlighted, .parcellab-style .pl-color-highlighted, .parcelLab-styles .pl-color-highlighted, .parcellab-styles .pl-color-highlighted 
      {
        color: ${window.parcelLab_styles.highlightColor};
      }
    </style>
  `
}
