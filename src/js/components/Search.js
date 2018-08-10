const html = require('nanohtml')
const { translate } = require('../lib/translator')
const { translations } = require('../lib/static')

const Search = ({ query, query_err, options, comingFromSearch }, emit) => {
  const { show_zipCodeInput } = options
  const langName = query.lang.name
  const inputPlaceholder = translate('searchOrder', langName)
  const zipPlaceholder = translate('zip', langName)
  const buttonText = translate('search', langName)
  const messageText = comingFromSearch ? translations[langName].error.search : translations[langName].error.delivery
  const message = !query_err ? html`
    <div class="pl-box-heading">
        <div class="pl-alert pl-alert-danger">
          ${ messageText }
        </div>
    </div>` : null

  let searchBody = null

  if (show_zipCodeInput) {
    const handleSubmit = (evt) => {
      evt.preventDefault()
      const inpOrder = document.getElementById('pl-ts-trackingno')
      const inpZip = document.getElementById('pl-ts-zipcode')
      if (inpOrder.value && inpZip.value) emit('searchOrder', inpOrder.value, inpZip.value)
    }
    searchBody = html`
      <form onsubmit=${handleSubmit}>
        <div class="pl-col-row">
          <div class="pl-col pl-col-5 pad-right-desktop" style="margin-bottom:10px;">
            <input id="pl-ts-trackingno" type="text" placeholder="${inputPlaceholder}" class="pl-form-input pl-is-fullwidth">
          </div>
          <div class="pl-col pl-col-3" style="margin-bottom:10px;">
            <input id="pl-ts-zipcode" type="text" placeholder="${zipPlaceholder}" class="pl-form-input pl-is-fullwidth">
          </div>
        
          <div class="pl-col pl-col-4 pad-left-desktop" style="margin-bottom:10px;">
            <button id="pl-ts-search" class="pl-button pl-is-fullwidth" type="submit">
              ${buttonText}
            </button>
          </div>
        </div>
      </form>
    `
  } else {
    const handleSubmit = (evt) => {
      evt.preventDefault()
      const inpOrder = document.getElementById('pl-ts-trackingno')
      if (inpOrder.value) emit('searchOrder', inpOrder.value)
    }
    searchBody = html`
      <form onsubmit=${handleSubmit}>
        <div class="pl-col-row">
          <div class="pl-col pl-col-8 pad-right-desktop" style="margin-bottom:10px;">
            <input id="pl-ts-trackingno" type="text" placeholder="${inputPlaceholder}"  class="pl-form-input pl-is-fullwidth">
          </div>

          <div class="pl-col pl-col-4 pad-left-desktop" style="margin-bottom:10px;">
            <button id="pl-ts-search" class="pl-button pl-is-fullwidth" type="submit">
              ${buttonText}
            </button>
          </div>
        </div>
      </form>
    `
  }

  return html`
    <div class="pl-container">
      <div class="pl-box pl-search-box">
        ${ message }
        <div class="pl-box-body" style="padding: 25px;">
          ${ searchBody }
        </div>
      </div>
    </div>
  `
}

module.exports = Search
