const T = require('../../js/lib/translator.js');
const statics = require('../../js/lib/static');

/**
 * generates tracking HTML out of api raw data
 * @param  {Object} data  api raw data
 * @param  {Object} props parcelLab instance props
 * @param  {Object} opts  Handlebars opts
 * @return {String}       HTML
 */
module.exports = function (data, props, opts) {
  var trackings = [];
  var aceptedStatus = 'OutForDelivery DestinationDeliveryCenter';
  var content = { trackings: [] };
  trackings = data.header.map(function (hObj, index) {

    var tracking = {
      id: hObj.id,
      checkpoints: [],
    };

    // tracking.checkpoints = data.body[tHead.id];
    tracking.visible = index === 0;
    tracking.subHeading = true;
    if (!tracking.visible) content.hidden = 'hidden';
    var checkpoints = data.body[hObj.id].filter(function (elem) {
      return elem.shown;
    });

    checkpoints.forEach((checkpoint, i)=> {
      var cp = {
        button: (i + 3) === checkpoints.length && checkpoints.length > 4,
        checkpoint: checkpoint,
        more: T.translate('more', props.lang.code),
      };
      var ts = checkpoint.timestamp ?  new Date(checkpoint.timestamp) : null;
      if (aceptedStatus.indexOf(checkpoint.status) >= 0 && i === (checkpoints.length - 1))
        tracking.prediction = {
          text: T.translate('predictions', props.lang.code)[checkpoint.status],
          status: checkpoint.status,
        };
      if (ts) cp.dateText = T.date(ts, i !== 0, props.lang.code);

      cp.transitStatus = statics.transitStates[checkpoint.status];
      if (typeof cp.transitStatus === 'undefined')
        cp.transitStatus = statics.transitStates.default;
      if (checkpoints.length > 3 && (i + 4) <= checkpoints.length)
        cp.checkpoint_hidden = 'hidden';

      cp.transitStatusColor = cp.transitStatus.color;
      cp.locationText = checkpoint.location ? ' (' + checkpoint.location + ')' : '';
      cp.alert = i === checkpoints.length - 1 ?
        'alert-' + (cp.transitStatus.alert ?
          cp.transitStatus.alert : 'info') : '';

      tracking.checkpoints.push(cp);
    });
    tracking.checkpoints.reverse();
    return tracking;
  });

  return trackings.map(t => opts.fn(t)).join(' ');

};
