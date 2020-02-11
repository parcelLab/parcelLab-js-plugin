const html = require('nanohtml')
const MobileApp = require('./mobile')
const Header = require('./Header')
const ActionBox = require('./actionbox')
const TrackingTrace = require('./TrackingTrace')
const Banner = require('./Banner')
const InstagramPost = require('./InstagramPost')
const ArticleBox = require('./ArticleBox')
const Search = require('./Search')
const Alert = require('./Alert')
const Note = require('./Note')
const FallbackFurtherInfos = require('./FallbackFurtherInfos')
const Loading = require('./Loading')
const StyleSet = require('./StyleSet')
const { getActiveTracking } = require('../lib/helpers')

const createLayout = styleSet => content => html`
  <div id="pl-plugin-wrapper">
    ${styleSet}
    ${content}
  </div>`

const App = (state, emit) => {
  const Layout = createLayout(StyleSet())

  // fetch failed
  if (state.query_err || state.fetchCheckpoints_failed) {
    const errApp = []
    state.options.show_searchForm ? errApp.push(Search(state, emit)) : errApp.push(Alert(state))

    if (state.fetchCheckpoints_failed && state.fetchCheckpoints_failed === 404 &&
    state.query.courier && state.query.trackingNo &&
    state.fallback_deeplink) {
      errApp.push(FallbackFurtherInfos(state))
    }

    return Layout(errApp)
  }

  // tracking w/ no cps
  if (state.checkpoints && state.checkpoints.header.length === 0) {
    return Layout(Alert(state))
  }

  // still loading
  if (!state.checkpoints) return Layout(Loading())

  const activeTracking = getActiveTracking(state)

  const header = Header(state, emit)
  const actionBox = ActionBox(activeTracking, state, emit)
  const trace = TrackingTrace(activeTracking, state, emit)
  const note = (state.options.show_note && !state.hideNote) ? Note(state, emit) : null
  let rightElement = null
  if (state.options.banner_image === 'instagram' && state.options.instagram) {
    rightElement = InstagramPost(state)
  } else if (state.options.banner_image && state.options.banner_link) {
    rightElement = Banner(state)
  } else if (state.options.show_articleList) {
    rightElement = ArticleBox(activeTracking, state, emit)
  }

  const app = html`
    <div class="pl-layout-wrapper">
      ${note}

      ${header}

      ${MobileApp(state, emit)}

      <div class="pl-layout pl-layout-desktop">
        <div  class="pl-layout-left">
          ${actionBox}
        </div>

        <div class="pl-layout-center">
          ${trace}
        </div>

        ${rightElement ? html`
        <div class="pl-layout-right">
          ${rightElement}
        </div>
        ` : ''}
      </div>

    </div>
  `

  return Layout(app)
}

module.exports = App
