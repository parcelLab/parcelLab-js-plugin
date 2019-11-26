const html = require('nanohtml')
const GOOGLE_API_KEY = require('../../../../settings').google_api_key
// const googleMaps = require('@google/maps').createClient({
//   key: GOOGLE_API_KEY,
// })

const generateLinkSrc = coordinates =>
  `https://www.google.com/maps/@${coordinates.long},${coordinates.lat},5z`

const generateMapSrc = (coordinates, zoom) =>
  `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_API_KEY}&center=${coordinates.long},${coordinates.lat}&zoom=5&maptype=roadmap`

const generateTruckIconSrc = userId => `http://cdn.parcellab.com/img/mail/_/truckonmap/${userId}.png`

////////
// map//
////////

//DO RIGHT MAP --> Display truck!!
const Map = (id, actionBox) => {
  const elem = html`
    <div id="pl-pickup-location-map" data-tid="${id}">
      <iframe src="${generateMapSrc(actionBox.data.coordinates, 12.5)}" frameborder="0" style="width:100%;height:100%;border:0px;"></iframe>
    </div>
  `

  elem.isSameNode = function (target) { // dont rerender map if it is still the same tid
    return id === target.dataset['tid']
  }

  return elem
}

//////////////
// time box //
//////////////

const checkTimeFormat = function (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

const generatePrettyTime = timeString => {
  if (!timeString) return null
  const date = new Date(timeString)
  const hours = checkTimeFormat(date.getHours())
  const mins = checkTimeFormat(date.getMinutes())
  return `${hours}:${mins}`
}

const DeliveryBox = (startTime, endTime, timeCaption, actionBox) => {


  /* 
  * TODO Caption for "Ankunftszeit ca... xx - xx"
  * TODO Ikea style scss (pl-box-body-userName)
  * Blue: HEX COLOR: #0051BA;
  * Yellow: HEX COLOR: #FFDA1A;
  */

  const caption = actionBox.caption.replace('{{openStops}}', actionBox.data.details.openStops)

  return html`
        <div>
          ${caption}
        </div>
        <div class="pl-time-data">
          ${generatePrettyTime(startTime)} ${endTime ? ' - ' + generatePrettyTime(endTime) : ''}
        </div>
        ${ timeCaption ? html`
        <small class="pl-time-caption">${timeCaption}</small>` : ''}
    `
}


const LiveTrackingMap = ({ id, actionBox }, query) => {
  if (!actionBox.coordinates) return null

  // const mapBox = Map()
  // html`
  //   <div class="pl-box pl-action-box pl-box-location">
  //     <div class="pl-box-body pl-box-location-body">
  //       <--DO MAP--/>
  //     </div>
  //   </div>
  // `
  const scheduled = actionBox.info.scheduled
  const deliveryBox = (scheduled && scheduled.startTime, actionBox)
    ? DeliveryBox(scheduled.startTime, scheduled.endTime, scheduled.timeCaption, actionBox)
    : null

  return html`
    <div class="pl-spaced-list">
    <div class="pl-box pl-action-box pl-box-location">
      <div class="pl-box-body pl-box-location-body">
        ${Map(id, actionBox)}
      </div>
      <div class="pl-box-${query.userId}">
        ${ deliveryBox}
      </div>
    </div>
    </div>
  `
}

module.exports = LiveTrackingMap
