const html = require('nanohtml')
const { checkUrl } = require('../../js/lib/helpers')

const isInstagram = url => (url.indexOf('instagram') >= 0)

module.exports = function Banner ({ options }) {
  if (!checkUrl(options.banner_link)) {
    console.error('⚠️ The banner image link does not contain a valid URL!')
    return null
  }
  if (options.image === 'instagram') return null

  return html`
  <div class="pl-box-aside-right pl-col pl-col-4">
    <a href="${options.banner_link}" target="_blank">
      <img class="pl-img-responsive ${isInstagram(options.banner_link) ? 'pl-box' : ''}"
      src="${options.banner_image}" style="border:none;">
    </a>
  </div>
  `
}
