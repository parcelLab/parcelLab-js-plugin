const html = require('bel')
const Header = require('./Header')
const RerouteLinkShort = require('./RerouteLinkShort')
const TrackingHeading = require('./TrackingHeading')
const Subheading = require('./Subheading')
const ActionBox = require('./actionbox')
const TrackingTrace = require('./TrackingTrace')
const ShopInfoHeader = require('./ShopInfoHeader')
const ShopInfoDetails = require('./ShopInfoDetails')
const Search = require('./Search')
const Alert = require('./Alert')
const Note = require('./Note')
const Loading = require('./Loading')
const StylesSet = require('./StyleSet')

const App = (state, emit) => {
  // query not sufficient
  if (state.query_err || state.fetchCheckpoints_failed) {
    if (state.options.show_searchForm)
      return Search(state, emit)
    else
      return Alert(state)

  } else if (state.checkpoints && state.checkpoints.header.length === 0) { // tracking w/ no cps
    return Alert(state)
  } else if (!state.checkpoints) return Loading() // still loading

  const header = Header(state, emit)
  const rerouteLinkShort = RerouteLinkShort(state)
  const trackingHeading = TrackingHeading(state)
  const subHeading = Subheading(state)
  const actionBox = ActionBox(state, emit)
  const trace = TrackingTrace(state, emit)
  const shopInfoHeader = (state.options.show_shopInfos && state.shopInfos) ? ShopInfoHeader(state) : null
  const shopInfoDetails = (state.options.show_shopInfos && state.shopInfos) ? ShopInfoDetails(state) : null
  const note = (state.options.show_note && !state.hideNote) ? Note(state, emit) : null

  const layout = (rerouteLinkShort || actionBox) ? ['4', '8'] : ['0', '12']
  const styleSet = StylesSet()


  return html`
    <div>
      ${ styleSet }

      <div id="pl-shop-info-container">
        ${ shopInfoHeader }
      </div>

      ${ note }

      ${ header }

      <div id="pl-main-box" class="pl-box">

        <div id="pl-tracking-heading" class="pl-box-heading">
          ${ trackingHeading }
          ${ subHeading }
        </div>

        <div id="pl-tracking-body" class="pl-box-body">
          <div class="pl-col-row">
            <div  style="display: none;" class="pl-box-aside-left pl-col pl-col-${layout[0]}">
              <div id="pl-action-box-container" class="pl-space-bottom">
                ${ actionBox}
              </div>

              ${ rerouteLinkShort}
            </div>

            <div class="pl-main pl-col pl-col-${layout[1]}">
              ${ trace }
            </div>
          </div>
        </div> 
      </div>

      <div id="pl-shop-info-details-container">
        ${ shopInfoDetails }
      </div>
    </div>
  `
}

module.exports = App
