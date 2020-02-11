const html = require('nanohtml')
const { getTrackingById } = require('../../lib/helpers')
const Icon = require('../Icon')
const ActionBox = require('../actionbox')
const TrackingTrace = require('../TrackingTrace')
const ArticleBox = require('../ArticleBox')

const Tab = (tab, emit, state) => {
  const handleClick = e => {
    e.preventDefault()
    emit('toggleMobileTracking', tab.id)
  }

  const currentTracking = getTrackingById(state, tab.id)
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

  // const iconColor = window.parcelLab_styles.tabIconColor || window.parcelLab_styles.buttonColor
  const iconColor = window.parcelLab_styles.tabIconColor || window.parcelLab_styles.buttonColor
  const statusIcon = Icon(tab.iconName, iconColor, '35')
  statusIcon.style.display = 'inline-block'
  statusIcon.style.marginRight = '5px'
  statusIcon.style.opacity = '.7'

  const toggleIcon = Icon('times', iconColor, '20')
  toggleIcon.style.float = 'right'
  toggleIcon.style.transition = 'all .2s linear'
  toggleIcon.style.opacity = '.6'
  toggleIcon.style.marginTop = '7px'

  const body = [
    ActionBox(currentTracking, state, emit),
    TrackingTrace(currentTracking, state, emit),
    ArticleBox(currentTracking, state, emit)
  ]

  return html`
    <div class="pl-box pl-mobile-tracking ${tab.active ? 'pl-mobile-tracking-active' : ''}">
      <div class="pl-mobile-tracking-heading pl-clearfix" onclick="${handleClick}">
      <div class="pl-mobile-tracking-heading-statusicon">
         ${statusIcon}
       </div>
        <div class="pl-mobile-tracking-heading-text">
          <div class="pl-mobile-tracking-heading-text-tno">
            <span class="">
              ${tab.courier.prettyname}
            </span>
            ${tab.trackingNo}
          </div>
          <div class="pl-mobile-tracking-heading-text-status">
            ${tab.statusText}
          </div>
       </div>
       <div class="pl-mobile-tracking-heading-toggleicon">
         ${toggleIcon}
       </div>
      </div>
      <div class="pl-mobile-tracking-body">
        ${body}
      </div>
    </div>
  `
}

module.exports = Tab
