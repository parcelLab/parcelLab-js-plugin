function generateRerouteCaption(courier) {
  if (courier && courier.rerouteurl_label_info) {
    return `
      <br>
      <small>${courier.rerouteurl_label_info}</small>
    `
  } else return ''
}

module.exports = function (data, props) {
  if (!data || !props) return null
  
  var courier = null
  var header = data.header[0];
  if (header) courier = header.courier;

  if (courier &&
  courier.rerouteurl &&
  courier.rerouteurl_label_short &&
  props.rerouteButton &&
  props.rerouteButton === 'left') {
    return `
      <a href="${courier.rerouteurl}" target="_blank" class="pl-reroute-link-short">
        <span class="fa fa-calendar-check-o"></span>&nbsp;&nbsp;
        ${courier.rerouteurl_label_short}
        ${generateRerouteCaption(courier)}
      </a>
    `
  }
}