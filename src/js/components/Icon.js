const html = require('nanohtml')
const { icon_url: iconUrl } = require('../../settings')
const base = iconUrl

module.exports = function Icon (iconName, color, size) {
  size = size || '32'
  color = color || window.parcelLab_styles.iconColor
  color = color.replace('#', '')
  const path = `${base}${iconName}?color=${color}`

  return html`<img src="${path}" class="pl-img-responsive" style="max-width: ${size}px;max-height: ${size}px;" role="img" />`
}
