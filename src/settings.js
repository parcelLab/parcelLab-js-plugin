module.exports = {
  base_url: 'https://api.parcellab.com/',
  icon_url: 'https://icon.parcellab.com/',
  checkpoints_endpoint: 'v2/checkpoints',
  vote_endpoint: 'v2/vote-courier/',
  vote_communication_endpoint: 'v2/vote-communication/',
  pickup_location_endpoint: 'pickup-location',
  prediction_endpoint: 'prediction/tracking',
  shop_prediction_endpoint: 'prediction',
  sender_endpoint: 'sender',
  user_activity_endpoint: 'user-activity/click',
  default_root_node: '#parcelLab-trace-wrapper',
  google_api_key: require('raw!../GOOGLE_API_KEY').trim(),
  mapShortenAddressForCouriers: ['ups-express', 'ups'],
  defualt_opts: {
    show_shopInfos: false,
    styles: true,
    show_searchForm: false,
    userId: null,
    show_note: null,
    rerouteButton: null,
  },
  default_styles: {
    borderColor: '#eeeeee',
    borderRadius: '4px',
    iconColor: '#000',
    buttonColor: '#333',
    buttonBackground: '#e6e6e6',
    margin: '0px',
  },
}
