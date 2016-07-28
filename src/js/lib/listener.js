// Listens to activity of the user
var Static = require('./static.js');
var Utils = require('./utils/utils.js');
var Api = require('./api.js');
var baseUrl = 'https://api.parcellab.com/';

/**
 * Fire up the listen methods.
 * @param  {Object} object, object representation of the query.
 */
module.exports.listen = function (requestObject) {
  var blocks = Static.listenBlocks;
  blocks.forEach(function (block) {
    listenBlock(block, requestObject);
  });
};

/**
 * Adds the on click method to every target of the block
 * @param  {Object} block, piece of code to be listened.
 * @param  {Object} object, object representation of the query.
 */
function listenBlock(block, requestObject) {
  var target = block.target || 'a';
  Utils.eventFromParent('click', block.name, target, function (e) {
    var payload = {
      activity: 'user_behavior',
      target: this.href,
      tno: requestObject.trackingNo || requestObject.tno || '',
      courier: requestObject.courier || '',
      user: requestObject.u,
      orderNo: requestObject.orderNo || '',
      type: block.type,
    };

    Api.loadFromAPI(baseUrl, 'logger', [], 'POST', payload, function () {
		});
  });
}
