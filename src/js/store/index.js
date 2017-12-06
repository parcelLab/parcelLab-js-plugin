const nanobus = require('nanobus')
const bus = nanobus()

const store = {
  state: {},
  set(stateMod={}) {
    this.state = { ...this.state, ...stateMod }
    bus.emit('state:changed')
  },
  get() {
    return this.state
  },
  subscribe(fn) {
    bus.on('state:changed', () => {
      fn(this.get())
    })
  },
  on: bus.on.bind(bus),
  emit: bus.emit.bind(bus),
}

module.exports = store
