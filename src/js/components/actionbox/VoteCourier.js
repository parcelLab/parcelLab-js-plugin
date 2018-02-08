const html = require('bel')
const Icon = require('../Icon')

const VoteCourier = ({ actionBox, id }, emit) => {
  const { label, voteSuccess, voteErr } = actionBox
  let body = html`
    <div class="pl-rating-body">
      <div class="pl-courier-vote pl-vote-up" onclick=${() => emit('voteCourier', 'up', id)}>
        ${ Icon('thumbs_up', 'dddddd', '30') }
      </div>
      <div class="pl-courier-vote pl-vote-down" onclick=${() => emit('voteCourier', 'down', id)}>
        ${ Icon('thumbs_down', 'dddddd', '30') }
      </div>
    </div>
  `
  if (voteSuccess) body = html`
    <div class="pl-rating-body">
      ${ Icon('success_standard', 'dddddd', '30') }
    </div>
  `

  if (voteErr) body = html`
    <div class="pl-rating-body">
      <small style="text-align:center;">
        An Error occurred, we are very sorry 😥
      </small>
    </div>
  `


  return html`
  <div class="pl-box pl-space-top">
    <div class="pl-box-body">
      ${ label ? html`<div class="pl-space-bottom" style="text-align:center;"><b>${label }</b></div>` : ''}
      ${ body }
    </div>
  </div>
  `
}

module.exports = VoteCourier
