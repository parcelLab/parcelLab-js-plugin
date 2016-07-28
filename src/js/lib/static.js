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
    icon: 'https://cdn.parcellab.com/img/flags/es.png'
  },
  fr: {
    name: 'fr',
    label: 'Français',
    code: 'FRA',
    icon: 'https://cdn.parcellab.com/img/flags/fr.png'
  },
  it: {
    name: 'it',
    label: 'Italiano',
    code: 'ITA',
    icon: 'https://cdn.parcellab.com/img/flags/it.png'
  },
  nl: {
    name: 'nl',
    label: 'Nederlands',
    code: 'NLD',
    icon: 'https://cdn.parcellab.com/img/flags/nl.png'
  }
};

var translations = {
  USA: {
    title: 'Delivery Tracking',
    h1: 'Delivery Tracking',
    footnote: 'A service of <a href="https://parcellab.com/">parcelLab GmbH</a> and the shop &bull; <a id="parcelLab_imprintLink" href="#">Terms of Use (German)</a>', //jscs:ignore
    shipper: 'Shop',
    logistic: 'Courier',
    delivery: 'Delivery',
    orderNo: 'Order',
    help: {
      text_help_btn: 'Questions about the delivery?',
    },
    more: 'Show more...',
    ask: 'Inquire',
    anyquestion: 'Questions about shipping?',
    ticketSuccess: '<strong>Thanks for asking!</strong> We will reply to you by email .',
    ticketFail: 'Unfortunately something went wrong. Please try again !',
    emptyMsg: 'The message cannot be empty.',
    predictions: {
      OutForDelivery: 'The package will arrive <b>today</b>.',
      DestinationDeliveryCenter: 'The package will arrive <b>tomorrow</b>.',
    },
    error: {
      delivery: 'Unfortunately, this delivery is not available.',
      shipper: 'Unfortunately, this shipper is not available.',
      logistic: 'Unfortunately, this courier is not available.',
    }
  },
  DEU: {
    title: 'Versandstatus',
    h1: 'Versandstatus',
    footnote: 'Ein Angebot der <a href="https://parcellab.com/">parcelLab GmbH</a> und des Shops &bull; <a id="parcelLab_imprintLink" href="#">Impressum</a>', //jscs:ignore
    shipper: 'Shop',
    logistic: 'Logistiker',
    delivery: 'Lieferung',
    orderNo: 'Auftrag',
    help: {
      text_help_btn: 'Fragen zum Sendungsverlauf?',
    },
    more: 'Gesamten Verlauf anzeigen...',
    ask: 'Nachfragen',
    anyquestion: 'Fragen zum Versand?',
    ticketSuccess: '<strong>Vielen Dank für die Nachfrage!</strong> Wir antworten schnellstmöglich per Email.', //jscs:ignore
    ticketFail: 'Da ist leider etwas schief gelaufen. Bitte erneut probieren!',
    emptyMsg: 'Die Nachricht kann nicht leer sein.',
    predictions: {
      OutForDelivery: 'Die Ware wird noch <b>heute</b> geliefert.',
      DestinationDeliveryCenter: 'Die Ware wird <b>morgen</b> geliefert.',
    },
    error: {
      delivery: 'Diese Sendung liegt leider nicht im System vor.',
      shipper: 'Dieser Shop liegt leider nicht im System vor.',
      logistic: 'Dieser Logistiker liegt leider nicht im System vor.',
    }
  },
  ESP: {
    title: 'Estado del envío.',
    h1: 'Estado del envío.',
    footnote: 'Un servicio de <a href="https://parcellab.com/">parcelLab GmbH</a> y las tiendas &bull; <a id="parcelLab_imprintLink" href="#">Aviso legal(Alemán)</a>', //jscs:ignore
    shipper: 'Tienda',
    logistic: 'Logistiker',
    delivery: 'Entrega',
    orderNo: 'Número de Orden',
    help: {
      text_help_btn: 'Fragen zum Sendungsverlauf?',
    },
    more: 'Ver más...',
    ask: 'Enviar',
    anyquestion: 'Alguna duda?',
    ticketSuccess: '<strong>Gracias por tu duda!</strong> Espera nuestra respuesta por Email.', //jscs:ignore
    ticketFail: 'Desafortunadamente tuvimos un problema. Por favor intenta de nuevo.',
    emptyMsg: 'El mensaje no puede estar vacio.',
    predictions: {
      OutForDelivery: 'El paquete llegará <b>Hoy</b>.',
      DestinationDeliveryCenter: 'El paquete llegará <b>Mañana</b>.',
    },
    error: {
      delivery: 'Desafortunadamente el paquete no esta disponible.',
      shipper: 'Desafortunadamente la información de la tienda no esta disponible.',
      logistic: 'Desafortunadamente la información del transportador no esta disponible.',
    }
  },
  FRA: {
    title: 'Statut d\'expédition',
    h1: 'Statut d\'expédition',
    footnote: 'Une offre de <a href="https://parcellab.com/">parcelLab GmbH</a> et du magasin &bull; <a id="parcelLab_imprintLink" href="#">Mentions légales(German)</a>', //jscs:ignore
    shipper: 'Magasin',
    delivery: 'Livraison',
    orderNo: 'Commande',
    help: {
      text_help_btn: 'Questions sur la livraison ?',
    },
    more: 'Montre plus...',
    ask: 'Renseigner',
    anyquestion: 'Questions sur l\'expédition ?',
    ticketSuccess: '<strong>Merci d\'avoir posé la question!</strong> Nous vous répondrons par email.',
    ticketFail: 'Malheureusement, quelque chose a mal tourné. Veuillez réessayer !',
    emptyMsg: 'Le message ne ​​peut être vide .',
    predictions: {
      OutForDelivery: 'Le colis arrivera <b>aujourd\'hui</b>.',
      DestinationDeliveryCenter: 'Le colis arrivera <b>demain</b>.',
    },
    error: {
      delivery: 'Malheureusement , cette livraison ne sont pas disponibles.',
      shipper: 'Malheureusement , cet expéditeur ne sont pas disponibles.',
      logistic: 'Malheureusement , ce courrier ne sont pas disponibles.',
    }
  },
  ITA: {
    title: 'Stato della spedizione',
    h1: 'Stato della spedizione',
    footnote: 'Un\'offerta di <a href="https://parcellab.com/">parcelLab GmbH</a> e del negozio & bull; <a id="parcelLab_imprintLink" href="#">impressum(German)</a>', //jscs:ignore
    shipper: 'Negozio',
    delivery: 'Consegna',
    orderNo: 'Ordine',
    help: {
      text_help_btn: 'Domande su consegna?',
    },
    more: 'Mostra di più...',
    ask: 'chiedere informazioni',
    anyquestion: 'Domande sulla spedizione ?',
    ticketSuccess: '<strong>Grazie per la domanda !</strong> Risponderemo a voi via e-mail .',
    ticketFail: 'Purtroppo qualcosa è andato storto . Riprova !',
    emptyMsg: 'Il messaggio non può essere vuoto .',
    predictions: {
      OutForDelivery: 'Il pacchetto arriverà <b>oggi</b>.',
      DestinationDeliveryCenter: 'Il pacchetto arriverà <b>domani</b>.',
    },
    error: {
      delivery: 'Purtroppo , questa consegna non è disponibile .',
      shipper: 'Purtroppo , questo caricatore non è disponibile .',
      logistic: 'Purtroppo , questo corriere non è disponibile .',
    }
  },
  NLD: {
    title: 'Verzendingstatus',
    h1: 'Verzendingstatus',
    footnote: 'Een aanbieding van de <a href="https://parcellab.com/">parcelLab GmbH</a> en van de winkel &bull; <a id="parcelLab_imprintLink" href="#"> Impressum(German)</a>', //jscs:ignore
    shipper: 'Winkel',
    delivery: 'Levering',
    orderNo: 'Bestille',
    help: {
      text_help_btn: 'Spørgsmål om levering ?',
    },
    more: 'Vis mere...',
    ask: 'Spørge',
    anyquestion: 'Spørgsmål om forsendelse ?',
    ticketSuccess: '<strong>Tak fordi du spurgte!</strong> Vi vil svare dig via e-mail .',
    ticketFail: 'Desværre gik noget galt . Prøv igen !',
    emptyMsg: 'Budskabet kan ikke være tom .',
    predictions: {
      OutForDelivery: 'Pakken vil ankomme <b>i dag</b>.',
      DestinationDeliveryCenter: 'Pakken vil ankomme <b>i morgen</b>.',
    },
    error: {
      delivery: 'Desværre er dette leverance er ikke tilgængelig .',
      shipper: 'Desværre er dette afskiber er ikke tilgængelig .',
      logistic: 'Desværre er dette kurér er ikke tilgængelig .',
    }
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
  }
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
