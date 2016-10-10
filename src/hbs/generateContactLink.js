module.exports = function generateContactLink(link) {
  if (/\S+@\S+\.\S+/.test(link))
    return `<a href="mailto:${link}"><i class="fa fa-fw fa-envelope-o"></i> ${link}</a>`;
  if (/^http.*/.test(link))
    return `<a href="${link}" _target="blank"><i class="fa fa-fw fa-question-circle"></i> ${link}</a>`;
};
