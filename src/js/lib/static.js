var transitStates = {
  OrderProcessed: {
    icon: 'shopping-cart',
  },
  PickUpScheduled: {
    icon: 'share',
  },
  Upgrade: {
    icon: 'magic',
    color: '#3378B9',
  },
  InboundScan: {
    icon: 'truck',
  },
  InTransit: {
    icon: 'truck',
  },
  ExportHub: {
    icon: 'truck',
  },
  ImportHub: {
    icon: 'truck',
  },
  DestinationDeliveryCenter: {
    icon: 'truck',
  },
  DestinationDeliveryDepot: {
    icon: 'truck',
  },
  OutForDelivery: {
    icon: 'truck',
  },
  Rerouted: {
    icon: 'map-signs',
  },
  FailedAttemptFirst: {
    icon: 'sticky-note-o',
    color: '#E59400',
    alert: 'warning',
  },
  FailedAttemptSecond: {
    icon: 'sticky-note-o',
    color: '#E59400',
    alert: 'warning',
  },
  FailedAttemptFinal: {
    icon: 'sticky-note',
    color: '#DB524B',
    alert: 'danger',
  },
  PickupReadyToday: {
    icon: 'map-marker',
    color: '#58B957',
    alert: 'success',
  },
  PickupReadyNextDay: {
    icon: 'map-marker',
    color: '#58B957',
    alert: 'success',
  },
  Delivered: {
    icon: 'check-circle',
    color: '#58B957',
    alert: 'success',
  },
  Exception: {
    icon: 'warning',
    color: '#DB524B',
    alert: 'danger',
  },
  Stored: {
    icon: 'building',
    percentage: '50',
  },
  Return: {
    icon: 'warning',
    color: '#DB524B',
    alert: 'danger',
  },
  default: {
    icon: 'info-circle',
  },
};

var courierNames = {
  'dhl-germany': 'DHL',
  'hermes-de': 'Hermes',
  'dpd-de': 'DPD',
  ups: 'UPS',
};

var socialIcons = {
  twitter: {
    color: '#55acee',
  },
  instagram: {
    color: '#3f729b',
  },
  facebook: {
    color: '#3b5999',
  },
  'youtube-play': {
    color: '#e52d27',
  },
  'google-plus': {
    color: '#DC4E41',
  },
  xing: {
    color: '#006567',
  },
  pinterest: {
    color: '#bd081c',
  },
};

var languages = {
  de: {
    name: 'de',
    label: 'Deutsch',
    code: 'DEU',
    icon: 'https://cdn.parcellab.com/img/flags/de.png',
  },
  en: {
    name: 'en',
    label: 'English',
    code: 'USA',
    icon: 'https://cdn.parcellab.com/img/flags/us.png',
  },
  es: {
    name: 'es',
    label: 'Español',
    code: 'ESP',
    icon: 'https://cdn.parcellab.com/img/flags/es.png',
  },
  fr: {
    name: 'fr',
    label: 'Français',
    code: 'FRA',
    icon: 'https://cdn.parcellab.com/img/flags/fr.png',
  },
  it: {
    name: 'it',
    label: 'Italiano',
    code: 'ITA',
    icon: 'https://cdn.parcellab.com/img/flags/it.png',
  },
  nl: {
    name: 'nl',
    label: 'Nederlands',
    code: 'NLD',
    icon: 'https://cdn.parcellab.com/img/flags/nl.png',
  },
  da: {
    name: 'da',
    label: 'Dansk',
    code: 'DNK',
    icon: 'https://cdn.parcellab.com/img/flags/dk.png',
  },
  sv: {
    name: 'sv',
    label: 'Svenska',
    code: 'SWE',
    icon: 'https://cdn.parcellab.com/img/flags/se.png',
  },
  no: {
    name: 'no',
    label: 'Norsk',
    code: 'NOR',
    icon: 'https://cdn.parcellab.com/img/flags/no.png',
  },
  fi: {
    name: 'fi',
    label: 'Suomalainen',
    code: 'FIN',
    icon: 'https://cdn.parcellab.com/img/flags/fi.png',
  },
};

var translations = {
  USA: {
    delivery: 'Delivery',
    more: 'Show more...',
    orderNo: 'Order',
    predictions: {
      OutForDelivery: 'The package will arrive <b>today</b>.',
      DestinationDeliveryCenter: 'The package will arrive <b>tomorrow</b>.',
    },
    openingHours: 'Opening hours',
    weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    alwaysOpened: '24h opened.',
    closesIn: 'Closes in about ',
    opensIn: 'Opens in about ',
    error: {
      delivery: 'Unfortunately, this delivery is not available.',
    },
  },
  DEU: {
    delivery: 'Lieferung',
    more: 'Mehr anzeigen...',
    orderNo: 'Auftrag',
    predictions: {
      OutForDelivery: 'Die Ware wird noch <b>heute</b> geliefert.',
      DestinationDeliveryCenter: 'Die Ware wird <b>morgen</b> geliefert.',
    },
    openingHours: 'Öffnungszeiten',
    weekDays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    alwaysOpened: 'Durchgehend geöffnet.',
    closesIn: 'Schließt in ungefähr ',
    opensIn: 'Öffnet in ungefähr ',
    error: {
      delivery: 'Diese Sendung liegt leider nicht im System vor.',
    },
  },
  ESP: {
    delivery: 'Entrega',
    more: 'Ver más...',
    orderNo: 'Número de Orden',
    predictions: {
      OutForDelivery: 'El paquete llegará <b>Hoy</b>.',
      DestinationDeliveryCenter: 'El paquete llegará <b>Mañana</b>.',
    },
    error: {
      delivery: 'Desafortunadamente el paquete no esta disponible.',
    },
  },
  FRA: {
    delivery: 'Livraison',
    more: 'Montre plus...',
    orderNo: 'Commande',
    predictions: {
      OutForDelivery: 'Le colis arrivera <b>aujourd\'hui</b>.',
      DestinationDeliveryCenter: 'Le colis arrivera <b>demain</b>.',
    },
    error: {
      delivery: 'Malheureusement , cette livraison ne sont pas disponibles.',
    },
  },
  ITA: {
    delivery: 'Consegna',
    more: 'Mostra di più...',
    orderNo: 'Ordine',
    predictions: {
      OutForDelivery: 'Il pacchetto arriverà <b>oggi</b>.',
      DestinationDeliveryCenter: 'Il pacchetto arriverà <b>domani</b>.',
    },
    error: {
      delivery: 'Purtroppo , questa consegna non è disponibile .',
    },
  },
  NLD: {
    delivery: 'Levering',
    more: 'Vis mere...',
    orderNo: 'Bestille',
    predictions: {
      OutForDelivery: 'Het pakket zal <b>vandaag</b> aankomen.',
      DestinationDeliveryCenter: 'Het pakket komt <b>morgen</b>.',
    },
    error: {
      delivery: 'Desværre er dette leverance er ikke tilgængelig.',
    },
  },
  DNK: {
    delivery: 'Levering',
    more: 'Se mere...',
    orderNo: 'Bestilling',
    predictions: {
      OutForDelivery: 'Den pakke ankommer <b>i dag</b>.',
      DestinationDeliveryCenter: 'Den pakke ankommer <b>i morgen</b>.',
    },
    error: {
      delivery: 'Desværre er dette leverance er ikke tilgængelig.',
    },
  },
  SWE: {
    delivery: 'Leverans',
    more: 'Se mer...',
    orderNo: 'Beställa',
    predictions: {
      OutForDelivery: 'Paketet kommer fram <b>i dag</b>.',
      DestinationDeliveryCenter: 'Paketet kommer fram <b>i morgon</b>.',
    },
    error: {
      delivery: 'Tyvärr är inte denna leverans.',
    },
  },
  FIN: {
    delivery: 'Toimitus',
    more: 'Katso lisää...',
    orderNo: 'Tilata',
    predictions: {
      OutForDelivery: 'Paketti saapuu <b>tänään</b>.',
      DestinationDeliveryCenter: 'Paketti saapuu <b>huomenna</b>.',
    },
    error: {
      delivery: 'Valitettavasti tämä toimitus ei ole käytettävissä.',
    },
  },
  NOR: {
    delivery: 'Levering',
    more: 'Se mer...',
    orderNo: 'Rekkefølge',
    predictions: {
      OutForDelivery: 'Pakken kommer <b>i dag</b>.',
      DestinationDeliveryCenter: 'Pakken kommer <b>i morgen</b>.',
    },
    error: {
      delivery: 'Dessverre er denne leveransen ikke tilgjengelig.',
    },
  },

};

var langIds = {
  '#result-ticket': {
    type: 'empty',
    value: 'empty',
  },
  '#parcelLab-heading': {
    type: 'data',
    value: 'h1',
  },
  '#shipper': {
    type: 'data',
    value: 'shipper',
  },
  '#btn-ask': {
    type: 'data',
    value: 'ask',
  },
  '#txt-ask': {
    type: 'data',
    value: 'anyquestion',
    attr: 'placeholder',
  },
  '#last_checkpoint': {
    type: 'data',
    value: 'predictions',
    subtarget: 'this',
    sub: 'value',
  },
  '#prediction_text': {
    type: 'text',
    value: 'txt-prediction',
  },
  '.versandstatushelpbutton a': {
    type: 'data',
    value: 'help',
    subTarget: 'data',
    sub: 'text_help_btn',
  },
};

var listenBlocks = [{
  name: '#footnote',
  type: 'parcellab',
}, {
  name: '#parcelLab-sender',
  type: 'shop',
  target: '.parcelLab-main-sender a',
}, {
  name: '#parcelLab-sender',
  type: 'social',
  target: '.parcelLab-social a',
}, {
  name: '#parcelLab-faq',
  type: 'faq',
}, ];

module.exports = {
  listenBlocks: listenBlocks,
  translations: translations,
  languages: languages,
  socialIcons: socialIcons,
  courierNames: courierNames,
  transitStates: transitStates,
  langIds: langIds,
};
