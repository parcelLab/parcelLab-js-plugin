var statics = require('../../js/lib/static');

/**
 * generates tabs HTML out of api raw data
 * @param  {Object} data  api raw data
 * @param  {Object} props parcelLab instance props
 * @param  {Object} opts  Handlebars opts
 * @return {string}       HTML
 */
module.exports  = function (data, props, opts) {
  var { header } = data;
  var { lang } = props;
  var colSize = header.length === 2 ? 6 : 4;
  var tabs = [];
  header.forEach(function (tracking, index) {
    var template = { size: colSize };
    var info = {
      trackingNo: tracking.tracking_number,
      courier: tracking.courier,
      lang: lang.code,
    };
    template.active = index === 0 ? 'active' : '';
    template.transitStatus = statics.transitStates[tracking.last_delivery_status.code];
    template.href = tracking.id;
    template.object = JSON.stringify(info);
    if (typeof template.transitStatus === 'undefined')
      template.transitStatus = statics.transitStates.default;
    template.transitStatusColor = template.transitStatus.color;

    tracking.template = template;
    tabs.push(tracking);
  });

  var res = '';
  if (tabs.length > 1) {
    tabs.map((tab)=> {
      res += opts.fn(tab);
    });
  }

  return res;
};
