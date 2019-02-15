const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('./Icon')

const Hashtag = str => `<a target="_blank" href="https://www.instagram.com/explore/tags/${str.substr(1)}">${str}</a>`

const hashtagify = str => {
  return raw(str.split(/\s/).map((wrd) => (wrd[0] === '#') ? Hashtag(wrd) : wrd).join(' '))
}

const timestampToDate = ts => {
  const loc = navigator.language || 'en-US'
  if (ts && typeof ts === 'number') {
    return new Date(ts * 1000).toLocaleDateString(loc, { month: 'long', day: 'numeric', year: 'numeric' })
  }
  else return null
}

module.exports = function InstagramPost({ options }) {
  const { instagram } = options
  const username = instagram.igurl.replace(/\/$/g, '').split('/').pop()
  const post = instagram.posts[0]
  if (!post) return null

  const localeDate = timestampToDate(post.timestamp)
  
  const icon = Icon('instagram', '#d3d3d3', 25)
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'middle'
  icon.style.marginRight = '13px'

  const checkmark = Icon('verified', '#3897f0', 15)
  checkmark.style.display = 'inline-block'
  checkmark.style.verticalAlign = 'text-top'
  checkmark.style.marginLeft = '1px'

  const heart = Icon('thumbs_up', '#aaaaaa', 20)
  heart.style.display = 'inline-block'
  heart.style.verticalAlign = 'sub'

  const chat = Icon('chat', '#aaaaaa', 20)
  chat.style.display = 'inline-block'
  chat.style.verticalAlign = 'sub'

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
        ${ localeDate ? html`
          <div style="margin-bottom: 10px;color: #aaa;font-size: 10px;">
            ${ localeDate }
          </div>
        ` : null}

        <div>
          ${ hashtagify(post.caption) }
        </div>

        ${ (post.likeCount || post.commentCount) ? html`
          <div style="margin-top: 10px;color:#aaa;">
            <span style="margin-right:15px;">
              ${ heart } ${ post.likeCount || '0' }
            </span>
            <span style="margin-right:15px;">
              ${ chat } ${ post.commentCount || '0' }
            </span>
          </div>
        ` : null }
      </div>
    </div>
  </div>
  `
}
