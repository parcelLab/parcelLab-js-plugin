const html = require('nanohtml')

const isInstagram = url => (url.indexOf('instagram') >= 0)

module.exports = function Banner({ Banner }) {
  if (Banner.banner_link === 'instagram') return null
  
  return html`
  <div class="pl-box-aside-right pl-col pl-col-4">
    <a href="${ Banner.banner_link }" target="_blank">
      <img class="pl-img-responsive ${ isInstagram(Banner.banner_link) ? 'pl-box' : '' }"
      src="${ Banner.banner_image }" style="border:none;">
    </a>
  </div>
  `
}
