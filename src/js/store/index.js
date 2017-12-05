const createStore = require('store-emitter')

const store = createStore((action, state={}) => {
  switch (action.type) {
    case 'SET_STATE': // this action will always rerender the app
      return { ...state, ...action.data }
    default:
      return state
  }
}, {})

module.exports = store
