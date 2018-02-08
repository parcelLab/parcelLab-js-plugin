const html = require('bel')

// const base = 'https://icon.parcellab.com/'
const base = 'http://icon.parcellab.com/'

module.exports = function Icon(iconName, color, size) {
  size = size || '32'
  color = color || '#333333'
  color = color.replace('#', '')
  const path = `${base}${iconName}?color=${ color }`

  return html`<img src="${path}" class="pl-img-responsive" style="max-width: ${size};" />`
}
