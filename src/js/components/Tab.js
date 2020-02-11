const html = require('nanohtml')
const Icon = require('./Icon')

const Tab = (tab, emit) => {
  const handleClick = e => {
    e.preventDefault()
    emit('setActiveTracking', tab.id)
  }

  // change default tab status to prediction if possible
  if (tab.actionBox &&
    tab.actionBox.type === 'prediction' &&
    tab.actionBox.data &&
    tab.actionBox.data.label &&
    tab.actionBox.data.dateOfMonth &&
    tab.actionBox.data.month) {
    const { label, dateOfMonth, month } = tab.actionBox.data
    tab.statusText = `${label} ${dateOfMonth} ${month}`
  }

  let iconColor = window.parcelLab_styles.tabIconColor || window.parcelLab_styles.buttonColor
  if (tab.active && window.parcelLab_styles.activeTabIconColor) {
    iconColor = window.parcelLab_styles.activeTabIconColor
  }

  return html`
    <div class="pl-split-order-entry-wrap ${tab.active ? 'pl-split-order-entry-wrap-active' : ''}">
    <div class="pl-button pl-split-order-entry pl-split-order-entry-${tab.active ? 'active' : 'not-active'}" onclick="${handleClick}">
      <div class="pl-split-order-entry-icon">
        ${Icon(tab.iconName, iconColor, '35')}
      </div>

      <div class="pl-split-order-entry-text">
        <div class="pl-split-order-entry-text-tno">
          <span class="">
            ${tab.courier.prettyname}
          </span>
          ${tab.trackingNo}
        </div>
        <div class="pl-split-order-entry-text-status">
          ${tab.statusText}
        </div>
      </div>
    </div>
    </div>
  `
}

module.exports = Tab
