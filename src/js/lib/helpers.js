exports.trimURL = function (url) {
  let result = null
  try {
    const parser = document.createElement('a')
    parser.href = url
    result = parser.host
    if (parser.pathname && parser.pathname.length > 1) result += parser.pathname
    return result
  } catch (e) {
    console.log(e)
    result = url
    return result
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
