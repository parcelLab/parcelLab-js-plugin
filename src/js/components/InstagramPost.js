const html = require('nanohtml')
const Icon = require('./Icon')

module.exports = function InstagramPost({ options }) {
  const { instagram } = options
  const username = instagram.igurl.replace(/\/$/g, '').split('/').pop()
  const icon = Icon('instagram', '#d3d3d3', 25)
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'middle'
  icon.style.marginRight = '10px'

  return html`
  <div class="pl-box-aside-right pl-col pl-col-4">
    <div class="pl-box pl-instagram-box">
      <div class="pl-box-heading">
        ${ icon }
        <b>${ username }</b>
      </div>
      <a href="${ instagram.igurl }" target="_blank">
        <img class="pl-img-responsive"
        src="${ instagram.imgsrc.thumb }" style="border:none;">
      </a>
      <div class="pl-box-footer">
        ${ instagram.caption }
      </div>
    </div>
  </div>
  `
}
