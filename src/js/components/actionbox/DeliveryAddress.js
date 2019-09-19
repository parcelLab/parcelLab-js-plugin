const html = require('nanohtml')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator.js')

const Address = (delivery_info) => {
  return html`
    <address>
      ${delivery_info.recipient ? html`<p>${delivery_info.recipient}</p>` : ''}
      <p>${delivery_info.street}</p>
      <p>
        ${delivery_info.destination_country_iso3 || ''} ${delivery_info.zip_code} ${delivery_info.city}
      </p>
    </address>
  `
}

module.exports = function DeliveryAddress(tHeader, lang) {
  const { delivery_info } = tHeader

  if (delivery_info && delivery_info.street && delivery_info.zip_code && delivery_info.city) {
    const address = Address(delivery_info)

    const icon = Icon('map', 0, '18')
    icon.style.display = 'inline-block'
    icon.style.opacity = '.7'
    icon.style.verticalAlign = 'middle'

    return [
      html`<hr>`,
      html`
    <div class="pl-box-address">
        <p class="pl-box-address-caption">
          ${icon} ${translate('deliveryAddress', lang.name)}
        </p>
        ${address}
    </div>
    `
    ]
  } else {
    return ''
  }
}
