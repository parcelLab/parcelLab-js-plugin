const transitStates = {
  OrderProcessed: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
    easter_icon: 'easter_order_processed'
  },
  Pending: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
    easter_icon: 'easter_order_processed'
  },
  PickUpScheduled: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
    easter_icon: 'easter_order_processed'
  },
  Upgrade: {
    icon: 'info_truck',
    color: '#3378B9',
    easter_icon: 'easter_info_truck'
  },
  InboundScan: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  InTransit: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  ExportHub: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  ImportHub: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  DestinationDeliveryCenter: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  DestinationDeliveryDepot: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  OutForDelivery: {
    icon: 'in_transit',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_in_transit'
  },
  Rerouted: {
    icon: 'warning_truck',
    easter_icon: 'easter_warning_truck'
  },
  FailedAttemptFirst: {
    icon: 'warning_truck',
    color: '#E59400',
    alert: 'warning',
    easter_icon: 'easter_warning_truck'
  },
  FailedAttemptSecond: {
    icon: 'warning_truck',
    color: '#E59400',
    alert: 'warning',
    easter_icon: 'easter_warning_truck'
  },
  FailedAttemptFinal: {
    icon: 'warning_truck',
    color: '#DB524B',
    alert: 'danger',
    easter_icon: 'easter_warning_truck'
  },
  PickupReadyToday: {
    icon: 'map',
    color: '#58B957',
    alert: 'success_standard',
    easter_icon: 'easter_map'
  },
  PickupReadyNextDay: {
    icon: 'map',
    color: '#58B957',
    alert: 'success_standard',
    easter_icon: 'easter_map'
  },
  Delivered: {
    icon: 'success_standard',
    xmas_icon: 'christmas_tree',
    color: '#58B957',
    alert: 'success',
    easter_icon: 'easter_delivered'
  },
  Exception: {
    icon: 'warning_truck',
    color: '#DB524B',
    alert: 'danger',
    easter_icon: 'easter_warning_truck'
  },
  Stored: {
    icon: 'info_truck',
    percentage: '50',
    easter_icon: 'easter_info_truck'
  },
  Return: {
    icon: 'return',
    color: '#DB524B',
    alert: 'danger',
    easter_icon: 'easter_return'
  },
  default: {
    icon: 'info_truck',
    xmas_icon: 'christmas_sleigh',
    easter_icon: 'easter_info_truck'
  }
}

const getIconName = (tStatus, theme) => {
  const type = theme ? `${theme}_icon` : 'icon'
  if (transitStates[tStatus]) {
    return transitStates[tStatus][type] || transitStates[tStatus].icon
  } else return transitStates.default[type] || transitStates.default.icon
}

const courierNames = {
  'dhl-germany': 'DHL',
  'hermes-de': 'Hermes',
  'dpd-de': 'DPD',
  ups: 'UPS'
}

const socialIcons = {
  twitter: {
    color: '#55acee'
  },
  instagram: {
    color: '#3f729b'
  },
  facebook: {
    color: '#3b5999'
  },
  'youtube-play': {
    color: '#e52d27'
  },
  'google-plus': {
    color: '#DC4E41'
  },
  xing: {
    color: '#006567'
  },
  pinterest: {
    color: '#bd081c'
  }
}

const languages = {
  de: {
    name: 'de',
    label: 'Deutsch',
    code: 'DEU',
    icon: 'https://cdn.parcellab.com/img/flags/de.png'
  },
  en: {
    name: 'en',
    label: 'English',
    code: 'USA',
    icon: 'https://cdn.parcellab.com/img/flags/us.png'
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
  },
  da: {
    name: 'da',
    label: 'Dansk',
    code: 'DNK',
    icon: 'https://cdn.parcellab.com/img/flags/dk.png'
  },
  sv: {
    name: 'sv',
    label: 'Svenska',
    code: 'SWE',
    icon: 'https://cdn.parcellab.com/img/flags/se.png'
  },
  no: {
    name: 'no',
    label: 'Norsk',
    code: 'NOR',
    icon: 'https://cdn.parcellab.com/img/flags/no.png'
  },
  fi: {
    name: 'fi',
    label: 'Suomalainen',
    code: 'FIN',
    icon: 'https://cdn.parcellab.com/img/flags/fi.png'
  },
  pt: {
    name: 'pt',
    label: 'Português',
    code: 'POR',
    icon: 'https://cdn.parcellab.com/img/flags/pt.png'
  },
  pl: {
    name: 'pl',
    label: 'Polski',
    code: 'POL',
    icon: 'https://cdn.parcellab.com/img/flags/pl.png'
  },
  ro: {
    name: 'ro',
    label: 'Român',
    code: 'RON',
    icon: 'https://cdn.parcellab.com/img/flags/ro.png'
  },
  cs: {
    name: 'cs',
    label: 'Češka',
    code: 'CES',
    icon: 'https://cdn.parcellab.com/img/flags/cz.png'
  },
  sl: {
    name: 'sl',
    label: 'Slovenščina',
    code: 'SLV',
    icon: 'https://cdn.parcellab.com/img/flags/sl.png'
  },
  hr: {
    name: 'hr',
    label: 'Hrvatski Jezik',
    code: 'HRV',
    icon: 'https://cdn.parcellab.com/img/flags/hr.png'
  },
  bg: {
    name: 'bg',
    label: 'български език',
    code: 'BUL',
    icon: 'https://cdn.parcellab.com/img/flags/bg.png'
  },
  sk: {
    name: 'sk',
    label: 'Slovenčina',
    code: 'SLK',
    icon: 'https://cdn.parcellab.com/img/flags/sk.png'
  },
  hu: {
    name: 'hu',
    label: 'Magyar',
    code: 'HUN',
    icon: 'https://cdn.parcellab.com/img/flags/hu.png'
  }
}

const translations = {
  en: {
    delivery: 'Delivery',
    more: 'Show more...',
    orderNo: 'Order',
    predictions: {
      OutForDelivery: 'The package will arrive <b>today</b>.',
      DestinationDeliveryCenter: 'The package will arrive <b>tomorrow</b>.'
    },
    openingHours: 'Opening hours',
    weekDays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    alwaysOpened: '24h opened',
    closesIn: 'Closes in about',
    opensIn: 'Opens in about',
    error: {
      delivery: 'We have not yet received tracking data for your order.',
      search: 'Unfortunately, no information was found for this delivery.'
    },
    searchOrder: 'Search order',
    zip: 'Zip code',
    search: 'Search',
    containsOf: 'consists of',
    deliveries: 'deliveries',
    showPickuplocation: 'Show pickup location',
    liveDelivery: 'Live tracking',
    articleList: 'Articles in this package',
    deliveryAddress: 'Delivery address',
    liveTrackingLastUpdate: 'Last update',
    liveTrackingStationsNext: 'The driver\'s on his way to you.',
    liveTrackingStation: '### stopover',
    liveTrackingStations: '### stopovers',
    liveTrackingCaption: 'until your shipment arrives.',
    liveTrackingCaptionNext: 'You are the next stopover.'
  },
  de: {
    delivery: 'Lieferung',
    more: 'Mehr anzeigen...',
    orderNo: 'Bestellung',
    predictions: {
      OutForDelivery: 'Die Ware wird noch <b>heute</b> geliefert.',
      DestinationDeliveryCenter: 'Die Ware wird <b>morgen</b> geliefert.'
    },
    openingHours: 'Öffnungszeiten',
    weekDays: [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag'
    ],
    alwaysOpened: 'Durchgehend geöffnet',
    closesIn: 'Schließt in ungefähr',
    opensIn: 'Öffnet in ungefähr',
    error: {
      delivery: 'Zu dieser Bestellung liegen noch keine Sendungsdaten vor.',
      search: 'Leider liegen uns aktuell keine Sendungsdetails zu dieser Bestellung vor.'
    },
    searchOrder: 'Bestellung suchen',
    zip: 'PLZ',
    search: 'Suchen',
    containsOf: 'besteht aus',
    deliveries: 'Lieferungen',
    showPickuplocation: 'Abholort anzeigen',
    liveDelivery: 'Live verfolgen',
    articleList: 'Artikel in diesem Paket',
    deliveryAddress: 'Zustelladresse',
    liveTrackingLastUpdate: 'Letztes Update',
    liveTrackingStationsNext: 'Der Fahrer ist auf dem Weg zu dir.',
    liveTrackingStation: 'Noch ### Stopp vor dir',
    liveTrackingStations: 'Noch ### Stopps vor dir',
    liveTrackingCaption: 'bis deine Sendung bei dir ist.',
    liveTrackingCaptionNext: 'Du bist der nächste Stopp.'
  },
  es: {
    delivery: 'Entrega',
    more: 'Ver más...',
    orderNo: 'Número de Orden',
    predictions: {
      OutForDelivery: 'El paquete llegará <b>Hoy</b>.',
      DestinationDeliveryCenter: 'El paquete llegará <b>Mañana</b>.'
    },
    openingHours: 'Horario de apertura',
    weekDays: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    alwaysOpened: 'Abierto todo el día',
    closesIn: 'se cierra en',
    opensIn: 'abre en',
    error: {
      delivery: 'Actualmente no hay de datos de envío disponibles para este pedido.',
      search: 'Desafortunadamente tu paquete no esta disponible.'
    },
    searchOrder: 'Búsqueda del envío',
    search: 'Buscar',
    containsOf: 'consiste en',
    deliveries: 'entregas',
    showPickuplocation: 'Lugar de recogida',
    articleList: 'Artículos en este paquete',
    deliveryAddress: 'Dirección de entrega'
  },
  fr: {
    delivery: 'Livraison',
    more: 'Voir les étapes précédentes...',
    orderNo: 'Commande',
    predictions: {
      OutForDelivery: "Le colis arrivera <b>aujourd'hui</b>.",
      DestinationDeliveryCenter: 'Le colis arrivera <b>demain</b>.'
    },
    openingHours: "Heures d'ouverture",
    weekDays: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ],
    alwaysOpened: 'Ouvert toute la journée',
    closesIn: 'ferme dans',
    opensIn: 'ouvre dans',
    error: {
      delivery: "Aucune information concernant l'expédition disponible pour cette commande.",
      search: "Malheureusement, ce numéro de colis ou de commande n'est pas valide."
    },
    searchOrder: 'Rechercher la commande',
    search: 'Chercher',
    containsOf: 'consiste en',
    deliveries: 'livraisons',
    showPickuplocation: 'Lieu de retrait',
    articleList: 'Articles dans ce paquet',
    deliveryAddress: 'Adresse de livraison'
  },
  it: {
    delivery: 'Consegna',
    more: 'Mostra di più...',
    orderNo: 'Numero ordine',
    predictions: {
      OutForDelivery: 'Il pacchetto arriverà <b>oggi</b>.',
      DestinationDeliveryCenter: 'Il pacchetto arriverà <b>domani</b>.'
    },
    openingHours: 'Orari di apertura',
    weekDays: [
      'Domenica',
      'Lunedi',
      'Martedì',
      'Mercoledì',
      'Giovedi',
      'Venerdì',
      'Sabato'
    ],
    alwaysOpened: 'Aperto tutto il giorno',
    closesIn: 'chiude alle',
    opensIn: 'Apre alle',
    error: {
      delivery: 'Non ci sono ancora informazioni sulla spedizione di questo ordine.',
      search: 'Purtroppo non abbiamo dati per questa consegna.'
    },
    searchOrder: "cerca l'ordine",
    search: 'Ricerca',
    containsOf: 'consiste in',
    deliveries: 'consegne',
    showPickuplocation: 'Mostra punto di ritiro',
    articleList: 'Articoli in questo pacchetto',
    deliveryAddress: 'Indirizzo di consegna'
  },
  nl: {
    delivery: 'Levering',
    more: 'Bekijk meer...',
    orderNo: 'Bestelling',
    predictions: {
      OutForDelivery: 'Het pakket zal <b>vandaag</b> aankomen.',
      DestinationDeliveryCenter: 'Het pakket komt <b>morgen</b>.'
    },
    openingHours: 'Openingstijden',
    weekDays: [
      'Zondag',
      'Maandag',
      'Dinsdag',
      'Woensdag',
      'Donderdag',
      'Vrijdag',
      'Zaterdag'
    ],
    alwaysOpened: 'De hele dag geopend',
    closesIn: 'Sluit over',
    opensIn: 'Opent over',
    error: {
      delivery: 'Voor deze bestelling zijn nog geen track & trace gegevens bekend',
      search: 'Helaas is de levering niet bekend.'
    },
    searchOrder: 'Zoek order',
    search: 'Zoeken',
    containsOf: 'bestaat uit',
    deliveries: 'leveringen',
    showPickuplocation: 'Afhaalpunt',
    articleList: 'Items in dit pakket',
    deliveryAddress: 'Bezorgadres'
  },
  da: {
    delivery: 'Levering',
    more: 'Se mere...',
    orderNo: 'Ordre',
    predictions: {
      OutForDelivery: 'Pakken ankommer <b>i dag</b>.',
      DestinationDeliveryCenter: 'Pakken ankommer <b>i morgen</b>.'
    },
    openingHours: 'Åbningstider',
    weekDays: [
      'Søndag',
      'Mandag',
      'Tirsdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lørdag'
    ],
    alwaysOpened: 'Døgnåbent',
    closesIn: 'Lukker om',
    opensIn: 'Åbner om',
    error: {
      delivery: 'Der findes endnu ingen leveringsinformationer til denne bestilling.',
      search: 'Beklageligvis er leveringen ikke tilgængelig.'
    },
    searchOrder: 'Søg ordre',
    search: 'Søg',
    containsOf: 'består af',
    deliveries: 'leveringer',
    showPickuplocation: 'Vis leveringssted',
    articleList: 'Varer i denne pakke',
    deliveryAddress: 'Leveringsadresse'
  },
  sv: {
    delivery: 'Leverans',
    more: 'Se mer...',
    orderNo: 'Beställning',
    predictions: {
      OutForDelivery: 'Paketet kommer fram <b>i dag</b>.',
      DestinationDeliveryCenter: 'Paketet kommer fram <b>i morgon</b>.'
    },
    openingHours: 'Öppettider',
    weekDays: [
      'Söndag',
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lörda'
    ],
    alwaysOpened: 'Öppet hela dagen',
    closesIn: 'stänger om',
    opensIn: 'öppnas om',
    error: {
      delivery: 'Beställningen har ännu inte tilldelats något kollinummer.',
      search: 'Tyvärr är inte denna leverans tillgänglig.'
    },
    searchOrder: 'Sök order',
    search: 'Sök',
    containsOf: 'består av',
    deliveries: 'leveranser',
    showPickuplocation: 'Visa leveranstid',
    articleList: 'Objekt i detta paket',
    deliveryAddress: 'Leveransadress'
  },
  fi: {
    delivery: 'Toimitus',
    more: 'Katso lisää...',
    orderNo: 'Tilaus',
    predictions: {
      OutForDelivery: 'Paketti saapuu <b>tänään</b>.',
      DestinationDeliveryCenter: 'Paketti saapuu <b>huomenna</b>.'
    },
    openingHours: 'Aukioloajat',
    weekDays: [
      'Sunnuntai',
      'Maanantai',
      'Tiistai',
      'Keskiviikko',
      'Torstai',
      'Perjantai',
      'Lautai'
    ],
    alwaysOpened: 'Avoinna koko päivän',
    closesIn: 'sulkeutuu',
    opensIn: 'avautuu',
    error: {
      delivery: 'Tästä tilauksesta ei ole vielä lähetystietoja.',
      search: 'Valitettavasti tämä toimitus ei ole saatavilla järjestelmässä.'
    },
    searchOrder: 'Hae tilausta',
    search: 'Hae',
    containsOf: 'koostuu',
    deliveries: 'toimituksesta',
    showPickuplocation: 'Näytä noutopiste',
    articleList: 'Tuotteet tässä paketissa',
    deliveryAddress: 'Toimitusosoite'
  },
  no: {
    delivery: 'Levering',
    more: 'Se mer...',
    orderNo: 'Bestilling',
    predictions: {
      OutForDelivery: 'Pakken kommer fram <b>i dag</b>.',
      DestinationDeliveryCenter: 'Pakken kommer fram <b>i morgen</b>.'
    },
    openingHours: 'Åpningstider',
    weekDays: [
      'Søndag',
      'Mandag',
      'Tirsdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lørdag'
    ],
    alwaysOpened: 'Åpent hele dagen',
    closesIn: 'stenger om',
    opensIn: 'åpner om',
    error: {
      delivery: 'Vi har ennå ikke mottatt sendingsopplysninger tilknyttet denne bestillingen.',
      search: 'Dessverre er denne leveransen ikke tilgjengelig.'
    },
    searchOrder: 'Søk etter bestilling',
    search: 'Søk',
    containsOf: 'inneholder',
    deliveries: 'leveranser',
    showPickuplocation: 'vis hentested',
    articleList: 'Varer i denne pakken',
    deliveryAddress: 'Leveringsadresse'
  },
  pt: {
    delivery: 'Entrega',
    more: 'Ver mais...',
    orderNo: 'Ordem',
    predictions: {
      OutForDelivery: 'O pacote chegará hoje.',
      DestinationDeliveryCenter: 'O pacote chegará amanhã.'
    },
    openingHours: 'horário de funcionamento',
    weekDays: [
      'Domingo',
      'Segunda-feira',
      'Terça',
      'quarta-feira',
      'quinta-feira',
      'Sexta-feira',
      'Sábado'
    ],
    alwaysOpened: 'Aberto o dia inteiro',
    closesIn: 'fecha em',
    opensIn: 'abre em',
    error: {
      delivery: 'Infelizmente, esta entrega não está disponível.',
      search: 'Infelizmente, esta entrega não está disponível.'
    },
    searchOrder: 'ordem de pesquisa',
    search: 'Pesquisa',
    containsOf: 'consiste em',
    deliveries: 'entregas',
    showPickuplocation: 'Opsamlingssted',
    articleList: 'Artigos neste pacote',
    deliveryAddress: 'Endereço de entrega'
  },
  pl: {
    delivery: 'Dostawa',
    more: 'Pokaż więcej...',
    orderNo: 'Zamówienie',
    predictions: {
      OutForDelivery: 'Paczka zostanie doręczona jeszcze <b>dziś</b>.',
      DestinationDeliveryCenter: 'Paczka zostanie doręczona <b>jutro</b>.'
    },
    openingHours: 'Godziny otwarcia',
    weekDays: [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota'
    ],
    alwaysOpened: 'Otwarte bez przerw',
    closesIn: 'zamyka za',
    opensIn: 'otwiera za',
    error: {
      delivery: 'Nie wprowadzono jeszcze do systemu informacji o tej przesyłce.',
      search: 'Niestety, ta paczka nie znajduje się w systemie.'
    },
    searchOrder: 'szukaj zamówienia',
    search: 'Szukaj',
    containsOf: 'składa się z',
    deliveries: 'przesyłek',
    showPickuplocation: 'Pokaż punkt odbioru',
    articleList: 'Artykuły w tym pakiecie',
    deliveryAddress: 'Adres dostawy'
  },
  ro: {
    delivery: 'Livrare',
    more: 'Arată mai multe...',
    orderNo: 'Comandă',
    predictions: {
      OutForDelivery: 'Pachetul va sosi <b>astăzi</b>.',
      DestinationDeliveryCenter: 'Pachetul va sosi <b>mâine</b>.'
    },
    openingHours: 'Ore de deschidere',
    weekDays: [
      'Duminică',
      'Luni',
      'Marţi',
      'Miercuri',
      'Joi',
      'Vineri',
      'Sâmbătă'
    ],
    alwaysOpened: 'Deschis toată ziua',
    closesIn: 'Se închide în',
    opensIn: 'Se va deschide',
    error: {
      delivery: 'Din păcate, această livrare nu este disponibil.',
      search: 'Din păcate, această livrare nu este disponibil.'
    },
    searchOrder: 'ordinea de căutare',
    search: 'Căutare',
    containsOf: 'este format din',
    deliveries: 'livrări',
    showPickuplocation: 'Noutopaikka',
    articleList: 'Articole din acest pachet',
    deliveryAddress: 'Adresă de livrare'
  },
  cs: {
    delivery: 'Zásilka',
    more: 'Zobrazit více ...',
    orderNo: 'Objednávka',
    predictions: {
      OutForDelivery: 'Zásilka bude doručena <b>dnes</b>.',
      DestinationDeliveryCenter: 'Zásilka bude doručena <b>zítra</b>.'
    },
    openingHours: 'Otevírací doba',
    weekDays: [
      'Neděle',
      'Pondělí',
      'Úterý',
      'Středa',
      'Čtvrtek',
      'Pátek',
      'Sobota'
    ],
    alwaysOpened: 'Otevřeno 24 hod.',
    closesIn: 'Zavřeno od',
    opensIn: 'Otevřeno od',
    error: {
      delivery: 'Je nám líto, ale tato zásilka není k dispozici.',
      search: 'Pro tuto zásilku nebyly nalezeny žádné informace.'
    },
    searchOrder: 'Hledat objednávku',
    search: 'Hledat',
    containsOf: 'Sestává z',
    deliveries: 'Zásilek',
    showPickuplocation: 'Zobrazit místo odběru',
    articleList: 'Seznam zboží',
    deliveryAddress: 'Adresa doručení'
  },
  sl: {
    delivery: 'Dostava',
    more: 'Podrobnosti...',
    orderNo: 'Naročilo',
    predictions: {
      OutForDelivery: 'Paket bo dostavljen še <b>danes</b>.',
      DestinationDeliveryCenter: 'Paket bo dostavljen <b>jutri</b>.'
    },
    openingHours: 'Odpiralni čas',
    weekDays: [
      'Nedelja',
      'Ponedeljek',
      'Torek',
      'Sreda',
      'Četrtek',
      'Petek',
      'Sobota'
    ],
    alwaysOpened: 'Odprto vse skozi',
    closesIn: 'Zapre se približno čez',
    opensIn: 'Odpre se približno čez',
    error: {
      delivery: 'Za to naročilo še ni na voljo številke za sledenje.',
      search: 'Žal trenutni nimamo na voljo številke za sledenje za to naročilo.'
    },
    searchOrder: 'Išči naročilo',
    zip: 'PTT',
    search: 'Išči',
    containsOf: 'je sestavljeno iz',
    deliveries: 'Dostava',
    showPickuplocation: 'Prikaže kraj prevzema',
    liveDelivery: 'Sledenje v živo',
    articleList: 'Izdelek v tem paketu',
    deliveryAddress: 'Naslov za dostavo'
  },
  hr: {
    delivery: 'Dostava',
    more: 'Prikaži više...',
    orderNo: 'Narudžba',
    predictions: {
      OutForDelivery: 'Paket će biti dostavljen još <b>danas</b>.',
      DestinationDeliveryCenter: 'Paket će biti dostavljen <b>sutra</b>.'
    },
    openingHours: 'Radno vrijeme',
    weekDays: [
      'Nedelja',
      'Ponedeljak',
      'Utorak',
      'Srijeda',
      'Četvrtak',
      'Petak',
      'Subota'
    ],
    alwaysOpened: 'Otvoreno cijeli dan',
    closesIn: 'Zatvara se otprilike u:',
    opensIn: 'Otvara se otprilike u:',
    error: {
      delivery: 'Ova narudžba još nema broja za online pračenje pošiljke.',
      search: 'Nažalost, trenutno broj za online pračenje pošiljke nije dostupan.'
    },
    searchOrder: 'Traži narudžbu',
    zip: 'Poštanski broj',
    search: 'Traži',
    containsOf: 'sastoji se od',
    deliveries: 'Dostava',
    showPickuplocation: 'Prikaz lokacije preuzimanja',
    liveDelivery: 'Online pračenje',
    articleList: 'Proizvodi u ovom paketu',
    deliveryAddress: 'Adresa za dostavu'
  },
  bg: {
    delivery: 'Доставка',
    more: 'Научи повече...',
    orderNo: 'Поръчка',
    predictions: {
      OutForDelivery: 'Стоките ще бъдат доставени още <b>днес</b>.',
      DestinationDeliveryCenter: 'Стоките ще бъдат доставени <b>утре</b>.'
    },
    openingHours: 'Работно време',
    weekDays: [
      'неделя',
      'понеделник',
      'вторник',
      'сряда',
      'четвъртък',
      'петък',
      'събота'
    ],
    alwaysOpened: 'Без почивен ден',
    closesIn: 'Затваря след около',
    opensIn: 'Отваря след около',
    error: {
      delivery: 'Все още няма данни за пратката към тази поръчка.',
      search: 'За съжаление, в момента още нямаме данни за пратката към тази поръчка.'
    },
    searchOrder: 'Намери поръчка',
    zip: 'Пощ. код',
    search: 'Търсене',
    containsOf: 'състои се от',
    deliveries: 'Доставки',
    showPickuplocation: 'Показване на места за взимане',
    liveDelivery: 'Проследи на живо',
    articleList: 'Продукти в този пакет',
    deliveryAddress: 'Адрес за доставка'
  },
  sk: {
    delivery: 'Doprava',
    more: 'Podrobnosti',
    orderNo: 'Objednávka',
    predictions: {
      OutForDelivery: 'Balík bude doručený <b>dnes</b>.',
      DestinationDeliveryCenter: 'Balík bude doručený <b>zajtra</b>.'
    },
    openingHours: 'Otváracie hodiny',
    weekDays: [
      'Nedeľa',
      'Pondelok',
      'Utorok',
      'Streda',
      'Štvrtok',
      'Piatok',
      'Sobota'
    ],
    alwaysOpened: 'Otvorené 24h',
    closesIn: 'Zatvára sa o',
    opensIn: 'Otvára sa o',
    error: {
      delivery: 'Žiaľ doposiaľ sme neobdržali dáta na sledovanie Vašej objednávky.',
      search: 'Bohužiaľ, k zadanej objednávke neboli nájdené žiadne informacie.'
    },
    searchOrder: 'Vyhľadať objednávku',
    zip: 'PSČ',
    search: 'Hľadať',
    containsOf: 'Pozostáva z',
    deliveries: 'Expedovaný tovar',
    showPickuplocation: 'Ukáž miesto prevzatia',
    liveDelivery: 'Live sledovanie',
    articleList: 'Produkty v tomto balíku',
    deliveryAddress: 'Adresa doručenia'
  },
  hu: {
    delivery: 'Szállítás',
    more: 'További információk...',
    orderNo: 'Rendelés',
    predictions: {
      OutForDelivery: 'A rendelés még a <b>mai napon</b> kiszállításra kerül.',
      DestinationDeliveryCenter: 'A rendelés a <b>holnapi napon</b> kerül kiszállításra.'
    },
    openingHours: 'Nyitvatartási idő',
    weekDays: [
      'Vasárnap',
      'Hétfő',
      'Kedd',
      'Szerda',
      'Csütörtök',
      'Péntek',
      'Szombat'
    ],
    alwaysOpened: 'Folyamatosan nyitva',
    closesIn: 'Zárás körübelül',
    opensIn: 'Nyitás körübelül',
    error: {
      delivery: 'Ehhez a rendeléshez még nem állnak rendelkezésre szállítási adatok.',
      search: 'Sajnos ehhez a rendeléshez még nem állnak rendelkezésre szállítási adatok.'
    },
    searchOrder: 'Rendelés keresése',
    zip: 'Irányítószám',
    search: 'Keresés',
    containsOf: 'tartalmaz',
    deliveries: 'küldemény',
    showPickuplocation: 'Felvételi hely mutatása',
    liveDelivery: 'Élő követés',
    articleList: 'Ebben a csomagban található termékek',
    deliveryAddress: 'Szállítási cím'
  }
}

const langIds = {
  '#result-ticket': {
    type: 'empty',
    value: 'empty'
  },
  '#parcelLab-heading': {
    type: 'data',
    value: 'h1'
  },
  '#shipper': {
    type: 'data',
    value: 'shipper'
  },
  '#btn-ask': {
    type: 'data',
    value: 'ask'
  },
  '#txt-ask': {
    type: 'data',
    value: 'anyquestion',
    attr: 'placeholder'
  },
  '#last_checkpoint': {
    type: 'data',
    value: 'predictions',
    subtarget: 'this',
    sub: 'value'
  },
  '#prediction_text': {
    type: 'text',
    value: 'txt-prediction'
  },
  '.versandstatushelpbutton a': {
    type: 'data',
    value: 'help',
    subTarget: 'data',
    sub: 'text_help_btn'
  }
}

const listenBlocks = [
  {
    name: '#footnote',
    type: 'parcellab'
  }, {
    name: '#parcelLab-sender',
    type: 'shop',
    target: '.parcelLab-main-sender a'
  }, {
    name: '#parcelLab-sender',
    type: 'social',
    target: '.parcelLab-social a'
  }, {
    name: '#parcelLab-faq',
    type: 'faq'
  }
]

module.exports = {
  listenBlocks,
  translations,
  languages,
  socialIcons,
  courierNames,
  transitStates,
  langIds,
  getIconName
}
