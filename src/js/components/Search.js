const html = require('nanohtml')
const { translate } = require('../lib/translator')
const { translations } = require('../lib/static')

const handlers = {
  tnoForm: emit => evt => {
    evt.preventDefault()
    const inpOrder = document.getElementById('pl-ts-trackingno')
    const val = inpOrder.value.trim()
    if (val) emit('searchOrder', val)
  },
  tnoZipForm: emit => evt => {
    evt.preventDefault()
    const inpOrder = document.getElementById('pl-ts-trackingno')
    const inpZip = document.getElementById('pl-ts-zipcode')
    if (inpOrder.value && inpZip.value) emit('searchOrder', inpOrder.value, inpZip.value)
  }
}

const Search = ({ query, query_err: queryErr, options, comingFromSearch }, emit) => {
  const { show_zipCodeInput: showZipCodeInput } = options
  const langName = query.lang.name
  const inputPlaceholder = translate('searchOrder', langName)
  const zipPlaceholder = translate('zip', langName)
  const buttonText = translate('search', langName)
  const messageText = comingFromSearch ? translations[langName].error.search : translations[langName].error.delivery
  const message = !queryErr ? html`
    <div class="pl-box-heading">
        <div class="pl-alert pl-alert-danger">
          ${messageText}
        </div>
    </div>` : null

  let searchBody = null

  if (showZipCodeInput) {
    searchBody = html`
      <form onsubmit=${handlers.tnoZipForm(emit)}>
        <input id="pl-ts-trackingno" type="text" placeholder="${inputPlaceholder}" class="pl-form-input pl-is-fullwidth pl-space-bottom">

        <input id="pl-ts-zipcode" type="text" placeholder="${zipPlaceholder}" class="pl-form-input pl-is-fullwidth pl-space-bottom">

        <button id="pl-ts-search" class="pl-button pl-is-fullwidth" type="submit">
          ${buttonText}
        </button>
      </form>
    `
  } else {
    searchBody = html`
      <form onsubmit=${handlers.tnoForm(emit)}>
        <input id="pl-ts-trackingno" type="text" placeholder="${inputPlaceholder}"  class="pl-form-input pl-is-fullwidth pl-space-bottom">
        <button id="pl-ts-search" class="pl-button pl-is-fullwidth" type="submit">
          ${buttonText}
        </button>
      </form>
    `
  }

  return html`
    <div class="pl-box pl-search-box" style="max-width:500px;margin:0 auto;">
      ${message}
      <div class="pl-box-body" style="padding: 25px;">
        ${searchBody}
      </div>
    </div>
  `
}

module.exports = Search
