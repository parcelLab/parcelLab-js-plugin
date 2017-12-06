const html = require('yo-yo')
const Tab = require('./Tab')
const statics = require('../../js/lib/static')

const Tabs =  ({ checkpoints, activeTracking, lang })=> {
  if (!checkpoints || checkpoints.header.length <= 1) return null
  else {
    const colSize = checkpoints.header.length === 2 ? 6 : 4
    const tabs = checkpoints.header.map(cph => {
      const tabData = { 
        colSize,
        trackingNo: cph.trackingNo,
        courier: cph.courier,
        lang,
        active: activeTracking === cph.tracking_number,
        transitStatus: statics.transitStates[cph.last_delivery_status.code],
        href: cph.id,
      }
      
      if (typeof tabData.transitStatus === 'undefined')
        tabData.transitStatus = statics.transitStates.default
      tabData.transitStatusColor = tabData.transitStatus.color

      return Tab(tabData)
    })

    return html`
      <div class="pl-container pl-tab-container">
        ${ tabs }
      </div>
    `

  }
}

module.exports = Tabs
