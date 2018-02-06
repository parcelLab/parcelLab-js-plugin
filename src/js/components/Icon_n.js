const html = require('bel')

const base = 'https://s3.eu-central-1.amazonaws.com/parcellab-cdn/img/icon/plugin/'

module.exports = function Icon(iconName, { size, color }) {
  size = size || '32'
  color = color || '#333333'
  const path = `${base}${iconName}.svg`

  return html`<img src="${path}" class="pl-img-responsive" style="max-width: ${size};" />`
}
