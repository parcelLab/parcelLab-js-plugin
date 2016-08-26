module.exports = function generateContactLink(link) {
  var emailTest = /\S+@\S+\.\S+/;
  if (emailTest.test(link)) return `<a href="mailto:${link}">${link}</a>`;
  else return `<a href="${link}" _target="blank">${link}</a>`;
};
