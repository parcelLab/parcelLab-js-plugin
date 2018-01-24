const html = require('bel')
const { translate } = require('../lib/translator')
const { translations } = require('../lib/static')

const Search = ({ query, query_err }, emit) => {
  const langCode = query.lang.code
  const inputPlaceholder = translate('searchOrder', langCode)
  const buttonText = translate('search', langCode)
  const messageText = translations[langCode].error.delivery
  const message = !query_err ? html`
    <div class="pl-box-heading">
        <div class="pl-alert pl-alert-danger">
          ${ messageText }
        </div>
    </div>` : null

  const handleClick =  e => {
    e.preventDefault()
    const inp = document.getElementById('pl-ts-trackingno')
    emit('searchOrder', inp.value)
  }

  return html`
    <div class="pl-container">
      <div class="pl-box">
        ${ message }
        <div class="pl-box-body" style="padding: 20px;">
          <div class="pl-col-row">
            <div class="pl-col pl-col-8" style="margin-bottom:10px;">
              <input id="pl-ts-trackingno" type="text" placeholder="${inputPlaceholder}"  class="pl-form-input pl-is-fullwidth">
            </div>

            <div class="pl-col pl-col-4" style="margin-bottom:10px;">
              <button id="pl-ts-search" class="pl-button pl-is-fullwidth" onclick="${handleClick}">
                ${buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

module.exports = Search
