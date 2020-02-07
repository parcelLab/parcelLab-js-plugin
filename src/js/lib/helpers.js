exports.trimURL = function (url) {
  let result = null
  try {
    const parser = document.createElement('a')
    parser.href = url
    result = parser.host
    if (parser.pathname && parser.pathname.length > 1) result += parser.pathname
  } catch (e) {
    console.log(e)
  } finally {
    if (!result) result = url
    return result // eslint-disable-line
  }
}

exports.checkQuery = function (query) {
  if (query.trackingNo && query.courier) return true
  else if (query.orderNo && query.userId) return true
  else if (query.xid && query.userId) return true
  else return false
}

exports.makeBig = el => {
  if (el && el.style) {
    el.style.width = '80px'
    el.style.height = '80px'
  }

  return el
}

exports.animateIn = (el, delay) => {
  if (el && el.classList) {
    el.classList.add('pl-animated')
    el.classList.add('pl-fade-in')
    if (delay && delay === 1) {
      el.classList.add('pl-delay-1s')
    } else if (delay && delay === 2) {
      el.classList.add('pl-delay-2s')
    }
  }
}

exports.animateBounce = (el, delay) => {
  if (el && el.classList) {
    el.classList.add('pl-animated')
    el.classList.add('pl-bounce')
    if (delay && delay === 1) {
      el.classList.add('pl-delay-1s')
    } else if (delay && delay === 2) {
      el.classList.add('pl-delay-2s')
    }
  }
}

exports.animatePulse = (el, delay) => {
  if (el && el.classList) {
    el.classList.add('pl-animated')
    el.classList.add('pl-pulse')
    if (delay && delay === 1) {
      el.classList.add('pl-delay-1s')
    } else if (delay && delay === 2) {
      el.classList.add('pl-delay-2s')
    }
  }
}
