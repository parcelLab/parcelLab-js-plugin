const html = require('nanohtml')
const Icon = require('./Icon')
const T = require('../lib/translator.js')
const MoreButton = require('./MoreButton')
const { translate } = require('../lib/translator.js')

function calcArticleTotalSum(validArticles) {
  let sum = 0
  validArticles.forEach(({ quantity = 1 }) => {
    sum = sum + parseInt(quantity)
  })
  return sum
}

function isValidURL(value) {
  return typeof value === 'string' && /^(http|https):\/\/[^ "]+$/.test(value)
}

function ArticleItem({ articleName, articleNo, quantity, imageUrl, productUrl , articleImageUrl, articleUrl }) {
  // because of js caching...
  imageUrl = isValidURL(imageUrl) ? imageUrl : isValidURL(articleImageUrl) ? articleImageUrl : null
  productUrl = isValidURL(productUrl) ? productUrl : isValidURL(articleUrl) ? articleUrl : null

  let articleImage = null

  if (imageUrl) {
    if (productUrl)
      articleImage = html`<a href="${productUrl}" target="_blank"><img class="pl-img-article-preview" src="${imageUrl}" alt="${articleName || articleNo}"></a>`
    else
      articleImage = html`<img class="pl-img-article-preview" src="${imageUrl}" alt="${articleName || articleNo}">`
  } else {
    articleImage = Icon('no_camera', '000', '40')
    articleImage.style.margin = 'auto'
    articleImage.style.opacity = '.2'
  }

  return html`
    <li>
      <div class="pl-col-row">
        <div class="pl-col" style="text-align: center;width:30%;">
          ${ articleImage }
        </div>
        <div class="pl-col" style="width:70%;">
          <div class="pl-article-description">
            ${ (articleNo && articleName) ? html`<span class="pl-article-list-no">${ articleNo }</span>` : '' }
            ${ quantity ? html`<span class="pl-article-quantity">${ quantity }x</span>` : '' }
            ${ articleName || articleNo }
          </div>
      </div>
    </li>
  `
}

module.exports = function ArticleList({ activeTracking, checkpoints, query, showAllArticles, articleList }, emit) {
  if (!articleList) return null

  const { lang } = query
  const { id } = checkpoints.header[activeTracking]
  const activeTrackingArticles = articleList[id]


  if (activeTrackingArticles && activeTrackingArticles.length > 0) {
    const validArticles = activeTrackingArticles.filter(a => (a.articleNo || a.articleName))
    if (validArticles.length < 1) return null

    let articleList = validArticles.map(ArticleItem)
    let moreButton = null

    if (!showAllArticles && validArticles.length > 4) {
      articleList = articleList.slice(0, 4)
      moreButton = MoreButton(T.translate('moreArticles', query.lang.name), emit, 'showAllArticles')
    }

    return html`
    <div class="pl-box-aside-right pl-col pl-col-4">
      <div class="pl-box pl-box-articles ${ showAllArticles ? 'pl-scrollable' : ''}">
        <div class="pl-box-heading">
          ${ translate('articleList', lang.name) } (${calcArticleTotalSum(validArticles)})
        </div>
        <div class="pl-box-body" style="padding-top:0;">
          <ul class="pl-article-list">
            ${ articleList }
          </ul>

          ${ moreButton }
        </div>

      </div>
    </div>
    `
  }

  return null // fallback
}
