module.exports = function ({ id }, { data, props }) {
  if (!id || !data || !props) return null
  
  var courier = null
  var header = data.header.filter(h => h.id === id);
  if (header.length === 1) courier = header[0].courier;

  if (courier &&
  courier.rerouteurl &&
  courier.rerouteurl_label_long &&
  props.rerouteButton &&
  props.rerouteButton === 'right') {
    return `
      <a href="${courier.rerouteurl}" target="_blank" class="pl-reroute-link">
        <i class="fa fa-calendar-check-o"></i> ${courier.rerouteurl_label_long}
      </a>
    `
  }
}