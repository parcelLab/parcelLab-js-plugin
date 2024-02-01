const html = require('nanohtml')
const { translations } = require('../lib/static')

const Alert = ({ query, className, errorMessageKey }) => {
  const langCode = query.lang.name
  const messageText = errorMessageKey ? translations[langCode].error[errorMessageKey] : translations[langCode].error.delivery
  return html`
    <div class=${`pl-alert pl-alert-danger ${className || ""}`}>
      ${ messageText }
    </div>
  `
}

module.exports = Alert
