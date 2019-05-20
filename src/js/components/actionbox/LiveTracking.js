const html = require('nanohtml');
const GOOGLE_API_KEY = require('../../../settings').google_api_key;
const { translate } = require('../../../js/lib/translator.js');

const generateMapSrc = address => `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(address)}&zoom=11`;

const Map = (id, actionBox, courier, query) => {
  const elem = html`
    <div id="pl-live-location-map" data-tid="${id}">
        <iframe id="pl-map-iframe" src="${generateMapSrc(
          `${actionBox.info.cty},${actionBox.info.ctry.n}`
        )}" frameborder="0" style="width:100%;height:100%;border:0px;z-index:2"">
        </iframe>
        <a href="${courier.trackingurl}">
        <div id="pl-map-overlay">
          <img id="pl-truck-icon" src="http://cdn.parcellab.com/img/mail/_/truckonmap/${query.userId}.png" alt="" />
        </div>
      </a>
    </div>
  `;

  elem.isSameNode = function(target) {
    // dont rerender map if it is still the same tid
    return id === target.dataset['tid'];
  };

  return elem;
};

const LiveTracking = ({ id, actionBox, last_delivery_status, courier }, query) => {
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
        ${Map(id, actionBox, courier, query)}

        <div class="pl-location-link-container">
          <a
            href="${courier.trackingurl}"
            title="${translate('liveDelivery', query.lang.name)}"
            target="_blank"
            class="pl-button pl-is-fullwidth pl-location-link"
          >
            ${translate('liveDelivery', query.lang.name)}
          </a>
        </div>
      </div>
    </div>
  `;
};

module.exports = LiveTracking;
