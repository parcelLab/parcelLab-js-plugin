const html = require('bel')
const colors = {
  facebook: '#3b5999',
  instagram: '#3f729b',
  pinterest: '#bd081c',
  twitter: '#55acee',
  'google-plus': '#dd4b39',
  'youtube-play': '#e52d27',
  xing: '#006567',
  tumblr: '#34465d',
}

const SocialLink = (name, link) => {
  const color = colors[name] ? colors[name] : '#ddd'

  return html`<a href="${link}" target="_blank" alt="${name}" style="text-decoration:none;">
      <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x" style="color: #e0e0e0; opacity: .4;"></i>
          <i class="fa fa-${name} fa-stack-1x" style="color:${color}"></i>
      </span>
  </a>`
}

module.exports = SocialLink