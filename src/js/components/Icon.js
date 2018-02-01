const html = require('bel')

// Icons:
// https://icongr.am/

module.exports = function Icon(iconName, hexColor='333333', size='32') {
  const path = `https://icongr.am/clarity/${iconName}.svg?color=${hexColor}&size=${size}`

  return html`<img src="${path}" class="pl-img-responsive" />`
}
