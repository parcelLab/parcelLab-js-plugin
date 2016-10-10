module.exports = function generateContactLink(link, buttonify) {
  var style = buttonify ? ' class="btn btn-default btn-block"' : '';

  if (/\S+@\S+\.\S+/.test(link))
    return `<a href="mailto:${link}" ${style}><i class="fa fa-fw fa-envelope-o"></i> ${link}</a>`;
  if (/^http.*/.test(link))
    return `<a href="${link}" _target="blank" ${style}><i class="fa fa-fw fa-question-circle"></i> ${link}</a>`;
};
