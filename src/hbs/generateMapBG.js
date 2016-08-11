module.exports = function (address) {
  const GOOGLE_API_KEY = require('raw!../../GOOGLE_API_KEY').trim();
  var encAdress = encodeURIComponent(address);
  var imgLink = `http://maps.googleapis.com/maps/api/staticmap? \
    center=${encAdress}
    &zoom=17
    &size=300x170
    &format=png
    &visual_refresh=true
    &key=${GOOGLE_API_KEY}
    &markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${encAdress}`;
  var css = `
    background-image: url(${imgLink});
    background-size: cover;
    background-position: center;
    `;
  return css.replace(/ /g, '').replace(/\n/g, '');
};
