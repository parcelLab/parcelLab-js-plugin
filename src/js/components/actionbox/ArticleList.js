const html = require('nanohtml')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator.js')

const Article = ({ articleNo, articleName, quantity }) => {
  if (articleName) return html`
    <li>
      ${ articleNo ? html`<span class="pl-article-list-no">${articleNo}</span>` : '' } 
      ${ quantity ? html`<span class="pl-article-quantity">${quantity }x</span>` : '' }${ articleName }
    </li>
  `
  else return null
}

module.exports = function ArticleList(tHeader, lang) {
  const { delivery_info } = tHeader

  if (delivery_info && delivery_info.articles && delivery_info.articles.length > 0) {
    let articles = delivery_info.articles.map(art => Article(art))
    articles = articles.filter(art => art)

    const icon = Icon('info_box', 0, '20')
    icon.style.display = 'inline-block'
    icon.style.opacity = '.7'
    icon.style.verticalAlign = 'bottom'


    return html`
    <div class="pl-box pl-action-box pl-box-articles pl-space-top">
      <div class="pl-box-body">
        <p class="pl-box-articles-caption">
          ${ icon } ${ translate('articleList', lang.name) }
        </p>
        <ul class="pl-article-list">
          ${ articles }
        </ul>
      </div>
    </div>`

  } else {
    return ''
  }
}
