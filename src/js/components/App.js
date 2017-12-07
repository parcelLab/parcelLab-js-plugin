const html = require('yo-yo')
const RerouteLinkShort = require('./RerouteLinkShort')
const Heading = require('./Heading')
const ActionBox = require('./actionbox')
const Tabs = require('./Tabs')
const TrackingBody = require('./trackingBody')

const App = (state, emit) => {
  if (!state.checkpoints) return html`<div>Loading...</div>`
  const rerouteLinkShort = RerouteLinkShort(state)
  const heading = Heading(state)
  const actionBox = ActionBox(state, emit)
  const tabs = Tabs(state)
  const trackingBody = TrackingBody(state, emit)

  const layout = (rerouteLinkShort || actionBox) ? ['4', '8'] : ['0', '12']

  return html`
    <div>
      <div class="pl-col-row">

        <aside  style="display: none;" class="pl-box-aside pl-col pl-col-${layout[0]}">
          <div id="pl-shop-info-container"></div>

          <div id="pl-action-box-container">
            ${ actionBox }
          </div>
          <div id="pl-reroute-link-container">
            ${ rerouteLinkShort }
          </div>
        </aside>


        <main class="pl-main pl-col pl-col-${layout[1]}">
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
