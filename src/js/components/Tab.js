const html = require('bel')
const Icon = require('./Icon')

const Tab = (tab, emit) => {
  const handleClick = e => {
    e.preventDefault()
    emit('setActiveTracking', tab.id)
  }

  return html`
    <div class="pl-col pl-col-${tab.colSize}" onclick="${handleClick}">
      <div class="pl-tab pl-button pl-space-bottom pl-is-fullwidth pl-${tab.active ? 'active' : 'not-active' }">
        <div class="pl-tab-content">
          <div class="pl-tab-text">
            <span class="pl-tab-text-tno">
              ${tab.courier.prettyname}
              ${tab.trackingNo}
            </span>
            <br />
            <span class="pl-tab-text-status">
              ${tab.statusText}
            </span>
          </div>
          
          <div class="pl-status">
            <div class="pl-icon">
              ${Icon(tab.transitStatus.icon, window.parcelLab_styles.buttonColor, '35')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `

}

module.exports = Tab
