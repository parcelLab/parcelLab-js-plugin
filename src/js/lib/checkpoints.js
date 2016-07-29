var Api = require('./api.js');
var Static = require('./static.js');

// var rootName = null;

function getCheckpoints(baseUrl, endpoint, query, lang, cb) {
  Api.loadFromAPI(baseUrl, endpoint, query, 'GET', null, function (err, result) {
    if (err)
      cb(err);
    else
      renderTrackingsToHTML(result, query, lang, cb);
  });
}

/**
 * When requesting using orderNo we have to render the array of trackings.
 * @param  {Object} object this contains the JSON representation of the query.
 * @param  {Array} result the set of trackings.
 */
function renderTrackingsToHTML(result, query, lang, cb) {
  var requestObject = {};
  query.forEach(function (param) {
    requestObject[param.name] = param.value;
  });

  var content = {};
  var trackings;
  if (result.header && result.header.length > 1)
    content.tabs = getTabsContent(requestObject, lang, result.header);

  // normalize trackings.
  if (result.header.length === 1) {
    // fall
    requestObject.visible = true;
    requestObject.subHeading = false;
    trackings = result.header.map(function (tracking, index) {
      tracking.checkpoints = result.body[tracking.id];
      tracking.visible = index === 0;
      tracking.subHeading = false;
      return tracking;
    });
  } else {
    trackings = result.header.map(function (tracking, index) {
      tracking.checkpoints = result.body[tracking.id];
      tracking.visible = index === 0;
      tracking.subHeading = true;
      return tracking;
    });
  }

  // get Trace
  content.trackings = [];
  if (trackings.length === 1) {
    content.heading = generateTitle(trackings[0], lang);
    trackings.forEach(function (tracking) {
      content.trackings.push(getTrackingContent(tracking, lang));
    });
  } else {
    trackings.forEach(function (tracking) {
      content.heading = generateTitle(requestObject, lang);
      content.trackings.push(getTrackingContent(tracking, lang));
    });
  }

  cb(null, content);
}

/**
 * Returns the title depending of the info contained in the object.
 * @param  {Object} object contians the JSON representation of the query.
 */
function generateTitle(requestObject, lang) {
  var heading = '';
  if (requestObject.orderNo) {
    heading = lang.data('orderNo') + ' ' + requestObject.orderNo;
  } else if (requestObject.tracking_number && requestObject.courier) {
    var courierName = requestObject.courier.prettyname;
    heading = lang.data('delivery') + ' ' +
      requestObject.tracking_number + ' (' + courierName + ')';
  }

  return heading;
}

/**
 * Render the multiple tabs, used for orderNo with multiple trackings.
 * @param  {Object} object the JSON representation of the query.
 * @param  {Array} header contains the basic information of every tracking.
 */
function getTabsContent(requestObject, lang, header) {
  var colSize = header.length == 3 ? 4 : 6;
  var tabs = [];
  header.forEach(function (tracking, index) {
    var template = { size: colSize };
    var info = {
      trackingNo: tracking.tracking_number,
      courier: tracking.courier,
      lang: lang.code,
    };
    template.signalColourGreen = !tracking.delayed && !tracking.exception ? '#679A34' : '#AAA';
    template.signalColourOrange = tracking.delayed ? '#F68423' : '#AAA';
    template.signalColourRed = tracking.exception ? '#CE0711' : '#AAA';
    template.active = index === 0 ? 'active' : '';
    template.transitStatus = Static.transitStates[tracking.last_delivery_status.code];
    template.href = tracking.id;
    template.object = JSON.stringify(info);
    if (typeof template.transitStatus == 'undefined')
      template.transitStatus = Static.transitStates.default;
    template.transitStatusColor = template.transitStatus.color;

    tracking.template = template;
    tracking.courier = Static.courierNames[tracking.courier];
    tabs.push(tracking);
  });

  return tabs;
}

/**
 * Renders the given checkpoints
 * @param  {Object} object, object representation of the query.
 * @param  {Array} checkpointsInput, array of checkpoints.
 */
function getTrackingContent(tracking, lang) {
  var content = {
    id: tracking.id,
    checkpoints: [],
  };

  if (!tracking.visible) content.hidden = 'hidden';

  var aceptedStatus = 'OutForDelivery DestinationDeliveryCenter';
  var checkpoints = tracking.checkpoints.filter(function (elem) {
    return elem.shown;
  });

  for (var i = checkpoints.length - 1; i >= 0; i--) {
    var checkpoint = checkpoints[i];
    var data = {
      button: (i + 3) == checkpoints.length && checkpoints.length > 4,
      checkpoint: checkpoint,
      more: lang.data('more'),
    };

    var ts = new Date(checkpoint.timestamp);
    if (aceptedStatus.indexOf(checkpoint.status) >= 0 && i == (checkpoints.length - 1))
      content.prediction = {
        text: lang.data('predictions')[checkpoint.status],
        status: checkpoint.status,
      };
    data.dateText = lang.date(ts, i !== 0);

    data.transitStatus = Static.transitStates[checkpoint.status];
    if (typeof data.transitStatus == 'undefined') data.transitStatus = Static.transitStates.default;
    if (checkpoints.length > 3 && (i + 4) <= checkpoints.length) data.checkpoint_hidden = 'hidden';

    data.transitStatusColor = data.transitStatus.color;
    data.locationText = checkpoint.location ? ' (' + checkpoint.location + ')' : '';
    data.alert = i == checkpoints.length - 1 ?
      'alert-' + (data.transitStatus.alert ?
        data.transitStatus.alert : 'info') : '';

    content.checkpoints.push(data);
  }

  content.subHeading = tracking.subHeading ? generateTitle(tracking, lang) : null;

  return content;
}

module.exports = {
  getCheckpoints: getCheckpoints,
  renderTrackingsToHTML: renderTrackingsToHTML,
};
