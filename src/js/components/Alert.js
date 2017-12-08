const html = require('yo-yo')
const { translations } = require('../lib/static')

const Alert = ({ query }) => {
  const langCode = query.lang.code
  const messageText = translations[langCode].error.delivery
  html`
    <div class="pl-alert pl-alert-danger">
      ${ messageText }
    </div>
  `
}

module.exports = Alert
