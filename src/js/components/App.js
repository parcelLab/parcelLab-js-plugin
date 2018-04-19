const html = require('bel')
const Header = require('./Header')
const RerouteLinkShort = require('./RerouteLinkShort')
const ActionBox = require('./actionbox')
const TrackingTrace = require('./TrackingTrace')
const Banner = require('./Banner')
const Search = require('./Search')
const Alert = require('./Alert')
const Note = require('./Note')
const Loading = require('./Loading')
const StyleSet = require('./StyleSet')

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
  const note = (state.options.show_note && !state.hideNote) ? Note(state, emit) : null
  const banner = (state.options.banner_image && state.options.banner_link) ? Banner(state) : null

  let layout = ['4', '8']
  if (!actionBox) layout = ['0', '12']
  if (actionBox && banner) layout = ['4', '4', '4']

  const styleSet = StyleSet()


  return html`
    <div id="pl-plugin-wrapper">
      ${ styleSet }

      ${ note }

      ${ header }

      <div id="pl-main-box">

        <div class="pl-col-row">
          <div  style="display: none;" class="pl-box-aside-left pl-col pl-col-${layout[0]}">
            <div id="pl-action-box-container" class="pl-space-bottom">
              ${ actionBox }
            </div>

            ${ rerouteLinkShort }
          </div>

          <div class="pl-main pl-col pl-col-${layout[1]}">
            ${ trace }
          </div>

          ${ banner }
        </div>

      </div>
    </div>
  `
}

module.exports = App
