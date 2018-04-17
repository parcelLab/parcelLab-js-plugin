const html = require('bel')
const { translations } = require('../lib/static')

const Alert = ({ query }) => {
  const langCode = query.lang.name
  const messageText = translations[langCode].error.delivery
  return html`
    <div class="pl-alert pl-alert-danger">
      ${ messageText }
    </div>
  `
}

module.exports = Alert
