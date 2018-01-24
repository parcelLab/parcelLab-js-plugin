const html = require('bel')

// Icons:
// bundle (order processed)
// truck (on the way)
// success-standard (delivered)
// map-marker (pickup)
// compass (rerouted)
// undo (return)
// error-standard (failed 1, 2, finail)
// warning-standard (exception)
// default (info-standard)

const Icon = function (iconName, hexColor='333333', size) {

  let path = `https://icongr.am/clarity/${ iconName }.svg?color=${ hexColor }`
  if (size) path = `${path}&size=${ size }`

  return html`<img src="${path}" class="pl-img-responsive" />`
}

module.exports = Icon
