const html = require('nanohtml')
const Header = require('./Header')
const RerouteLinkShort = require('./RerouteLinkShort')
const ActionBox = require('./actionbox')
const TrackingTrace = require('./TrackingTrace')
const Banner = require('./Banner')
const InstagramPost = require('./InstagramPost')
const Search = require('./Search')
const Alert = require('./Alert')
const Note = require('./Note')
const Loading = require('./Loading')
const StyleSet = require('./StyleSet')


const createLayout = styleSet => content => html`
  <div id="pl-plugin-wrapper">
    ${styleSet}
    ${content}
  </div>`


const App = (state, emit) => {
  const Layout = createLayout(StyleSet())

  // query not sufficient
  if (state.query_err || state.fetchCheckpoints_failed) {
    if (state.options.show_searchForm)
      return Layout(Search(state, emit))
    else
      return Layout(Alert(state))

  } else if (state.checkpoints && state.checkpoints.header.length === 0) { // tracking w/ no cps
    return Layout(Alert(state))
  } else if (!state.checkpoints) return Layout(Loading()) // still loading


  const header = Header(state, emit)
  const rerouteLinkShort = RerouteLinkShort(state)
  const actionBox = ActionBox(state, emit)
  const trace = TrackingTrace(state, emit)
  const note = (state.options.show_note && !state.hideNote) ? Note(state, emit) : null
  const banner = (state.options.banner_image === 'instagram' && state.options.instagram) ? InstagramPost(state) : ((state.options.banner_image && state.options.banner_link) ? Banner(state) : null)

  let layout = ['4', '8']
  if (!actionBox) layout = ['0', '12']
  if (actionBox && banner) layout = ['4', '4', '4']


  const app = html`
    <div>
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

  return Layout(app)
}

module.exports = App
