const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('./Icon')

const Hashtag = str => `<a target="_blank" href="https://www.instagram.com/explore/tags/${str.substr(1)}">${str}</a>`

const hashtagify = str => {
  return raw(str.split(/\s/).map((wrd) => (wrd[0] === '#') ? Hashtag(wrd) : wrd).join(' '))
}

module.exports = function InstagramPost({ options }) {
  const { instagram } = options
  const username = instagram.igurl.replace(/\/$/g, '').split('/').pop()

  const post = instagram.posts[0]
  
  const icon = Icon('instagram', '#d3d3d3', 25)
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'middle'
  icon.style.marginRight = '13px'

  const checkmark = Icon('verified', '#3897f0', 15)
  checkmark.style.display = 'inline-block'
  checkmark.style.verticalAlign = 'text-top'
  checkmark.style.marginLeft = '1px'

  return html`
  <div class="pl-box-aside-right pl-col pl-col-4">
    <div class="pl-box pl-instagram-box">
      <div class="pl-box-heading">
        <a href="${ instagram.igurl }" target="_blank">
          ${ icon }
          <b>${ username }</b>
          ${ checkmark }
        </a>
      </div>
      <a href="${ instagram.igurl }" target="_blank">
        <img class="pl-img-responsive"
        src="${ post.imgsrc.thumb }" style="border:none;">
      </a>
      <div class="pl-box-footer">
        ${ hashtagify(post.caption) }
      </div>
    </div>
  </div>
  `
}
