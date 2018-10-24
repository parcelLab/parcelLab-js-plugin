const html = require('nanohtml')
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

    return html`
    <div class="pl-box pl-action-box pl-box-address pl-space-top">
      <div class="pl-box-body">
        <p class="pl-box-address-caption">${ translate('deliveryAddress', lang.name) }</p>
        ${ address }
      </div>
    </div>
  `
  } else {
    return ''
  }
}
