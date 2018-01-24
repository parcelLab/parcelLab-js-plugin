const html = require('bel')

const VoteCourier = ({ actionBox, id }, emit) => {
  const { label, voteSuccess, voteErr } = actionBox
  let body = html`
    <div class="rating-body">
      <div class="pl-courier-vote pl-vote-up" onclick=${() => emit('voteCourier', 'up', id)}>
        <img src="https://icongr.am/clarity/thumbs-up.svg?size=30&color=dddddd" class="">
      </div>
      <div class="pl-courier-vote pl-vote-down" onclick=${() => emit('voteCourier', 'down', id)}>
        <img src="https://icongr.am/clarity/thumbs-down.svg?size=30&color=dddddd" class="">
      </div>
    </div>
  `
  if (voteSuccess) body = html`
    <div class="rating-body">
      <img src="https://icongr.am/clarity/check.svg?size=30&color=dddddd" class="">
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
