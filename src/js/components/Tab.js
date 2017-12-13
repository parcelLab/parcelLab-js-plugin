const html = require('bel')

const Tab = (tab, emit) => {
  const handleClick = e => {
    e.preventDefault()
    emit('setActiveTracking', tab.id)
  }

  return html`
    <div class="pl-col pl-col-${tab.colSize}" style="padding:10px;" onclick="${handleClick}">
      <div class="pl-tab pl-btn pl-btn-default pl-${tab.active ? 'active' : 'not-active' }">
        <div class="pl-tab-content">
          <div class="pl-tab-text">
            <span class="pl-tab-text-tno">
              ${tab.courier.prettyname}
              ${tab.trackingNo}
            </span>
            <br />
            <span class="pl-tab-text-status">
              ${tab.statusText}
            </span>
          </div>
          
          <div class="pl-status">
            <div class="pl-icon">
              <span class="fa-stack fa-lg">
                ${ tab.transitStatus.color ? html`<i class="fa fa-circle fa-stack-2x" style="opacity:.2; color: ${tab.transitStatus.color}"></i>` : html`<i class="fa fa-circle fa-stack-2x" style="opacity:.4;"></i>` }
                <i class="fa fa-${tab.transitStatus.icon} fa-stack-1x" style="color: 
                ${tab.transitStatus.color}"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

}

module.exports = Tab
