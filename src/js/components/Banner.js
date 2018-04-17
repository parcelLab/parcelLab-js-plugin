const html = require('bel')

module.exports = function Banner({ options }) {

  return html`
  <div class="pl-box-aside-right pl-col pl-col-4">
    <a href="${ options.banner_link}" target="_blank">
      <img class="pl-img-responsive" src="${ options.banner_image}" style="border:none;">
    </a>
  </div>
  `
}
