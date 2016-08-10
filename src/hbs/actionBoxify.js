module.exports = function (data, opts) {
  if (data.header && data.header.length === 1) {
    var actionBox = data.header[0].actionBox;
    return opts.fn(actionBox);
  } else {
    return null;
  }
};
