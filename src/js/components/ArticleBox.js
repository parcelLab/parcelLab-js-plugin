const html = require('nanohtml')
const Icon = require('./Icon')
const { translate } = require('../lib/translator.js')

function ArticleItem({ articleNo, articleName, quantity, imageUrl }) {
  const noImageIcon = Icon('no_camera', '000', '50')
  noImageIcon.style.margin = 'auto'
  noImageIcon.style.opacity = '.6'

  return html`
    <li>
      <div class="pl-col-row">
        <div class="pl-col" style="text-align: center;width:30%;">
          ${ imageUrl ? html`<img class="pl-img-responsive" src="${imageUrl}" alt="${articleName}">` : noImageIcon }
        </div>
        <div class="pl-col" style="width:70%;">
          <div class="pl-article-description">
            ${ articleNo ? html`<span class="pl-article-list-no">${articleNo}</span>` : '' } 
            ${ quantity ? html`<span class="pl-article-quantity">${quantity }x</span>` : '' }${ articleName }
          </div>
      </div>
    </li>
  `
}

module.exports = function ArticleList({ activeTracking, checkpoints, query }) {
  const { lang } = query
  // const { delivery_info } = checkpoints.header[activeTracking]
  // TEST
  const delivery_info = {}
  delivery_info.articles = [
    { articleName: 'iPhone XS 128gb', articleNo: '345789345897', quantity: '1' },
    { articleName: 'iPhone XS 128gb', articleNo: '345789345897', quantity: '1' },
    { articleName: 'iPhone XS 128gb', articleNo: '345789345897', quantity: '1' },
    { articleName: 'iPhone XS 128gb', articleNo: '345789345897', quantity: '1' },
    { articleName: 'iPhone XS 64gb', articleNo: '345789345897', quantity: '1', imageUrl: 'https://www.sparhandy.de/images/geraete/7093/10-l.png' },
    { articleName: 'MacBook Pro 15" 128gb', articleNo: '87348945834', quantity: '1', imageUrl: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp13touch-space-select-201807_GEO_EMEA_LANG_DE?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1531167629712' },
    { articleName: 'GOPRO hero 7', articleNo: '132789234789', quantity: '1', imageUrl: 'data:image/jpeg;base64,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28f2zfNC8aZiwMkEDPNV9E8a6Ppnh+x0+5W78+3iCP5cYK59jmgWpS1O41yaY2TaGkF9qd891BHMElVlCAFRngMAuSeOtJY6f4vt9Rs5ZNIH2a3uUuJLa3WKITMpyM46kc4z61PqHjDSrrxHo2pxJd/Z9P8AN84NGAx3rtG0Z55rUX4i6Csm4xagRntEv/xVAjmtIsdVvbHVY10+5ubS+nw80M6rJE6MTt+bqOcUmqWF7pHhxrJ9PuorSa5SR7i6nRyGAICqq+vPNaHh3xfpej6fcW11Fds8t1JOvlIpG1jkZyRzUfinxbpmvaMljZw3aSrMsmZkULgA+hPPNAzlMenSr+kYF4pNUQO1X9L+W5U0DPYPhgB5Grkd7pf/AEAV3VcL8K8vpuqS/wALXu0H3CL/AI13VSAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVw/xP0K51DSotUsY2kn0/cXjUZLxH72PcYz+ddxRQB8wTSJON6sCDVYjmvcPEnwr0bWp3u7J2026c5cxLmNz6lOx9xiuOuPgzryNiDUbSQerblp3A4DpRxXbN8G/FJ6Xdgfqzf4Uz/hTfi3/n607/AL+N/hRcDiyR60cYrs/+FN+Lv+fnTv8Av43/AMTSf8Kb8Xf8/Om/9/G/+JouBxlLmuy/4U54v/5+NN/7+t/8TSf8Kc8Yf8/Gnf8Af1v/AImi4HHUV2P/AApzxh/z307/AL+t/wDE0f8ACnfGH/PfTv8Av63/AMTRcDjiR6UZFdh/wp3xh/z207/v63/xNH/CnfGP/PbTv+/zf/E0XA4/INJkGux/4U74x/566d/39b/4mkPwd8Y9pdOP/bZv/iaLgcfke1HFdh/wp7xj/wA9NO/7/N/8TS/8Ke8Y95NO/wC/x/wouBx3HoKOK7H/AIU94w/56af/AN/T/hR/wp/xj/f0/wD7/H/Ci4HHcZzSjGK7D/hT/jH+/p//AH+P+FA+EHjHP3tP/wC/x/wouByK4zVmKbyAuxGkkchY40GWdj0AHc119p8HPE80gW5vbG2TuwLOfwGB/Ou/8KfDbRvDEq3jFtQ1BelzOB+7/wBxei/Xk+9FwNHwToUvh7wvbWVzj7W2ZbnacjzGOSM98cD8K36KKQBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=' },
  ]
  // TEST
  if (delivery_info && delivery_info.articles) {
    const validArticles = delivery_info.articles.filter(a => a.articleName && a.quantity)
    const articleListPreview = validArticles.slice(0, 4).map(ArticleItem)
    const moreArticlesAvailable = validArticles.length > articleListPreview.length
    console.log()

    return html`
    <div class="pl-box-aside-right pl-col pl-col-4">
      <div class="pl-box pl-box-articles">
        <div class="pl-box-heading">
          ${ translate('articleList', lang.name) } (${validArticles.length})
        </div>
        <div class="pl-box-body">
          <ul class="pl-article-list">
            ${ articleListPreview }
          </ul>
          ${ moreArticlesAvailable ? html`<button id="pl-show-more-articles-button" class="pl-button pl-is-fullwidth">...</button>` : null}
        </div>
      </div>
    </div>
    `
  }

  return null // fallback
}
