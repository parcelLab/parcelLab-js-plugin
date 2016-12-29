module.exports = function generatePhoneLink(link, buttonify) {
  var style = buttonify ? ' class="btn btn-default btn-block"' : '';
  if (link) return `<a href="tel:${link}" ${style}><i class="fa fa-fw fa-phone"></i> ${link}</a>`;
};
