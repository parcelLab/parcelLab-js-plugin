const html = require('bel')

const PhoneLink = (link, buttonify) => {
  const classes = buttonify ? 'pl-contact-btn' : ''
  if (link)
    return html`<a href="tel:${link}" class="${classes}"><i class="fa fa-fw fa-phone"></i> ${link}</a>`
}

module.exports = PhoneLink