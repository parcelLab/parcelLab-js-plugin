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

exports.checkUrl = function (url) {
  const invalidProtocolRegex = /^(%20|\s)*(javascript|data|vbscript)/im
  const ctrlCharactersRegex = /[^\x20-\x7E]/gim
  const urlSchemeRegex = /^([^:]+):/gm
  if (!url) {
    return false
  }
  const sanitizedUrl = url.replace(ctrlCharactersRegex, '').trim()
  const urlSchemeParseResults = sanitizedUrl.match(urlSchemeRegex)
  if (!urlSchemeParseResults) {
    return true
  }
  const urlScheme = urlSchemeParseResults[0]
  if (invalidProtocolRegex.test(urlScheme)) {
    return false
  }
  return true
}