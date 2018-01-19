const html = require('bel')
const raw = require('bel/raw')
const ContactLink = require('./ContactLink')
const PhoneLink = require('./PhoneLink')
const { trimURL } = require('./../lib/helpers')
const SocialLink = require('./SocialLink')

module.exports = function ShopInfoHeader({ shopInfos }) {
  let address = null
  if (shopInfos.address) {
    address = html`
      <address>
        ${ raw(shopInfos.address.street)}<br>${raw(shopInfos.address.zip_code)} ${raw(shopInfos.address.city) }<br>
      </address>
    `
  }

  const phoneLink = shopInfos.contact.phone ? PhoneLink(shopInfos.contact.phone, false) : null
  const contactLink = shopInfos.contact.pubEmail ? ContactLink(shopInfos.contact.pubEmail, false) : null
  const socialLinks = []
  for (const key in shopInfos.social) {
    if (shopInfos.social.hasOwnProperty(key)) {
      const val = shopInfos.social[key]
      socialLinks.push(SocialLink(key, val))
    }
  }

  return [

    html`
    <div class="hide-on-desktop" style="margin-bottom:25px;text-align: center;">
      <a href='${shopInfos.contact.website}' target="_blank">
          <img src="${shopInfos.customisation.logoUrl}" alt="${shopInfos.name.full}" class="img-responsive" style="margin-bottom: 6px; max-height:80px;" />
      </a>
    </div>`,

    html`
    <div class="hide-on-mobile" style="margin-bottom: 25px; position: relative;">
      <div>
        <a  href='${shopInfos.contact.website}' target="_blank">
            <img src="${shopInfos.customisation.logoUrl}" alt="${shopInfos.name.full}" class="img-responsive" style="margin-bottom: 6px; max-height: 90px;" />
        </a>        
      </div>

      <div style="text-align: center; position: absolute; right: 5px; top: 25px;">
        ${ socialLinks }
      </div>
    </div>`
  ]
}