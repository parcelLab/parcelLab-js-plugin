const html = require('bel')
const ContactLink = require('./ContactLink')
const PhoneLink = require('./PhoneLink')
const { trimURL } = require('./../lib/helpers')
const SocialLink = require('./SocialLink')


module.exports = function ShopInfoDetails({ shopInfos }) {
  const nameFull = document.createElement('span')
  nameFull.innerHTML = shopInfos.name.full

  let address = null
  if (shopInfos.address) {
    address = document.createElement('address')
    address.innerHTML = `${shopInfos.address.street}<br>${shopInfos.address.zip_code} ${shopInfos.address.city}<br>`
  }
  const phoneLink = (shopInfos.contact && shopInfos.contact.phone) ? PhoneLink(shopInfos.contact.phone, true) : null
  const contactLink = (shopInfos.contact && shopInfos.contact.pubEmail) ? ContactLink(shopInfos.contact.pubEmail, true) : null

  const socialLinks = []
  for (const key in shopInfos.social) {
    if (shopInfos.social.hasOwnProperty(key)) {
      const val = shopInfos.social[key]
      socialLinks.push(SocialLink(key, val))
    }
  }


  return html`
    <div class="pl-shop-footer">

      <div class="pl-shop-details">
        ${ nameFull }
        ${ address }

        <div class="pl-space-top">${ phoneLink }</div>
        <div>${ contactLink}</div>
        <div>${ shopInfos.contact.website ? html`<a href="${shopInfos.contact.website}" target="_blank" class="pl-contact-btn">
          <i class="fa fa-fw fa-globe"></i> ${trimURL(shopInfos.contact.website)}
        </a>` : ''}</div>
      </div>

        <div class="pl-social-link-list" style="text-align: center; margin:30px 0;">
          ${ socialLinks }
        </div>

    </div>
    
  `
}
