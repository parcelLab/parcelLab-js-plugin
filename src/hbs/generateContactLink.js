module.exports = function generateContactLink(link, buttonify) {
  var style = buttonify ? ' class="btn btn-default btn-block"' : '';

  if (/\S+@\S+\.\S+/.test(link))
    return `<a href="mailto:${link}" class="one-liner" ${style}><i class="fa fa-fw fa-envelope-o"></i> ${link}</a>`;
  if (/^http.*/.test(link))
    return `<a href="${link}" class="one-liner" _target="blank" ${style}><i class="fa fa-fw fa-question-circle"></i> ${link}</a>`;
};
