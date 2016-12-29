module.exports = function (a, b, opts) {
  if (a == b) return opts.fn(this);
  else return opts.inverse  ? opts.inverse(this) : null;
};
