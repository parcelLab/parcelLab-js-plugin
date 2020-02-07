const html = require('nanohtml')

const isInstagram = url => (url.indexOf('instagram') >= 0)

module.exports = function Banner ({ options }) {
  if (options.banner_link === 'instagram') return null

  return html`
    <a href="${options.banner_link}" target="_blank">
      <img class="pl-img-responsive ${isInstagram(options.banner_link) ? 'pl-box' : ''}"
      src="${options.banner_image}" style="border:none;width:100%;">
    </a>
  `
}
