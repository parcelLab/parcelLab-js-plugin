const html = require('nanohtml')
const Icon = require('../Icon')
const RerouteLink = require('../RerouteLink')

const Label = text => html`
  <div class="pl-box-heading pl-box-cal-heading">
    ${text}
  </div>
`

const Calendar = (dayOfWeek, dateOfMonth, month) => html`
  <div class="pl-box-body pl-box-cal-body">
    <div class="pl-cal-week-day">${dayOfWeek}</div>
    <div class="pl-cal-day">${dateOfMonth}</div>
    <div class="pl-cal-month">${month}</div>
  </div>
`

const TimeBox = (startTime, endTime, timeCaption) => {
  return html`
    <div class="pl-time-data pl-space-bottom">
      ${startTime} ${endTime ? ' - ' + endTime : ''}
      ${timeCaption ? html`
      <small class="pl-time-caption">${timeCaption}</small>` : ''}
    </div>
    `
}

const Caption = text => html`
  <div class="pl-prediction-caption">
    ${text}
    </small>
`

const Prediction = ({ actionBox, courier }) => {
  const { label, data } = actionBox
  if (!(data.dayOfWeek || data.startTime)) return null

  const heading = label ? Label(label) : null
  const calendar = data.dayOfWeek ? Calendar(data.dayOfWeek, data.dateOfMonth, data.month) : null
  const timeBox = data.startTime ? TimeBox(data.startTime, data.endTime, data.timeCaption) : null
  const caption = data.caption ? Caption(data.caption) : null
  const rerouteLink = RerouteLink(courier)

  return html`

      <div class="pl-box pl-action-box pl-box-calendar">
        ${heading}
        ${calendar}
        ${timeBox}
        <div class="pl-box-body pl-spaced-list">
          ${caption}
          ${rerouteLink}
        </div>
      </div>
    
  `
}

module.exports = Prediction
