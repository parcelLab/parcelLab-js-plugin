const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator.js')
const statics = require('../../lib/static.js')
const get = require('lodash.get')

const Address = (deliveryInfo, lang) => {
  var translationsObject = statics.translations[lang]
  const translatedDestinationCountryName = `${translate(get(translationsObject, 'countryName', lang.name)[deliveryInfo.destination_country_iso3])}`

    return html`
      <address>
        ${deliveryInfo.recipient
          ? html`
              <p>${deliveryInfo.recipient}</p>
            `
          : ''}
        <p>${raw(deliveryInfo.street)}</p>
        <p>
          ${deliveryInfo.zip_code} ${raw(deliveryInfo.city)}
          <br>
          ${translatedDestinationCountryName === 'undefined' ? deliveryInfo.destination_country_iso3 : translatedDestinationCountryName}
        </p>
      </address>
    `
}

module.exports = function DeliveryAddress (tHeader, lang, options) {
  const { delivery_info: deliveryInfo } = tHeader
  if (
    deliveryInfo &&
    deliveryInfo.street &&
    deliveryInfo.zip_code &&
    deliveryInfo.city
  ) {
    const address = Address(deliveryInfo, lang.name)

    const icon = Icon('map', 0, '18')
    icon.style.display = 'inline-block'
    icon.style.opacity = '.7'
    icon.style.verticalAlign = 'middle'

    return html`
      <div class="pl-box pl-action-box pl-box-address pl-space-top">
        <div class="pl-box-body">
          <p class="pl-box-address-caption">
            ${icon} ${translate('deliveryAddress', lang.name)}
          </p>
          ${address}
        </div>
      </div>
    `
  } else {
    return ''
  }
}