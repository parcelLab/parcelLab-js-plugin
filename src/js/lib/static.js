const transitStates = {
  OrderProcessed: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
  },
  Pending: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
  },
  PickUpScheduled: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
  },
  Upgrade: {
    icon: 'info_truck',
    color: '#3378B9',
  },
  InboundScan: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  InTransit: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  ExportHub: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  ImportHub: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  DestinationDeliveryCenter: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  DestinationDeliveryDepot: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  OutForDelivery: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
  },
  Rerouted: {
    icon: 'warning_truck',
  },
  FailedAttemptFirst: {
    icon: 'warning_truck',
    color: '#E59400',
    alert: 'warning',
  },
  FailedAttemptSecond: {
    icon: 'warning_truck',
    color: '#E59400',
    alert: 'warning',
  },
  FailedAttemptFinal: {
    icon: 'warning_truck',
    color: '#DB524B',
    alert: 'danger',
  },
  PickupReadyToday: {
    icon: 'map',
    color: '#58B957',
    alert: 'success_standard',
  },
  PickupReadyNextDay: {
    icon: 'map',
    color: '#58B957',
    alert: 'success_standard',
  },
  Delivered: {
    icon: 'success_standard',
    xmas_icon: 'christmas_tree',
    color: '#58B957',
    alert: 'success',
  },
  Exception: {
    icon: 'warning_truck',
    color: '#DB524B',
    alert: 'danger',
  },
  Stored: {
    icon: 'info_truck',
    percentage: '50',
  },
  Return: {
    icon: 'return',
    color: '#DB524B',
    alert: 'danger',
  },
  default: {
    icon: 'info_truck',
    xmas_icon: 'christmas_sleigh',
  },
}

const getIconName = (tStatus, xmas=false) => {
  const type = xmas ? 'xmas_icon' : 'icon'
  if (transitStates[tStatus]) {
    return transitStates[tStatus][type] || transitStates[tStatus]['icon']
  } else return xmas ? transitStates.default.xmas_icon : transitStates.default.icon
}

const courierNames = {
  'dhl-germany': 'DHL',
  'hermes-de': 'Hermes',
  'dpd-de': 'DPD',
  ups: 'UPS',
}

const socialIcons = {
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
}

const languages = {
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
  pt: {
    name: 'pt',
    label: 'Português',
    code: 'POR',
    icon: 'https://cdn.parcellab.com/img/flags/pt.png',
  },
  pl: {
    name: 'pl',
    label: 'Polski',
    code: 'POL',
    icon: 'https://cdn.parcellab.com/img/flags/pl.png',
  },
  ro: {
    name: 'ro',
    label: 'Român',
    code: 'RON',
    icon: 'https://cdn.parcellab.com/img/flags/ro.png',
  },
  cs: {
    name: 'cs',
    label: 'Češka',
    code: 'CES',
    icon: 'https://cdn.parcellab.com/img/flags/cz.png',
  },
  hu: {
    name: 'hu',
    label: 'Magyar',
    code: 'HUN',
    icon: 'https://cdn.parcellab.com/img/flags/hu.png',
  },
}

const translations = {
  en: {
    delivery: 'Delivery',
    more: 'Show more...',
    orderNo: 'Order',
    predictions: {
      OutForDelivery: 'The package will arrive <b>today</b>.',
      DestinationDeliveryCenter: 'The package will arrive <b>tomorrow</b>.',
    },
    openingHours: 'Opening hours',
    weekDays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    alwaysOpened: '24h opened',
    closesIn: 'Closes in about',
    opensIn: 'Opens in about',
    error: {
      delivery: 'Unfortunately, this delivery is not available.',
      search: 'Unfortunately, no information was found for this delivery.',
    },
    searchOrder: 'Search order',
    zip: 'Zip code',
    search: 'Search',
    containsOf: 'consists of',
    deliveries: 'deliveries',
    showPickuplocation: 'Show pickup location',
    articleList: 'Item list',
    deliveryAddress: 'Delivery address',
  },
  de: {
    delivery: 'Lieferung',
    more: 'Mehr anzeigen...',
    orderNo: 'Bestellung',
    predictions: {
      OutForDelivery: 'Die Ware wird noch <b>heute</b> geliefert.',
      DestinationDeliveryCenter: 'Die Ware wird <b>morgen</b> geliefert.',
    },
    openingHours: 'Öffnungszeiten',
    weekDays: [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ],
    alwaysOpened: 'Durchgehend geöffnet',
    closesIn: 'Schließt in ungefähr',
    opensIn: 'Öffnet in ungefähr',
    error: {
      delivery: 'Diese Sendung liegt leider nicht im System vor.',
      search: 'Leider liegen uns aktuell keine Sendungsdetails zu dieser Bestellung vor.',
    },
    searchOrder: 'Bestellung suchen',
    zip: 'PLZ',
    search: 'Suchen',
    containsOf: 'besteht aus',
    deliveries: 'Lieferungen',
    showPickuplocation: 'Abholort anzeigen',
    articleList: 'Artikelliste',
    deliveryAddress: 'Zustelladresse',
  },
  es: {
    delivery: 'Entrega',
    more: 'Ver más...',
    orderNo: 'Número de Orden',
    predictions: {
      OutForDelivery: 'El paquete llegará <b>Hoy</b>.',
      DestinationDeliveryCenter: 'El paquete llegará <b>Mañana</b>.',
    },
    openingHours: 'Horario de apertura',
    weekDays: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    alwaysOpened: 'Abierto todo el día',
    closesIn: 'se cierra en',
    opensIn: 'abre en',
    error: {
      delivery: 'Desafortunadamente tu paquete no esta disponible.',
      search: 'Desafortunadamente tu paquete no esta disponible.',
    },
    searchOrder: 'Búsqueda del envío',
    search: 'Buscar',
    containsOf: 'consiste en',
    deliveries: 'entregas',
    showPickuplocation: 'Lugar de recogida',
    articleList: 'Lista de articulos',
    deliveryAddress: 'Dirección de entrega',
  },
  fr: {
    delivery: 'Livraison',
    more: 'Voir les étapes précédentes...',
    orderNo: 'Commande',
    predictions: {
      OutForDelivery: "Le colis arrivera <b>aujourd'hui</b>.",
      DestinationDeliveryCenter: 'Le colis arrivera <b>demain</b>.',
    },
    openingHours: "Heures d'ouverture",
    weekDays: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    alwaysOpened: 'Ouvert toute la journée',
    closesIn: 'ferme en',
    opensIn: 'ouvre dans',
    error: {
      delivery: "Malheureusement, ce numéro de colis ou de commande n'est pas valide.",
      search: "Malheureusement, ce numéro de colis ou de commande n'est pas valide.",
    },
    searchOrder: 'Rechercher la commande',
    search: 'Chercher',
    containsOf: 'consiste en',
    deliveries: 'livraisons',
    showPickuplocation: 'Lieu de retrait',
    articleList: 'Liste des articles',
    deliveryAddress: 'Adresse de livraison',
  },
  it: {
    delivery: 'Consegna',
    more: 'Mostra di più...',
    orderNo: 'Numero ordine',
    predictions: {
      OutForDelivery: 'Il pacchetto arriverà <b>oggi</b>.',
      DestinationDeliveryCenter: 'Il pacchetto arriverà <b>domani</b>.',
    },
    openingHours: 'Orari di apertura',
    weekDays: [
      'Domenica',
      'Lunedi',
      'Martedì',
      'Mercoledì',
      'Giovedi',
      'Venerdì',
      'Sabato',
    ],
    alwaysOpened: 'Aperto tutto il giorno',
    closesIn: 'chiude alle',
    opensIn: 'Apre alle',
    error: {
      delivery: 'Purtroppo non abbiamo dati per questa consegna',
      search: 'Purtroppo non abbiamo dati per questa consegna',
    },
    searchOrder: "cerca l'ordine",
    search: 'Ricerca',
    containsOf: 'consiste in',
    deliveries: 'consegne',
    showPickuplocation: 'Mostra punto di ritiro',
    articleList: 'Elenco degli articoli',
    deliveryAddress: 'Indirizzo di consegna',
  },
  nl: {
    delivery: 'Levering',
    more: 'Bekijk meer...',
    orderNo: 'Bestelling',
    predictions: {
      OutForDelivery: 'Het pakket zal <b>vandaag</b> aankomen.',
      DestinationDeliveryCenter: 'Het pakket komt <b>morgen</b>.',
    },
    openingHours: 'Openingstijden',
    weekDays: [
      'Zondag',
      'Maandag',
      'Dinsdag',
      'Woensdag',
      'Donderdag',
      'Vrijdag',
      'Zaterdag',
    ],
    alwaysOpened: 'De hele dag geopend',
    closesIn: 'Sluit om',
    opensIn: 'Opent om',
    error: {
      delivery: 'Helaas is de levering niet bekend.',
      search: 'Helaas is de levering niet bekend.',
    },
    searchOrder: 'Zoek order',
    search: 'Zoeken',
    containsOf: 'bestaat uit',
    deliveries: 'leveringen',
    showPickuplocation: 'Afhaalpunt',
    articleList: 'Artikellijst',
    deliveryAddress: 'Bezorgadres',
  },
  da: {
    delivery: 'Levering',
    more: 'Se mere...',
    orderNo: 'Ordre',
    predictions: {
      OutForDelivery: 'Pakken ankommer <b>i dag</b>.',
      DestinationDeliveryCenter: 'Pakken ankommer <b>i morgen</b>.',
    },
    openingHours: 'Åbningstider',
    weekDays: [
      'Søndag',
      'Mandag',
      'Tirsdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lørdag',
    ],
    alwaysOpened: 'Døgnåbent',
    closesIn: 'Lukker om',
    opensIn: 'Åbner om',
    error: {
      delivery: 'Beklageligvis er leveringen ikke tilgængelig.',
      search: 'Beklageligvis er leveringen ikke tilgængelig.',
    },
    searchOrder: 'Søg ordre',
    search: 'Søg',
    containsOf: 'består af',
    deliveries: 'leveringer',
    showPickuplocation: 'Vis leveringssted',
    articleList: 'Artikelliste',
    deliveryAddress: 'Leveringsadresse',
  },
  sv: {
    delivery: 'Leverans',
    more: 'Se mer...',
    orderNo: 'Beställning',
    predictions: {
      OutForDelivery: 'Paketet kommer fram <b>i dag</b>.',
      DestinationDeliveryCenter: 'Paketet kommer fram <b>i morgon</b>.',
    },
    openingHours: 'Öppettider',
    weekDays: [
      'Söndag',
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lörda',
    ],
    alwaysOpened: 'Öppet hela dagen',
    closesIn: 'stänger om',
    opensIn: 'öppnas om',
    error: {
      delivery: 'Tyvärr är inte denna leverans tillgänglig.',
      search: 'Tyvärr är inte denna leverans tillgänglig.',
    },
    searchOrder: 'Sök order',
    search: 'Sök',
    containsOf: 'består av',
    deliveries: 'leveranser',
    showPickuplocation: 'Visa leveranstid',
    articleList: 'Artikellista',
    deliveryAddress: 'Leveransadress',
  },
  fi: {
    delivery: 'Toimitus',
    more: 'Katso lisää...',
    orderNo: 'Tilaus',
    predictions: {
      OutForDelivery: 'Paketti saapuu <b>tänään</b>.',
      DestinationDeliveryCenter: 'Paketti saapuu <b>huomenna</b>.',
    },
    openingHours: 'Aukioloajat',
    weekDays: [
      'Sunnuntai',
      'Maanantai',
      'Tiistai',
      'Keskiviikko',
      'Torstai',
      'Perjantai',
      'Lautai',
    ],
    alwaysOpened: 'Avoinna koko päivän',
    closesIn: 'sulkeutuu',
    opensIn: 'avautuu',
    error: {
      delivery: 'Valitettavasti tämä toimitus ei ole saatavilla järjestelmässä.',
      search: 'Valitettavasti tämä toimitus ei ole saatavilla järjestelmässä.',
    },
    searchOrder: 'Hae tilausta',
    search: 'Hae',
    containsOf: 'koostuu',
    deliveries: 'toimituksesta',
    showPickuplocation: 'Näytä noutopiste',
    articleList: 'Artikkeliluettelo',
    deliveryAddress: 'Toimitusosoite',
  },
  no: {
    delivery: 'Levering',
    more: 'Se mer...',
    orderNo: 'Bestilling',
    predictions: {
      OutForDelivery: 'Pakken kommer fram <b>i dag</b>.',
      DestinationDeliveryCenter: 'Pakken kommer fram <b>i morgen</b>.',
    },
    openingHours: 'Åpningstider',
    weekDays: [
      'Søndag',
      'Mandag',
      'Tirsdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lørdag',
    ],
    alwaysOpened: 'Åpent hele dagen',
    closesIn: 'stenger om',
    opensIn: 'åpner om',
    error: {
      delivery: 'Dessverre er denne leveransen ikke tilgjengelig.',
      search: 'Dessverre er denne leveransen ikke tilgjengelig.',
    },
    searchOrder: 'Søk etter bestilling',
    search: 'Søk',
    containsOf: 'inneholder',
    deliveries: 'leveranser',
    showPickuplocation: 'vis hentested',
    articleList: 'Artikkelliste',
    deliveryAddress: 'Leveringsadresse',
  },
  pt: {
    delivery: 'Entrega',
    more: 'Ver mais...',
    orderNo: 'Ordem',
    predictions: {
      OutForDelivery: 'O pacote chegará hoje.',
      DestinationDeliveryCenter: 'O pacote chegará amanhã.',
    },
    openingHours: 'horário de funcionamento',
    weekDays: [
      'Domingo',
      'Segunda-feira',
      'Terça',
      'quarta-feira',
      'quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
    alwaysOpened: 'Aberto o dia inteiro',
    closesIn: 'fecha em',
    opensIn: 'abre em',
    error: {
      delivery: 'Infelizmente, esta entrega não está disponível.',
      search: 'Infelizmente, esta entrega não está disponível.',
    },
    searchOrder: 'ordem de pesquisa',
    search: 'Pesquisa',
    containsOf: 'consiste em',
    deliveries: 'entregas',
    showPickuplocation: 'Opsamlingssted',
    articleList: 'Lista de artigos',
    deliveryAddress: 'Endereço de entrega',
  },
  pl: {
    delivery: 'Dostawa',
    more: 'Pokaż więcej...',
    orderNo: 'Zamówienie',
    predictions: {
      OutForDelivery: 'Paczka zostanie doręczona jeszcze <b>dziś</b>.',
      DestinationDeliveryCenter: 'Paczka zostanie doręczona <b>jutro</b>.',
    },
    openingHours: 'Godziny otwarcia',
    weekDays: [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota',
    ],
    alwaysOpened: 'Otwarte bez przerw',
    closesIn: 'zamyka za',
    opensIn: 'otwiera za',
    error: {
      delivery: 'Niestety, ta paczka nie znajduje się w systemie.',
      search: 'Niestety, ta paczka nie znajduje się w systemie.',
    },
    searchOrder: 'szukaj zamówienia',
    search: 'Szukaj',
    containsOf: 'składa się z',
    deliveries: 'przesyłek',
    showPickuplocation: 'Pokaż punkt odbioru',
    articleList: 'Lista artykułów',
    deliveryAddress: 'Adres dostawy',
  },
  ro: {
    delivery: 'Livrare',
    more: 'Arată mai multe...',
    orderNo: 'Comandă',
    predictions: {
      OutForDelivery: 'Pachetul va sosi <b>astăzi</b>.',
      DestinationDeliveryCenter: 'Pachetul va sosi <b>mâine</b>.',
    },
    openingHours: 'Ore de deschidere',
    weekDays: [
      'Duminică',
      'Luni',
      'Marţi',
      'Miercuri',
      'Joi',
      'Vineri',
      'Sâmbătă',
    ],
    alwaysOpened: 'Deschis toată ziua',
    closesIn: 'Se închide în',
    opensIn: 'Se va deschide',
    error: {
      delivery: 'Din păcate, această livrare nu este disponibil.',
      search: 'Din păcate, această livrare nu este disponibil.',
    },
    searchOrder: 'ordinea de căutare',
    search: 'Căutare',
    containsOf: 'este format din',
    deliveries: 'livrări',
    showPickuplocation: 'Noutopaikka',
    articleList: 'Lista de articole',
    deliveryAddress: 'Adresă de livrare',
  },
  cs: {
    delivery: 'Doručení',
    more: 'Ukázat více...',
    orderNo: 'Objednávka',
    predictions: {
      OutForDelivery: 'Zásilka bude doručena <b>dnes</b>.',
      DestinationDeliveryCenter: 'Zásilka bude doručena <b>zítra</b>.',
    },
    openingHours: 'Otevírací doba',
    weekDays: [
      'Neděle',
      'Pondělí',
      'Úterý',
      'Středa',
      'Čtvrtek',
      'Pátek',
      'Sobota',
    ],
    alwaysOpened: '24h otevřeno',
    closesIn: 'Zavírá za',
    opensIn: 'Otevírá za',
    error: {
      delivery: 'Tato zásilka se bohužel nenachází v systému.',
      search: 'Tato zásilka se bohužel nenachází v systému.',
    },
    searchOrder: 'Hledat objednávku',
    search: 'Hledat',
    containsOf: 'Skládá se z',
    deliveries: 'Doručení',
    showPickuplocation: 'Zobrazit výdejní místo',
    articleList: 'Seznam článků',
    deliveryAddress: 'Doručovací adresa',
  },
  hu: {
    delivery: 'Szállítás',
    more: 'Részletek...',
    orderNo: 'Rendelés',
    predictions: {
      OutForDelivery: 'Csomag érkezik <b>a mai napon</b>.',
      DestinationDeliveryCenter: 'Csomag érkezik <b>a következő munkanapon</b>.',
    },
    openingHours: 'Otevírací doba',
    weekDays: [
      'Vasárnap',
      'Hétfő',
      'Kedd',
      'Szerda',
      'Csütörtök',
      'Péntek',
      'Szombat',
    ],
    alwaysOpened: 'Éjjel-nappal nyitva',
    closesIn: 'Zárás',
    opensIn: 'Nyitva',
    error: {
      delivery: 'Sajnos a szállítmányról nincs információ',
      search: 'Sajnos erről a küldeményről nincs információ',
    },
    searchOrder: 'Küldemény keresése',
    search: 'Keresés',
    containsOf: 'Tartalom',
    deliveries: 'Szállítmányok',
    showPickuplocation: 'Felvétel címe',
    articleList: 'Tételek listázása',
    deliveryAddress: 'Szállítási cím',
  },
}

const langIds = {
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
}

const listenBlocks = [
  {
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
  },
]

module.exports = {
  listenBlocks,
  translations,
  languages,
  socialIcons,
  courierNames,
  transitStates,
  langIds,
  getIconName,
}
