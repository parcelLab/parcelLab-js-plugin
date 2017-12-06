const html = require('yo-yo')

function toHTMLElem(str) {
  const el = document.createElement('span')
  el.innerHTML = str
  return el
}

const Checkpoint = cp => html`
  <div class="pl-row pl-alert pl-${cp.alert}">
    <div class="pl-icon">
      <span class="fa-stack fa-lg" style="color: ${cp.transitStatusColor};">
        <i class="fa fa-circle fa-stack-2x" style="color: ${cp.transitStatusColor};opacity:.2;"></i>
        <i class="fa fa-${cp.transitStatus.icon} fa-stack-1x fa-inverse" style="color:${cp.transitStatusColor};"></i>
      </span>
    </div>
    <div class="pl-text">
      <small>${ cp.dateText}  ${cp.locationText}</small><br />
      <b>${ cp.status_text}</b>: ${ toHTMLElem(cp.status_details) }
    </div>
  </div>
`

module.exports = Checkpoint
