const html = require('bel')
const Icon = require('../Icon')

const Label = text => html`
  <div class="pl-box-heading pl-box-cal-heading">
    ${text}
  </div>
`

const Calendar = (dayOfWeek, dateOfMonth, month) => html`
  <div class="pl-box-body pl-box-cal-body pl-box-prediction">
    <div class="pl-cal-week-day">${dayOfWeek}</div>
    <div class="pl-cal-day">${dateOfMonth}</div>
    <div class="pl-cal-month">${month}</div>
  </div>
`

const TimeBox = (startTime, endTime, timeCaption) => {
  const icon = Icon('clock', '#000', '25')
  icon.classList.add('pl-space-right')
  icon.style.display = 'inline-block'
  icon.style.verticalAlign = 'bottom'
  icon.style.marginBottom = '3px'

  return html`
    <div class="pl-box pl-box-time">
      <div class="pl-box-body">
        <div class="pl-time-data">
          ${ icon} ${startTime} ${endTime ? ' - ' + endTime : ''}
        </div>
        ${ timeCaption ? html`
        <small class="pl-time-caption">${timeCaption}</small>` : ''}
      </div>
    </div>
    `
}


const Caption = text => html`
  <div class="pl-prediction-caption">
    ${text}
    </small>
`

const Prediction = ({ actionBox }) => {
  const { label, data } = actionBox
  if (!(data.dayOfWeek || data.startTime)) return null

  const heading = label ? Label(label) : null
  const calendar = data.dayOfWeek ? Calendar(data.dayOfWeek, data.dateOfMonth, data.month) : null
  const timeBox = data.startTime ? TimeBox(data.startTime, data.endTime, data.timeCaption) : null
  const caption = data.caption ? Caption(data.caption) : null


  return html`
    <div class="pl-spaced-list">
      <div class="pl-box pl-action-box pl-box-calendar">
        ${ heading} ${ calendar}
      </div>
    
      ${ timeBox} ${ caption}
    </div>
  `
}

module.exports = Prediction
