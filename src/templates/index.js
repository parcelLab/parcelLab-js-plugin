var templates = {
  checkpoints: require('!mustache!./checkpoints.hogan.html'),
};

module.exports.get = function (name) {
  var template = templates[name];
  if (template)
    return template;
  else return null;
};
