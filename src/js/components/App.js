const html = require('yo-yo')
const store = require('../store')
const actions = require('../store/actions')
const RerouteLink = require('./RerouteLink')
const Heading = require('./Heading')
const Tabs = require('./Tabs')
const TrackingBody = require('./trackingBody')

const App = state => {
  if (!state.checkpoints) return html`<div>Loading...</div>`
  const rerouteLink = RerouteLink(state)
  const heading = Heading(state)
  const tabs = Tabs(state)
  const trackingBody = TrackingBody(state)

  return html`
    <div>
      <div class="pl-col-row">

        <aside  style="display: none;" class="pl-box-aside pl-col pl-col-4">
          <div id="pl-shop-info-container"></div>
          <div id="pl-action-box-container"></div>
          <div id="pl-reroute-link-container">
            ${ rerouteLink }
          </div>
        </aside>


        <main class="pl-main pl-col pl-col-12">
          <div class="pl-box">
            <div class="pl-box-heading">
              ${ heading }
            </div>

            <!-- Tabs -->
            ${ tabs }

            <!-- Trackings-Container -->
            ${ trackingBody }
          </div>
        </main>

      </div>

      <div id="pl-mobile-shop-info-container" class="hide-on-desktop"></div>
    </div>
  `
}

module.exports = App
