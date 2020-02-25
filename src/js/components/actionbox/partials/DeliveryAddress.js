const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../../Icon')
const { translate } = require('../../../lib/translator.js')

const Address = (info) => html`
  <address>
    ${info.recipient ? html`<p>${info.recipient}</p>` : ''}
    <p>${info.street}</p>
    <p>
      ${info.destination_country_iso3 || ''} ${info.zip_code} ${raw(info.city)}
    </p>
  </address>
`

module.exports = function DeliveryAddress (tHeader, { lang }) {
  const { delivery_info: info } = tHeader

  if (info && info.street && info.zip_code && info.city) {
    const address = Address(info)

    // const icon = Icon('map', 0, '18')
    // icon.style.display = 'inline-block'
    // icon.style.opacity = '.7'
    // icon.style.verticalAlign = 'middle'

    return [
      html`
        <div class="pl-box-address">
          <div class="pl-box-address-caption">
            ${translate('deliveryAddress', lang.name)}
          </div>
          ${address}
        </div>
      `
    ]
  } else {
    return ''
  }
}
