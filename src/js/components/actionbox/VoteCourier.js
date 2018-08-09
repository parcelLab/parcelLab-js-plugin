const html = require('nanohtml')
const Icon = require('../Icon')

const Branding = () => html`
  <div class="pl-space-top pl-space-bottom">
    <a href="//parcellab.com" style="color: #aaa;text-align: center;display: block;text-decoration: none;font-size: 11px;letter-spacing: 1px;"
      target="_blank">
      powered by parcelLab.com
    </a>
  </div>
`

const VoteCourier = ({ actionBox, id }, emit) => {
  const { label, voteCourierSuccess, voteCourierErr } = actionBox
  let body = html`
    <div class="pl-rating-body">
      <div class="pl-courier-vote pl-vote-up" onclick=${() => emit('voteCourier', 'up', id)}>
        ${ Icon('thumbs_up', 'aaa', '30') }
      </div>
      <div class="pl-courier-vote pl-vote-down" onclick=${() => emit('voteCourier', 'down', id)}>
        ${ Icon('thumbs_down', 'aaa', '30') }
      </div>
    </div>
  `
  if (voteCourierSuccess) body = html`
    <div class="pl-rating-body">
      ${ Icon('success_standard', 'aaa', '30') }
    </div>
  `

  if (voteCourierErr) body = html`
    <div class="pl-rating-body">
      <small style="text-align:center;">
        An Error occurred, we are very sorry 😥
      </small>
    </div>
  `

  return html`
      <div class="pl-box pl-space-top pl-vote">
        <div class="pl-box-body">
          ${ label ? html`<div class="pl-space-bottom" style="text-align:center;"><b>${ label }</b></div>` : ''}
          ${ body }
        </div>
      </div>
    `
}

const VoteParcelLab = ({ actionBox, id }, emit) => {
  const { label_communication, voteCommunicationSuccess, voteCommunicationErr } = actionBox
  let body = html`
    <div class="pl-rating-body">
      <div class="pl-courier-vote pl-vote-up" onclick=${() => emit('voteCommunication', 'up', id)}>
        ${ Icon('thumbs_up', 'aaa', '30') }
      </div>
      <div class="pl-courier-vote pl-vote-down" onclick=${() => emit('voteCommunication', 'down', id)}>
        ${ Icon('thumbs_down', 'aaa', '30') }
      </div>
    </div>
  `
  if (voteCommunicationSuccess) body = html`
    <div class="pl-rating-body">
      ${ Icon('success_standard', 'aaa', '30') }
    </div>
  `

  if (voteCommunicationErr) body = html`
    <div class="pl-rating-body">
      <small style="text-align:center;">
        An Error occurred, we are very sorry 😥
      </small>
    </div>
  `

  return html`
      <div class="pl-box pl-space-top pl-vote">
        <div class="pl-box-body">
          ${ label_communication ? html`<div class="pl-space-bottom" style="text-align:center;"><b>${ label_communication }</b></div>` : ''}
          ${ body }
        </div>
      </div>
    `
}

module.exports = function Vote(tHeader, options, emit) {
  return options.disableVoting ? null : [
    VoteCourier(tHeader, emit),
    VoteParcelLab(tHeader, emit),
    options.disableBranding ? null : Branding(tHeader, emit),
  ]
}
