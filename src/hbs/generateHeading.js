const { translate } = require('../js/lib/translator.js');
/**
 * generates heading out of api raw data
 * @param  {Object} props parcelLab instance props
 * @param  {Object} data  api raw data
 * @return {String}       heading
 */
module.exports = function (data, props) {
  if (props.orderNo) {
    return `${translate('orderNo', props.lang.code)} ${props.orderNo}`;
  } else if (props.trackingNo) {
    var res = '';
    var courier = data.header[0].courier.prettyname || props.courier;
    res += `${translate('delivery', props.lang.code)} ${props.trackingNo} (${courier})`;
    return res;
  } else {
    return 'Unknown tracking';
  }
};
