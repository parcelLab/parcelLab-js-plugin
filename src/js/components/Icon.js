const html = require('bel')
const { icon_url } = require('../../settings')
const base = icon_url

module.exports = function Icon(iconName, color, size) {
  size = size || '32'
  color = color || '#333333'
  color = color.replace('#', '')
  const path = `${base}${iconName}?color=${ color }`

  return html`<img src="${path}" class="pl-img-responsive" style="max-width: ${size};" />`
}
