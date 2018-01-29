const html = require('bel')
const Icon = require('../Icon')

const VoteCourier = ({ actionBox, id }, emit) => {
  const { label, voteSuccess, voteErr } = actionBox
  let body = html`
    <div class="rating-body">
      <div class="pl-courier-vote pl-vote-up" onclick=${() => emit('voteCourier', 'up', id)}>
        ${ Icon('thumbs-up', 'dddddd', '30') }
      </div>
      <div class="pl-courier-vote pl-vote-down" onclick=${() => emit('voteCourier', 'down', id)}>
        ${ Icon('thumbs-down', 'dddddd', '30') }
      </div>
    </div>
  `
  if (voteSuccess) body = html`
    <div class="rating-body">
      ${ Icon('check', 'dddddd', '30') }
    </div>
  `

  if (voteErr) body = html`
    <div class="rating-body">
      <small style="text-align:center;">
        An Error occurred, we are very sorry 😥
      </small>
    </div>
  `


  return html`
  <div class="pl-box">
    <div class="pl-box-body" style="padding: 15px;">
      ${ label ? html`<h3 style="text-align:center;">${ label }</h3>` : ''}
      ${ body }
    </div>
  </div>
  `
}

module.exports = VoteCourier
