module.exports = function (address) {
  var encAdress = encodeURIComponent(address);
  return `https://www.google.com/maps/place/${encAdress}/`;
};
