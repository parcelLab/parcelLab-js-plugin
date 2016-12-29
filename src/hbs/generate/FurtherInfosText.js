module.exports = function ({ id }, { data }) {
  var header;
  var courier;
  header = data.header.filter(h => h.id === id);
  if (header.length === 1) courier = header[0].courier;
  if (courier && courier.trackingurl)
    return `<a href="${courier.trackingurl}" target="_blank">
      <i class="fa fa-lightbulb-o"></i> ${courier.trackingurl_label}
    </a>`;
  else
    return `<span style="opacity:.6;">
      <i class="fa fa-lightbulb-o"></i> ${courier.trackingurl_label}
    </span>`;
};
