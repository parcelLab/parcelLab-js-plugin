const html = require('bel')

const VoteCourier = ({ actionBox, id }, emit) => {
  const { label, voteSuccess, voteErr } = actionBox
  let body = html`
    <div class="rating-body">
      <div class="pl-courier-vote up" onclick=${() => emit('voteCourier', 'up', id)}>
        <i class="fa fa-thumbs-o-up"></i>
      </div>
      <div class="pl-courier-vote down" onclick=${() => emit('voteCourier', 'down', id)}>
        <i class="fa fa-thumbs-o-down"></i>
      </div>
    </div>
  `
  if (voteSuccess) body = html`
    <div class="rating-body">
      <i class="fa fa-check fa-2x"></i>
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
  <div class="pl-box" style="margin-bottom:25px;">
    <div class="pl-box-body" style="padding: 15px;">
      ${ label ? html`<h3 style="text-align:center;">${ label }</h3>` : ''}
      ${ body }
    </div>
  </div>
  `
}

module.exports = VoteCourier
