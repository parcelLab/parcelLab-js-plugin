const html = require('nanohtml')
const TrackingTab = require('./TrackingTab')
const { getIconName } = require('../../lib/static')

const Tabs = (state, emit) => {
  const { checkpoints, mobileTrackingsOpen, query, options } = state
  if (!checkpoints || checkpoints.header.length < 1) return null
  const { lang } = query
  const colSize = checkpoints.header.length === 2 ? 6 : 4
  const theme = options.theme
  const tabs = checkpoints.header.map((cph, ind) => {
    const tabData = {
      colSize,
      trackingNo: cph.tracking_number,
      courier: cph.courier,
      lang,
      active: (mobileTrackingsOpen.indexOf(cph.id) >= 0),
      transitCode: cph.last_delivery_status ? cph.last_delivery_status.code.toLowerCase() : '',
      iconName: getIconName(cph.last_delivery_status.code, theme),
      statusText: cph.last_delivery_status ? cph.last_delivery_status.status : null,
      id: cph.id,
      actionBox: cph.actionBox
    }

    return TrackingTab(tabData, emit, state)
  })

  return html`
    <div class="pl-split-order pl-clearfix">
      ${tabs}
    </div>
  `
}

const MobileApp = (state, emit) => {
  const tabs = Tabs(state, emit)

  return html`
    <div class="pl-layout pl-layout-mobile">
      ${tabs}
    </div>
  `
}

module.exports = MobileApp
