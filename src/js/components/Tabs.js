const html = require('bel')
const Tab = require('./Tab')
const statics = require('../../js/lib/static')

const Tabs =  ({ checkpoints, activeTracking, query }, emit)=> {
  if (!checkpoints || checkpoints.header.length <= 1) return null

  const { lang } = query
  const colSize = checkpoints.header.length === 2 ? 6 : 4
  const tabs = checkpoints.header.map((cph, ind) => {
    const tabData = { 
      colSize,
      trackingNo: cph.tracking_number,
      courier: cph.courier,
      lang,
      active: activeTracking === ind,
      transitStatus: statics.transitStates[cph.last_delivery_status.code],
      statusText: cph.last_delivery_status ? cph.last_delivery_status.status : null,
      id: cph.id,
    }
    
    if (typeof tabData.transitStatus === 'undefined')
      tabData.transitStatus = statics.transitStates.default
    tabData.transitStatusColor = tabData.transitStatus.color

    return Tab(tabData, emit)
  })

  return html`
    <div class="pl-container pl-tab-container">
      ${ tabs }
    </div>
  `
}

module.exports = Tabs
