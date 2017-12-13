const html = require('bel')

const PhoneLink = (link, buttonify) => {
  const classes = buttonify ? 'btn btn-default btn-block' : ''
  if (link)
    return html`<a href="tel:${link}" class="${classes}"><i class="fa fa-fw fa-phone"></i> ${link}</a>`
}

module.exports = PhoneLink