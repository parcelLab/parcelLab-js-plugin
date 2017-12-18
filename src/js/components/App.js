const html = require('bel')
const Header = require('./Header')
const RerouteLinkShort = require('./RerouteLinkShort')
const TrackingHeading = require('./TrackingHeading')
const Subheading = require('./Subheading')
const ActionBox = require('./actionbox')
const TrackingBody = require('./trackingBody')
const ShopInfos = require('./ShopInfos')
const MobileShopInfos = require('./MobileShopInfos')
const Search = require('./Search')
const Alert = require('./Alert')
const Loading = require('./Loading')

const App = (state, emit) => {
  // query not sufficient
  if (state.query_err || state.fetchCheckpoints_failed) {
    if (state.options.show_searchForm)
      return Search(state, emit)
    else
      return Alert(state)
  }

  if (!state.checkpoints) return Loading()

  const header = Header(state, emit)
  const rerouteLinkShort = RerouteLinkShort(state)
  const trackingHeading = TrackingHeading(state)
  const subHeading = Subheading(state)
  const actionBox = ActionBox(state, emit)
  const trackingBody = TrackingBody(state, emit)
  const shopInfos = (state.options.show_shopInfos && state.shopInfos) ? ShopInfos(state) : null
  const mobileShopInfos = (state.options.show_shopInfos && state.shopInfos) ? MobileShopInfos(state) : null

  const layout = (rerouteLinkShort || actionBox) ? ['4', '8'] : ['0', '12']


  return html`
    <div>
      ${ header }

      <div class="pl-box pl-main-box ${ header ? '' : 'pl-box-no-border' }">

        <div class="pl-box-heading" style="border-bottom: none;">
          ${ trackingHeading }
          ${ subHeading }
        </div>

        <div class="pl-box-body">
          <div class="pl-col-row">
            <aside  style="display: none;" class="pl-box-aside pl-col pl-col-${layout[0]}">
              <div id="pl-shop-info-container">
                ${ shopInfos}
              </div>

              <div id="pl-action-box-container">
                ${ actionBox}
              </div>
              <div id="pl-reroute-link-container">
                ${ rerouteLinkShort}
              </div>
            </aside>


            <main class="pl-main pl-col pl-col-${layout[1]}">
              <div class="pl-box">

                ${ trackingBody }
              </div>
            </main>
          </div>
        </div>
      
      </div>

      <div id="pl-mobile-shop-info-container" class="hide-on-desktop">
        ${ mobileShopInfos }
      </div>
    </div>
  `
}

module.exports = App
