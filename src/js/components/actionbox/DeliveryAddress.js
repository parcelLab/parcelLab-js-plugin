const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator.js')

const Address = (deliveryInfo, options) => {
  return html`
    <address>
      ${deliveryInfo.recipient
        ? html`
            <p>${deliveryInfo.recipient}</p>
          `
        : ''}
      <p>${raw(deliveryInfo.street)}</p>
      <p>
        ${(options.show_destinationCountryCode && deliveryInfo.destination_country_iso3) || ''}
        ${deliveryInfo.zip_code} ${raw(deliveryInfo.city)}
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
    const address = Address(deliveryInfo, options)

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
