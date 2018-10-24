const html = require('nanohtml')
const { translate } = require('../../lib/translator.js')

const Article = ({ articleNo, articleName }) => {
  if (articleName) return html`
    <li>
      ${ articleNo ? html`<span class="pl-article-list-no">${articleNo}</span>` : '' } 
      ${ articleName }
    </li>
  `
  else return null
}

module.exports = function ArticleList(tHeader, lang) {
  const { delivery_info } = tHeader

  if (delivery_info && delivery_info.articles && delivery_info.articles.length > 0) {
    let articles = delivery_info.articles.map(art => Article(art))
    articles = articles.filter(art => art)

    return html`
    <div class="pl-box pl-action-box pl-box-articles pl-space-top">
      <div class="pl-box-body">
        <p class="pl-box-articles-caption">${ translate('articleList', lang.name) }</p>
        <ul class="pl-article-list">
          ${ articles }
        </ul>
      </div>
    </div>`

  } else {
    return ''
  }
}
