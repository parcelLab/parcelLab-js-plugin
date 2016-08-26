var colors = {
  facebook: '#3b5999',
  instagram: '#3f729b',
  pinterest: '#bd081c',
  twitter: '#55acee',
  'google-plus': '#dd4b39',
};

module.exports = function generateSocialLinks(social, link) {
  var color = colors[social] ? colors[social] : '#ddd';

  return `<a href="${link}" target="_blank" alt="${social}">
      <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x" style="color: #e0e0e0; opacity: .4;"></i>
          <i class="fa fa-${social} fa-stack-1x" style="color:${color}"></i>
      </span>
  </a>`;
};
