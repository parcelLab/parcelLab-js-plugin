const html = require('bel')
const SocialLink = require('./SocialLink')

module.exports = function ShopInfoHeader({ shopInfos }) {
  const socialLinks = []
  for (const key in shopInfos.social) {
    if (shopInfos.social.hasOwnProperty(key)) {
      const val = shopInfos.social[key]
      socialLinks.push(SocialLink(key, val))
    }
  }

  return [

    html`
    ${(shopInfos.contact && shopInfos.contact.website) ? html`<div class="hide-on-desktop" style="margin-bottom:25px;text-align: center;">
      <a href='${shopInfos.contact.website}' target="_blank">
          <img src="${shopInfos.customisation.logoUrl}" alt="${shopInfos.name.full}" class="img-responsive" style="margin-bottom: 6px; max-height:80px;" />
      </a>
    </div>`: null}`,

    html`
    <div class="hide-on-mobile" style="margin-bottom: 25px; position: relative;">
      ${ (shopInfos.contact && shopInfos.contact.website) ? html`<div>
        <a  href='${shopInfos.contact.website}' target="_blank">
            <img src="${shopInfos.customisation.logoUrl}" alt="${shopInfos.name.full}" class="img-responsive" style="margin-bottom: 6px; max-height: 90px;" />
        </a>        
      </div>` : null}

      <div style="text-align: center; position: absolute; right: 5px; top: 25px;">
        ${ socialLinks }
      </div>
    </div>`
  ]
}
