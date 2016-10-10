module.exports = function generatePhoneLink(link) {
  if (link) return `<a href="tel:${link}"><i class="fa fa-fw fa-phone"></i> ${link}</a>`;
};
