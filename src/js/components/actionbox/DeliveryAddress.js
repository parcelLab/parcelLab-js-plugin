const html = require('nanohtml')
const raw = require('nanohtml/raw')
const Icon = require('../Icon')
const { translate } = require('../../lib/translator.js')

const Address = (deliveryInfo, lang) => {
  const translatedDestinationCountryName = translate('countryName', lang)[deliveryInfo.destination_country_iso3]

  const regionCode = (deliveryInfo.region && deliveryInfo.region.indexOf('-') > -1) ? deliveryInfo.region.split('-')[1] : 'REGION_CODE'
  const regex = new RegExp(`(^|[^a-zA-Z])${regionCode}([^a-zA-Z]|$)`, 'g')
  const formatCityLine = () => {
    switch (deliveryInfo.destination_country_iso3) {
      case "GBR":
        return html`
          ${raw(deliveryInfo.city)} <br />
          ${deliveryInfo.zip_code}
        `
      case "USA":
        if (deliveryInfo.city.search(regex) !== -1) {
          // Trust vendor's data
          return html` ${raw(deliveryInfo.city)} ${deliveryInfo.zip_code.substring(0, 5)} `
         }  else {
         // Use our region data
         return html`
            ${raw(deliveryInfo.city)}${(deliveryInfo.region && deliveryInfo.region.indexOf('-') > -1) ? `, ${deliveryInfo.region.split('-')[1]}`: ''} ${deliveryInfo.zip_code.substring(0, 5)}`
         }
      default:
        return html`${deliveryInfo.zip_code} ${raw(deliveryInfo.city)}`
    }
  }
  
  const formatCountryLine = () => {
    if (deliveryInfo.destination_country_iso3 === "USA") return ""
    switch (deliveryInfo.destination_country_iso3) {
      case "USA":
        return ''
      default:
        return translatedDestinationCountryName ? translatedDestinationCountryName : deliveryInfo.destination_country_iso3
    }
  }

  return html`
    <address>
      ${deliveryInfo.recipient
        ? html`
            <p>${deliveryInfo.recipient}</p>
          `
        : ''}
      <p>${raw(deliveryInfo.street)}</p>
      <p>
        ${formatCityLine()}
      </p>
      <p>
        ${formatCountryLine()}
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