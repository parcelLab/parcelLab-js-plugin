const html = require('nanohtml');
const GOOGLE_API_KEY = require('../../../settings').google_api_key;
const { translate } = require('../../../js/lib/translator.js');

const generateMapSrc = address => `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(address)}&zoom=11`;

const Map = (id, actionBox) => {
  const elem = html`
    <div id="pl-pickup-location-map" data-tid="${id}">
      <iframe src="${generateMapSrc(`${actionBox.info.cty},${actionBox.info.ctry.n}`)}" frameborder="0" style="width:100%;height:100%;border:0px;"></iframe>
    </div>
  `;

  elem.isSameNode = function(target) {
    // dont rerender map if it is still the same tid
    return id === target.dataset['tid'];
  };

  return elem;
};

const LiveTracking = ({ id, actionBox, last_delivery_status, courier }, lang, emit) => {
  if (!actionBox.info.cty) return null;

  const heading = last_delivery_status
    ? html`
        <div class="pl-box-heading pl-box-location-heading">
          ${last_delivery_status.status}
        </div>
      `
    : null;

  return html`
    <div class="pl-box pl-action-box pl-box-location">
      ${heading}

      <div class="pl-box-body pl-box-location-body">
        ${Map(id, actionBox)}

        <div class="pl-location-link-container">
          <a href="${courier.trackingurl}" title="${translate('liveDelivery', lang.name)}" target="_blank" class="pl-button pl-is-fullwidth pl-location-link">
            ${translate('liveDelivery', lang.name)}
          </a>
        </div>
      </div>
    </div>
  `;
};

module.exports = LiveTracking;
