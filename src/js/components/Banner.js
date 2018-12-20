const html = require('nanohtml')

module.exports = function Banner({ options }) {

  return html`
  <div class="pl-box-aside-right pl-col pl-col-4">
    <a href="${ options.banner_link}" target="_blank">
      <img class="pl-img-responsive pl-box" src="${ options.banner_image}" style="border:none;">
    </a>
  </div>
  `
}
