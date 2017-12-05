
const actions = {
  setState: state => ({ type: 'SET_STATE', data: state }),
  fetchCheckpoints: () => ({ type: 'FETCH_CHECKPOINTS' }),
  fetchShopInfos: () => ({ type: 'FETCH_SHOP_INFOS' }),
  fetchPickupLocation: () => ({ type: 'FETCH_PICKUP_LOCATION' })
}

module.exports = actions
