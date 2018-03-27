const html = require('bel')
const Header = require('./Header')
const RerouteLinkShort = require('./RerouteLinkShort')
const ActionBox = require('./actionbox')
const TrackingTrace = require('./TrackingTrace')
const ShopInfoHeader = require('./ShopInfoHeader')
const ShopInfoDetails = require('./ShopInfoDetails')
const Banner = require('./Banner')
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
  const actionBox = ActionBox(state, emit)
  const trace = TrackingTrace(state, emit)
  const shopInfoHeader = (state.options.show_shopInfos && state.shopInfos) ? ShopInfoHeader(state) : null
  const shopInfoDetails = (state.options.show_shopInfos && state.shopInfos) ? ShopInfoDetails(state) : null
  const note = (state.options.show_note && !state.hideNote) ? Note(state, emit) : null

  let layout = ['4', '8']
  let banner = null
  if (!actionBox) layout = ['0', '12']
  if (actionBox && state.options.banner_image && state.options.banner_link) {
    layout = ['4', '4', '4']
    banner = Banner(state)
  }

  const styleSet = StylesSet()


  return html`
    <div id="pl-plugin-wrapper">
      ${ styleSet }

      <div id="pl-shop-info-container">
        ${ shopInfoHeader }
      </div>

      ${ note }

      ${ header }

      <div id="pl-main-box">

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

          ${ banner }
        </div>

      </div>

      <div id="pl-shop-info-details-container">
        ${ shopInfoDetails }
      </div>
    </div>
  `
}

module.exports = App
