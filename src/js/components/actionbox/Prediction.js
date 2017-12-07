const html = require('yo-yo')
const initiateDeliveriesMap = require('./initiateDeliveriesMap')

const Label = text => html`
  <div class="pl-box-heading pl-box-cal-heading">
    <h3 style="text-align:center;">${text}</h3>
  </div>
`

const Calendar = (dayOfWeek, dateOfMonth, month) => html`
  <div class="pl-box-body pl-box-cal-body pl-box-prediction">
      <div class="pl-cal-week-day">${dayOfWeek}</div>
      <div class="pl-cal-day">${dateOfMonth}</div>
      <div class="pl-cal-month">${month}</div>
  </div>
`

const TimeBox = (startTime, endTime, timeCaption) => html`
  <div class="pl-box pl-box-time" style="margin-bottom: 10px;">
    <div class="pl-box-body">
      <div class="pl-time-data">
        <i class="fa fa-clock-o"></i> ${startTime} ${endTime ? ' - ' + endTime : '' }
      </div>
      ${ timeCaption ? html`<small class="pl-time-caption">${timeCaption}</small>` : ''}
    </div>
  </div>
`

const LocationMap = ({ startTime, endTime, deliveryLocation, nearbyDeliveries }) => {
  if (!startTime || !deliveryLocation) return null

  const elemId = 'pl-prediction-map'
  setTimeout(() => {
    initiateDeliveriesMap(elemId, startTime, endTime, deliveryLocation, nearbyDeliveries)
  }, 10)
  
  return html`
    <div class="pl-box pl-box-time" style="margin-bottom: 10px;">
      <div class="pl-box-body">
        <div id="pl-prediction-map"></div>
      </div>
    </div>
  `
}

const Caption = text => html`
  <div class="pl-prediction-caption" style="margin-bottom:25px;">
    <i class="fa fa-info" style="margin-right: 5px;"></i> ${text}
  </small>
`

const Prediction = ({ actionBox }) => {
  const { label, data } = actionBox
  if (!(data.dayOfWeek || data.startTime || data.deliveryLocation)) return null

  const heading = label ? Label(label) : null
  const calendar = data.dayOfWeek ? Calendar(data.dayOfWeek, data.dateOfMonth, data.month) : null
  const timeBox = data.startTime ? TimeBox(data.startTime, data.endTime, data.timeCaption) : null
  const locationMap = data.deliveryLocation ? LocationMap(data) : null
  const caption = data.caption ? Caption(data.caption) : null


  return html`
    <div>
      <div class="pl-box" style="margin-bottom: 10px;">
        ${ heading }
        ${ calendar }
      </div>

      ${ timeBox }

      ${ locationMap }

      ${ caption }
    </div>
  `
}

module.exports = Prediction
