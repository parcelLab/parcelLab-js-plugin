const html = require('nanohtml')
const { translate } = require('../../../js/lib/translator.js')

const PickupLocationUnknown = ({ actionBox, courier, last_delivery_status: lastDeliveryStatus }, { lang }) => {
  if (!courier || !courier.trackingurl) return null

  const status = lastDeliveryStatus ? lastDeliveryStatus.status : null
  return html`
    <div class="pl-box pl-action-box pl-box-pseudo-map">
      <div class="pl-box-heading">
        ${status}
      </div>

      <div class="pl-box-body">
        <div id="pl-pseudo-map">
           <a href="${courier.trackingurl}" title="${actionBox.label}" target="_blank">
             <div class="pl-pseudo-map-text">
               <span>
                 ${translate('showPickuplocation', lang.name)}
               </span>
             </div>
           </a>
        </div>
      </div>

      <div class="pl-box-footer">
        ${actionBox.label}
      </div>
    </div>
  `

  // return html`
  //   <div class="pl-box pl-action-box pl-box-pseudo-map">
  //     <div class="pl-box-body">
  //       <div id="pl-pseudo-map">
  //         <a href="${courier.trackingurl}" title="${actionBox.label}" target="_blank">
  //           <div class="pl-pseudo-map-text">
  //             <span>
  //               ${ status }
  //               ${ actionBox.label }
  //             </span>
  //           </div>
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // `
}

module.exports = PickupLocationUnknown
