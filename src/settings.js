module.exports = {
  base_url: 'https://api.parcellab.com/',
  checkpoints_endpoint: 'v2/checkpoints',
  vote_endpoint: 'v2/vote-courier/',
  pickup_location_endpoint: 'pickup-location',
  prediction_endpoint: 'prediction/tracking',
  shop_prediction_endpoint: 'prediction',
  sender_endpoint: 'sender',
  version_url: 'https://cdn.parcellab.com/js/v2/version.txt',
  default_root_node: '#parcelLab-trace-wrapper',
  google_api_key: require('raw!../GOOGLE_API_KEY').trim(),
  defualt_opts: {
    show_shopInfos: false,
  },
};
