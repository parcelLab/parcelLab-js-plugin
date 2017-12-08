const html = require('yo-yo')
const ContactLink = require('./ContactLink')
const PhoneLink = require('./PhoneLink')
const { trimURL } = require('./../lib/helpers')
const SocialLink = require('./SocialLink')

module.exports = function ShopInfos({ shopInfos }) {
  const nameFull = document.createElement('span')
  nameFull.innerHTML = shopInfos.name.full

  let address = null
  if (shopInfos.address) {
    address = document.createElement('address')
    address.innerHTML = `${shopInfos.address.street}<br>${shopInfos.address.zip_code} ${shopInfos.address.city}<br>`
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
    <div class="hide-on-desktop" style="margin-bottom:25px;">
      <a href='${shopInfos.contact.website}' target="_blank">
          <img src="${shopInfos.customisation.logoUrl}" alt="${shopInfos.name.full}" class="img-responsive" style="margin-bottom: 6px; max-height:80px;" />
      </a>
    </div>`,

    html`
    <div class="pl-box hide-on-mobile" style="margin-bottom: 25px; padding: 20px 0px;">
      <div class="pl-box-body">
        <a  href='${shopInfos.contact.website}' target="_blank">
            <img src="${shopInfos.customisation.logoUrl}" alt="${shopInfos.name.full}" class="img-responsive" style="margin-bottom: 6px;" />
        </a>


          ${ nameFull}
          ${ address}
          ${ phoneLink}
          ${ contactLink}

          <br />

          ${ shopInfos.contact.website ? html`<a href="${shopInfos.contact.website}" target="_blank"><i class="fa fa-fw fa-globe"></i> ${trimURL(shopInfos.contact.website)}</a>` : ''}
          <br />

          <div style="text-align: center; margin-top:40px;">
            ${ socialLinks }
          </div>

      </div>
    </div>`
  ]
}
