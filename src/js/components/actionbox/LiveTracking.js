const html = require('nanohtml');
const STATIC_GOOGLE_API_KEY = require('../../../settings').static_google_api_key;
const { translate } = require('../../../js/lib/translator.js');

const Map = (id, actionBox) => {
  const elem = html`
    <div id="pl-live-location-map" data-tid="${id}">
      <img
        src="https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
          `${actionBox.info.cty},${actionBox.info.ctry.n}`
        )}&autoscale=1&size=300x250&zoom=12&maptype=terrain&format=png&visual_refresh=true&key=${STATIC_GOOGLE_API_KEY}"
        alt=""
      />
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
