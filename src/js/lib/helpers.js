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
    return result
  }
}
