const html = require('nanohtml')
const { translate } = require('../../lib/translator.js')
const Loading = require('../Loading')

module.exports = function ZipInput (tHeader, query, apiLoading, emit) {
  const { lang, zip } = query
  const { delivery_info: deliveryInfo } = tHeader

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const input = document.getElementById('pl-force-zip-input')
    if (input.value && input.value.length >= 3) emit('setZipCode', input.value)
  }

  if (!deliveryInfo) {
    const infoText = translate('forceZip', lang.name)
    const zipPlaceholder = translate('zip', lang.name)
    const wrongZip = translate('wrongZip', lang.name)
    const icon = html`<input type="image" src="https://icons.parcellab.com/circle_arrow_right?color=0051BA" alt="submit">`
    icon.classList.add('pl-force-zip-input-submit')

    const warning = (zip && !apiLoading) ? html`
    <div style="opacity:.7;">
      ${wrongZip}
    </div>

    ` : null

    return html`
    <div class="pl-box pl-action-box pl-box-zip-input pl-space-top">
      <div class="pl-box-body">
        <div class="pl-box-zip-input-info">
          ${infoText}
        </div>
        <div style="position: relative;">
          ${apiLoading
            ? Loading()
            : html`
            <form onsubmit="${handleSubmit}">
              <input value="${query.zip || ''}" type="text" id="pl-force-zip-input" class="pl-form-input pl-is-fullwidth pl-space-top ${apiLoading ? 'pl-input-loading' : ''}"
            placeholder="${zipPlaceholder}"  autofocus required minlength="3">
              ${icon}
            </form>
            `
          }
        </div>
        ${warning}
      </div>
    </div>
    `
  } else {
    return null
  }
}
