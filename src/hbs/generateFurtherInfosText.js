const { translate } = require('../js/lib/translator');

module.exports = function ({ id }, { data }) {
  var header,
      courier;
  header = data.header.filter(h => h.id === id);
  if (header.length === 1) courier = header[0].courier;
  if (courier)
    return `<a href="${courier.trackingurl}" target="_blank">
      <i class="fa fa-lightbulb-o"></i> ${courier.trackingurl_label}
    </a>`;
};
