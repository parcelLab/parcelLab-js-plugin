const html = require('bel')
const trimUrl = require('../lib/helpers').trimURL

const ContactLink = (link, buttonify) => {
  const classes = buttonify ? 'btn btn-default btn-block' : ''

  if (/\S+@\S+\.\S+/.test(link))
    return html`<a href="mailto:${link}" class="${classes}"><i class="fa fa-fw fa-envelope-o"></i> ${link}</a>`
  if (/^http.*/.test(link)) {
    const prettyLink = trimUrl(link)
    return html`<a href="${link}" _target="blank" class="${classes}"><i class="fa fa-fw fa-question-circle"></i> ${prettyLink}</a>`
  }
}

module.exports = ContactLink
