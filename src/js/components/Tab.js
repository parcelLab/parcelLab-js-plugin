const html = require('yo-yo')

const Tab = tab => html`
  <div class="pl-col pl-col-${tab.size}" style="padding:10px;" >
    <div class="pl-tab pl-btn pl-btn-default pl-${tab.active ? 'active' : 'not-active' }" href="pl-t-${tab.href}">
      <div class="pl-tab-content">
        <div class="pl-tab-text">
          <span class="pl-tab-text-tno">
            ${tab.courier.prettyname} &nbsp;
            ${tab.tracking_number}
          </span>
          <br />
          <span class="pl-tab-text-status">
            ${tab.last_delivery_status.status}
          </span>
        </div>
        
        <div class="pl-status">
          <div class="pl-icon">
            <span class="fa-stack fa-lg">
              ${ tab.transitStatus.colo ? 
    html`<i class="fa fa-circle fa-stack-2x" style="opacity:.2; color: ${tab.transitStatus.color}"></i>` : 
    html`<i class="fa fa-circle fa-stack-2x" style="opacity:.4;"></i>` }
              <i class="fa fa-${tab.transitStatus.icon} fa-stack-1x" style="color: 
              ${tab.transitStatus.color}"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
`


module.exports = Tab
