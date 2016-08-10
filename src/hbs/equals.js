module.exports = function (a, b, opts) {
  console.log(a);
  console.log(b);
  if (a == b) return opts.fn(this);
  else return opts.inverse  ? opts.inverse(this) : null;
};
