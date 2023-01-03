/* ---------------------------------- Icons --------------------------------- */

const transitStates = {
  OrderProcessed: {
    icon: 'order_processed',
    xmas_icon: 'christmas_gift',
    easter_icon: 'easter_order_processed'
  },
  WarehousePrepared: {
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
  ReturnProcessed: {
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
};

const getIconName = (tStatus, theme) => {
  const type = theme ? `${theme}_icon` : 'icon';
  if (transitStates[tStatus]) {
    return transitStates[tStatus][type] || transitStates[tStatus].icon;
  } else return transitStates.default[type] || transitStates.default.icon;
};

/* -------------------------------- Languages ------------------------------- */

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
  },
  zh: {
    name: 'zh',
    label: '中文',
    code: 'CHN',
    icon: 'https://cdn.parcellab.com/img/flags/cn.png'
  },
  ko: {
    name: 'ko',
    label: '한국어',
    code: 'KOR',
    icon: 'https://cdn.parcellab.com/img/flags/kr.png'
  },
  tw: {
    name: 'tw',
    label: '台湾',
    code: 'TWN',
    icon: 'https://cdn.parcellab.com/img/flags/tw.png'
  },
  ja: {
    name: 'ja',
    label: '日本人',
    code: 'JPN',
    icon: 'https://cdn.parcellab.com/img/flags/jp.png'
  },
  ru: {
    name: 'ru',
    label: 'русский',
    code: 'RUS',
    icon: 'https://cdn.parcellab.com/img/flags/ru.png'
  },
  tr: {
    name: 'tr',
    label: 'Türkçe',
    code: 'TUR',
    icon: 'https://cdn.parcellab.com/img/flags/tr.png'
  },
  ca: {
    name: 'ca',
    label: 'Català',
    code: 'CAT',
    icon: 'https://cdn.parcellab.com/img/flags/catalonia.png'
  },
  eu: {
    name: 'eu',
    label: 'Euskara',
    code: 'EUS',
    icon: 'https://cdn.parcellab.com/img/flags/basque.png'
  },
  gl: {
    name: 'gl',
    label: 'Galego',
    code: 'GLG',
    icon: 'https://cdn.parcellab.com/img/flags/galicia.png'
  },
  el: {
    name: 'el',
    label: 'Ελληνικά',
    code: 'GRC',
    icon: 'https://cdn.parcellab.com/img/flags/gr.png'
  },
  ar: {
    name: 'ar',
    label: 'العربية',
    code: 'ARB',
    icon: 'https://cdn.parcellab.com/img/flags/ae.png'
  },
  'mx-es': {
    name: 'mx-es',
    label: 'Español',
    code: 'ESP',
    icon: 'https://cdn.parcellab.com/img/flags/mx.png'
  }
};

const translations = {
  en: {
    'submit-btn': 'Search',
    delivery: 'Delivery',
    more: 'Show more...',
    moreArticles: 'Show more...',
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
    openingHoursWarning: 'Opening hours may vary due to ###',
    error: {
      delivery: 'We have not yet received tracking data for your order.',
      search: 'Unfortunately, no information was found for this delivery.'
    },
    searchOrder: 'Search order',
    zip: 'Zip code',
    enterZipCode:
      'Please enter your zip code to get access to all information.',
    wrongZip: 'This zip code is wrong.',
    search: 'Search',
    containsOf: 'consists of',
    deliveries: 'deliveries',
    showPickuplocation: 'Show pickup location',
    liveDelivery: 'Live tracking',
    articleList: 'Items in this package',
    deliveryAddress: 'Delivery address',
    liveTrackingLastUpdate: 'Last update',
    liveTrackingStationsNext: "The driver's on his way to you.",
    liveTrackingStation: '### stopover',
    liveTrackingStations: '### stopovers',
    liveTrackingCaption: 'until your shipment arrives.',
    liveTrackingCaptionNext: 'You are the next stopover.',
    liveTrackingPrediction: 'Arrival time approx.'
  },
  ru: {
    delivery: 'Доставка',
    more: 'Подробнее',
    moreArticles: 'Подробнее',
    orderNo: 'Заказ',
    predictions: {
      OutForDelivery: 'Посылка будет доставлена <b>сегодня</b>.',
      DestinationDeliveryCenter: 'Посылка будет доставлена <b>завтра</b>.'
    },
    openingHours: 'Часы работы',
    openingHoursWarning: '',
    weekDays: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ],
    alwaysOpened: 'Открыто круглосуточно',
    closesIn: 'Закрывается через',
    opensIn: 'Открывается через',
    error: {
      delivery: 'Мы еще не получили информацию о Вашем заказе.',
      search: 'К сожалению, по данной доставке информация не найдена'
    },
    searchOrder: 'Поиск заказа',
    zip: 'Почтовый индекс',
    search: 'Искать',
    enterZipCode:
      'Введите Ваш почтовый индекс чтобы получить доступ ко всей информации.',
    wrongZip: 'Этот почтовый индекс неправильный.',
    containsOf: 'Состоит из',
    deliveries: 'Доставки',
    showPickuplocation: 'Пункт выдачи заказов',
    liveDelivery: 'Отслеживание онлайн',
    articleList: 'Артикулы в посылке',
    deliveryAddress: 'Адрес доставки',
    liveTrackingLastUpdate: '',
    liveTrackingStationsNext: '',
    liveTrackingStation: '',
    liveTrackingStations: '',
    liveTrackingCaption: '',
    liveTrackingCaptionNext: '',
    liveTrackingPrediction: ''
  },
  de: {
    'submit-btn': 'Suchen',
    delivery: 'Lieferung',
    more: 'Mehr anzeigen...',
    moreArticles: 'Mehr anzeigen...',
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
    openingHoursWarning: 'Öffnungszeiten können aufgrund von ### abweichen',
    error: {
      delivery: 'Zu dieser Bestellung liegen noch keine Sendungsdaten vor.',
      search:
        'Leider liegen uns aktuell keine Sendungsdetails zu dieser Bestellung vor.'
    },
    searchOrder: 'Bestellung suchen',
    zip: 'PLZ',
    enterZipCode:
      'Bitte gib deine PLZ ein, um Zugriff auf alle Informationen zu erhalten.',
    wrongZip: 'Diese PLZ ist falsch.',
    search: 'Suchen',
    containsOf: 'besteht aus',
    deliveries: 'Lieferungen',
    showPickuplocation: 'Abholort anzeigen',
    liveDelivery: 'Live verfolgen',
    articleList: 'Artikel in diesem Paket',
    deliveryAddress: 'Zustelladresse',
    liveTrackingLastUpdate: 'Letzte Aktualisierung',
    liveTrackingStationsNext: 'Der Fahrer ist auf dem Weg zu dir.',
    liveTrackingStation: 'Noch ### Stopp vor dir',
    liveTrackingStations: 'Noch ### Stopps vor dir',
    liveTrackingCaption: 'bis deine Lieferung bei dir ist.',
    liveTrackingCaptionNext: 'Du bist der nächste Stopp.',
    liveTrackingPrediction: 'Ankunftszeit ca.'
  },
  es: {
    'submit-btn': 'Buscar',
    delivery: 'Entrega',
    more: 'Ver más...',
    moreArticles: 'Ver más...',
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
    openingHoursWarning: 'Las horas de apertura pueden variar debido a ###',
    error: {
      delivery:
        'Actualmente no hay de datos de envío disponibles para este pedido.',
      search: 'Desafortunadamente tu paquete no esta disponible.'
    },
    searchOrder: 'Búsqueda del envío',
    search: 'Buscar',
    containsOf: 'consiste en',
    deliveries: 'entregas',
    enterZipCode:
      'Por favor, introduzca su código postal para tener acceso a toda la información.',
    wrongZip: 'Este código postal está mal.',
    showPickuplocation: 'Lugar de recogida',
    articleList: 'Artículos en este paquete',
    deliveryAddress: 'Dirección de entrega'
  },
  fr: {
    delivery: 'Livraison',
    more: 'Voir les étapes précédentes...',
    moreArticles: 'Afficher plus...',
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
    openingHoursWarning:
      "Les heures d'ouverture peuvent varier en raison de ###",
    error: {
      delivery:
        "Aucune information concernant l'expédition disponible pour cette commande.",
      search:
        "Malheureusement, ce numéro de colis ou de commande n'est pas valide."
    },
    searchOrder: 'Rechercher la commande',
    search: 'Chercher',
    containsOf: 'consiste en',
    deliveries: 'livraisons',
    enterZipCode:
      'Veuillez entrer votre code postal pour avoir accès à toutes les informations.',
    wrongZip: 'Ce code postal est incorrect.',
    showPickuplocation: 'Lieu de retrait',
    articleList: 'Articles dans ce colis',
    deliveryAddress: 'Adresse de livraison'
  },
  it: {
    delivery: 'Consegna',
    more: 'Mostra di più...',
    moreArticles: 'Mostra di più...',
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
    openingHoursWarning: 'Gli orari di apertura possono variare a causa di ###',
    error: {
      delivery:
        'Non ci sono ancora informazioni sulla spedizione di questo ordine.',
      search: 'Purtroppo non abbiamo dati per questa consegna.'
    },
    searchOrder: "cerca l'ordine",
    search: 'Ricerca',
    containsOf: 'consiste in',
    deliveries: 'consegne',
    enterZipCode:
      'Inserisci il tuo codice di avviamento postale per accedere a tutte le informazioni.',
    wrongZip: 'Il codice postale è sbagliato.',
    showPickuplocation: 'Mostra punto di ritiro',
    articleList: 'Articoli in questo pacchetto',
    deliveryAddress: 'Indirizzo di consegna'
  },
  nl: {
    delivery: 'Levering',
    more: 'Bekijk meer...',
    moreArticles: 'Bekijk meer...',
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
    openingHoursWarning: 'De openingstijden kunnen variëren als gevolg van ###',
    error: {
      delivery:
        'Voor deze bestelling zijn nog geen track & trace gegevens bekend',
      search: 'Helaas is de levering niet bekend.'
    },
    searchOrder: 'Zoek order',
    search: 'Zoeken',
    containsOf: 'bestaat uit',
    deliveries: 'leveringen',
    enterZipCode:
      'Voer uw postcode in om toegang te krijgen tot alle informatie.',
    wrongZip: 'Deze postcode is fout.',
    showPickuplocation: 'Afhaalpunt',
    articleList: 'Items in dit pakket',
    deliveryAddress: 'Bezorgadres'
  },
  da: {
    delivery: 'Levering',
    more: 'Se mere...',
    moreArticles: 'Se mere...',
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
    openingHoursWarning: 'Åbningstider kan variere på grund af ###',
    error: {
      delivery:
        'Der findes endnu ingen leveringsinformationer til denne bestilling.',
      search: 'Beklageligvis er leveringen ikke tilgængelig.'
    },
    searchOrder: 'Søg ordre',
    search: 'Søg',
    containsOf: 'består af',
    deliveries: 'leveringer',
    enterZipCode:
      'Indtast dit postnummer for at få adgang til alle oplysninger.',
    wrongZip: 'Dette postnummer er forkert.',
    showPickuplocation: 'Vis leveringssted',
    articleList: 'Varer i denne pakke',
    deliveryAddress: 'Leveringsadresse'
  },
  sv: {
    delivery: 'Leverans',
    more: 'Se mer...',
    moreArticles: 'Se mer...',
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
    openingHoursWarning: 'Öppettiderna kan variera beroende på ###',
    error: {
      delivery: 'Beställningen har ännu inte tilldelats något kollinummer.',
      search: 'Tyvärr är inte denna leverans tillgänglig.'
    },
    searchOrder: 'Sök order',
    search: 'Sök',
    containsOf: 'består av',
    deliveries: 'leveranser',
    enterZipCode:
      'Ange ditt postnummer för att få tillgång till all information.',
    wrongZip: 'Detta postnummer är fel.',
    showPickuplocation: 'Visa leveranstid',
    articleList: 'Detta paket innehåller',
    deliveryAddress: 'Leveransadress'
  },
  fi: {
    delivery: 'Toimitus',
    more: 'Katso lisää...',
    moreArticles: 'Katso lisää...',
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
    openingHoursWarning: 'Käyttötunnit voivat vaihdella ### : n takia',
    error: {
      delivery: 'Tästä tilauksesta ei ole vielä lähetystietoja.',
      search: 'Valitettavasti tämä toimitus ei ole saatavilla järjestelmässä.'
    },
    searchOrder: 'Hae tilausta',
    search: 'Hae',
    containsOf: 'koostuu',
    deliveries: 'toimituksesta',
    enterZipCode: 'Anna postinumero, jotta pääset käsiksi kaikkiin tietoihin.',
    wrongZip: 'Tämä postinumero on väärä.',
    showPickuplocation: 'Näytä noutopiste',
    articleList: 'Tuotteet tässä paketissa',
    deliveryAddress: 'Toimitusosoite'
  },
  no: {
    delivery: 'Levering',
    more: 'Se mer...',
    moreArticles: 'Se mer...',
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
    openingHoursWarning: 'Driftstider kan variere på grunn av ###',
    error: {
      delivery:
        'Vi har ennå ikke mottatt sendingsopplysninger tilknyttet denne bestillingen.',
      search: 'Dessverre er denne leveransen ikke tilgjengelig.'
    },
    searchOrder: 'Søk etter bestilling',
    search: 'Søk',
    containsOf: 'inneholder',
    deliveries: 'leveranser',
    enterZipCode:
      'Vennligst tast inn postnummeret ditt for å få tilgang til all informasjon.',
    wrongZip: 'Postnummeret er feil.',
    showPickuplocation: 'vis hentested',
    articleList: 'Varer i denne pakken',
    deliveryAddress: 'Leveringsadresse'
  },
  pt: {
    delivery: 'Entrega',
    more: 'Mostrar mais...',
    moreArticles: 'Mostrar mais...',
    orderNo: 'Encomenda',
    predictions: {
      OutForDelivery: 'A encomenda chega <b>hoje</b>.',
      DestinationDeliveryCenter: 'A encomenda chega <b>amanhã</b>.'
    },
    openingHours: 'Horário de abertura',
    weekDays: [
      'Domingo',
      'Segunda feira',
      'Terça feira',
      'Quarta feira',
      'Quinta feira',
      'Sexta feira',
      'Sábado'
    ],
    alwaysOpened: 'Aberto 24h',
    closesIn: 'fecha dentro de',
    opensIn: 'Abre dentro de ',
    openingHoursWarning: 'O horário de funcionamento pode variar devido ao ###',
    error: {
      delivery:
        'Não foram ainda recebidos os dados de rastreamento do seu pedido.',
      search:
        'Infelizmente, nenhuma informação foi encontrada para esta entrega.'
    },
    searchOrder: 'Procura de encomenda',
    search: 'Procura',
    containsOf: 'consiste em',
    deliveries: 'entregas',
    enterZipCode: 'Digite seu CEP para obter acesso a todas as informações.',
    wrongZip: 'Este código postal está errado.',
    showPickuplocation: 'Mostrar local de recolha',
    articleList: 'Artigos nesta encomenda',
    deliveryAddress: 'Morada de entrega'
  },
  pl: {
    delivery: 'Dostawa',
    more: 'Pokaż więcej...',
    moreArticles: 'Pokaż więcej...',
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
    openingHoursWarning: 'Godziny pracy mogą się różnić ze względu na ###',
    error: {
      delivery:
        'Nie wprowadzono jeszcze do systemu informacji o tej przesyłce.',
      search: 'Niestety, ta paczka nie znajduje się w systemie.'
    },
    searchOrder: 'szukaj zamówienia',
    search: 'Szukaj',
    containsOf: 'składa się z',
    deliveries: 'przesyłek',
    enterZipCode:
      'Wpisz kod pocztowy, aby uzyskać dostęp do wszystkich informacji.',
    wrongZip: 'Ten kod pocztowy jest nieprawidłowy.',
    showPickuplocation: 'Pokaż punkt odbioru',
    articleList: 'Artykuły w tym pakiecie',
    deliveryAddress: 'Adres dostawy'
  },
  ro: {
    delivery: 'Livrare',
    more: 'Arată mai multe...',
    moreArticles: 'Arată mai multe...',
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
    openingHoursWarning: 'Orele de funcționare pot varia din cauza ###',
    error: {
      delivery: 'Din păcate, această livrare nu este disponibil.',
      search: 'Din păcate, această livrare nu este disponibil.'
    },
    searchOrder: 'ordinea de căutare',
    search: 'Căutare',
    containsOf: 'este format din',
    deliveries: 'livrări',
    enterZipCode:
      'Vă rugăm să introduceți codul poștal pentru a avea acces la toate informațiile.',
    wrongZip: 'Acest cod poștal este greșit.',
    showPickuplocation: 'Noutopaikka',
    articleList: 'Articole din acest pachet',
    deliveryAddress: 'Adresă de livrare'
  },
  cs: {
    delivery: 'Zásilka',
    more: 'Zobrazit více ...',
    moreArticles: 'Zobrazit více ...',
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
    openingHoursWarning: 'Provozní hodiny se mohou lišit v důsledku ###',
    error: {
      delivery: 'Je nám líto, ale tato zásilka není k dispozici.',
      search: 'Pro tuto zásilku nebyly nalezeny žádné informace.'
    },
    searchOrder: 'Hledat objednávku',
    search: 'Hledat',
    containsOf: 'Sestává z',
    deliveries: 'Zásilek',
    enterZipCode:
      'Chcete-li získat přístup ke všem informacím, zadejte své PSČ.',
    wrongZip: 'Toto PSČ není správné.',
    showPickuplocation: 'Zobrazit místo odběru',
    articleList: 'Seznam zboží',
    deliveryAddress: 'Adresa doručení'
  },
  sl: {
    delivery: 'Dostava',
    more: 'Podrobnosti...',
    moreArticles: 'Podrobnosti...',
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
    openingHoursWarning: 'Ure delovanja se zaradi ### lahko razlikujejo',
    error: {
      delivery: 'Za to naročilo še ni na voljo številke za sledenje.',
      search:
        'Žal trenutni nimamo na voljo številke za sledenje za to naročilo.'
    },
    searchOrder: 'Išči naročilo',
    zip: 'PTT',
    search: 'Išči',
    containsOf: 'je sestavljeno iz',
    deliveries: 'Dostava',
    enterZipCode: 'Ta poštna številka je napačna.',
    wrongZip: 'Ta poštna številka je napačna.',
    showPickuplocation: 'Prikaže kraj prevzema',
    liveDelivery: 'Sledenje v živo',
    articleList: 'Izdelek v tem paketu',
    deliveryAddress: 'Naslov za dostavo'
  },
  hr: {
    delivery: 'Dostava',
    more: 'Prikaži više...',
    moreArticles: 'Prikaži više...',
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
    openingHoursWarning: 'Sati rada mogu varirati zbog ###',
    error: {
      delivery: 'Ova narudžba još nema broja za online pračenje pošiljke.',
      search:
        'Nažalost, trenutno broj za online pračenje pošiljke nije dostupan.'
    },
    searchOrder: 'Traži narudžbu',
    zip: 'Poštanski broj',
    search: 'Traži',
    containsOf: 'sastoji se od',
    deliveries: 'Dostava',
    enterZipCode:
      'Unesite svoj poštanski broj da biste pristupili svim podacima.',
    wrongZip: 'Ovaj poštanski broj nije u redu.',
    showPickuplocation: 'Prikaz lokacije preuzimanja',
    liveDelivery: 'Online pračenje',
    articleList: 'Proizvodi u ovom paketu',
    deliveryAddress: 'Adresa za dostavu'
  },
  bg: {
    delivery: 'Доставка',
    more: 'Научи повече...',
    moreArticles: 'Научи повече...',
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
    openingHoursWarning: 'Часовете на работа може да варират поради ###',
    error: {
      delivery: 'Все още няма данни за пратката към тази поръчка.',
      search:
        'За съжаление, в момента още нямаме данни за пратката към тази поръчка.'
    },
    searchOrder: 'Намери поръчка',
    zip: 'Пощ. код',
    search: 'Търсене',
    containsOf: 'състои се от',
    deliveries: 'Доставки',
    enterZipCode:
      'Моля, въведете пощенския си код, за да получите достъп до цялата информация.',
    wrongZip: 'Този пощенски код е грешен.',
    showPickuplocation: 'Показване на места за взимане',
    liveDelivery: 'Проследи на живо',
    articleList: 'Продукти в този пакет',
    deliveryAddress: 'Адрес за доставка'
  },
  sk: {
    delivery: 'Doprava',
    more: 'Podrobnosti',
    moreArticles: 'Podrobnosti',
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
    openingHoursWarning: 'Prevádzkové hodiny sa môžu líšiť v dôsledku ###',
    error: {
      delivery:
        'Žiaľ doposiaľ sme neobdržali dáta na sledovanie Vašej objednávky.',
      search: 'Bohužiaľ, k zadanej objednávke neboli nájdené žiadne informacie.'
    },
    searchOrder: 'Vyhľadať objednávku',
    zip: 'PSČ',
    search: 'Hľadať',
    containsOf: 'Pozostáva z',
    deliveries: 'Expedovaný tovar',
    enterZipCode:
      'Ak chcete získať prístup ku všetkým informáciám, zadajte svoje PSČ.',
    wrongZip: 'Toto PSČ je nesprávne.',
    showPickuplocation: 'Ukáž miesto prevzatia',
    liveDelivery: 'Live sledovanie',
    articleList: 'Produkty v tomto balíku',
    deliveryAddress: 'Adresa doručenia'
  },
  hu: {
    delivery: 'Szállítás',
    more: 'További információk...',
    moreArticles: 'További információk...',
    orderNo: 'Rendelés',
    predictions: {
      OutForDelivery: 'A rendelés még a <b>mai napon</b> kiszállításra kerül.',
      DestinationDeliveryCenter:
        'A rendelés a <b>holnapi napon</b> kerül kiszállításra.'
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
    openingHoursWarning: 'A működési idő a ### miatt változhat',
    error: {
      delivery:
        'Ehhez a rendeléshez még nem állnak rendelkezésre szállítási adatok.',
      search:
        'Sajnos ehhez a rendeléshez még nem állnak rendelkezésre szállítási adatok.'
    },
    searchOrder: 'Rendelés keresése',
    zip: 'Irányítószám',
    search: 'Keresés',
    containsOf: 'tartalmaz',
    deliveries: 'küldemény',
    enterZipCode:
      'Kérjük, adja meg irányítószámát, hogy minden információhoz hozzáférjen.',
    wrongZip: 'Ez a irányítószám nem megfelelő.',
    showPickuplocation: 'Felvételi hely mutatása',
    liveDelivery: 'Élő követés',
    articleList: 'Ebben a csomagban található termékek',
    deliveryAddress: 'Szállítási cím'
  },
  zh: {
    delivery: '配送',
    more: '显示更多...',
    moreArticles: '显示更多...',
    orderNo: '订单',
    predictions: {
      OutForDelivery: '包裹将在今天<b></ b>到达。',
      DestinationDeliveryCenter: '包裹将在明天<b></ b>到达。'
    },
    openingHours: '营业时间',
    weekDays: [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ],
    alwaysOpened: '24小时营业',
    closesIn: '关闭大约在',
    opensIn: '开始营业大约在',
    error: {
      delivery: '我们尚未收到您订单的跟踪数据。',
      search: '很遗憾，我们找不到此次配送的信息。'
    },
    searchOrder: '搜索订单',
    zip: '邮政编码',
    search: '搜索',
    enterZipCode: '请输入你的邮政编码，以获得所有信息。',
    wrongZip: '这个邮政编码是错误的。',
    containsOf: '由**组成',
    deliveries: '配送',
    showPickuplocation: '显示取货地点',
    liveDelivery: '实时追踪',
    articleList: '此包装中的文章',
    deliveryAddress: '邮寄地址'
  },
  ko: {
    delivery: '배송',
    more: '추가',
    moreArticles: '추가',
    orderNo: '주문 번호',
    predictions: {
      OutForDelivery: '소포는 <b>금일</b>. 도착예정입니다.',
      DestinationDeliveryCenter: '소포는 <b>내일</b>. 도착 예정입니다.'
    },
    openingHours: '영업 시간',
    weekDays: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일'
    ],
    alwaysOpened: '24시간 영업',
    closesIn: '영업 종료',
    opensIn: '영업 개시',
    error: {
      delivery: '고객님 배송 정보를 아직 받지 못했습니다.',
      search: '안타깝게도 이 배송건에 관련된 정보가 확인되지 않습니다.'
    },
    searchOrder: '주문 검색',
    zip: '우편번호',
    search: '검색',
    enterZipCode: '모든 정보에 액세스하려면 우편 번호를 입력하십시오.',
    wrongZip: '우편번호가 잘못되었습니다.',
    containsOf: '~로 구성되다',
    deliveries: '배송',
    showPickuplocation: '배송 픽업 장소 확인',
    liveDelivery: '실시간 배송 조회',
    articleList: '소포 내 항복',
    deliveryAddress: '배송 주소'
  },
  tw: {
    delivery: '配送',
    more: '顯示更多...',
    moreArticles: '顯示更多...',
    orderNo: '訂單',
    predictions: {
      OutForDelivery: '包裹將在今天<b></ b>到達。',
      DestinationDeliveryCenter: '包裹將在明天<b></ b>到達。'
    },
    openingHours: '營業時間',
    weekDays: [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ],
    alwaysOpened: '24小時營業',
    closesIn: '關閉大約在',
    opensIn: '開始營業大約在',
    error: {
      delivery: '我們尚未收到您訂單的跟踪數據。',
      search: '很遺憾，我們找不到此次配送的信息。'
    },
    searchOrder: '搜索訂單',
    zip: '郵政編碼',
    search: '搜索',
    containsOf: '由**組成',
    deliveries: '配送',
    showPickuplocation: '顯示取貨地點',
    liveDelivery: '實時追踪',
    articleList: '此包裝中的文章',
    deliveryAddress: '郵寄地址'
  },
  ja: {
    delivery: '配達',
    more: 'さらに表示する...',
    moreArticles: 'さらに表示する...',
    orderNo: '注文',
    predictions: {
      OutForDelivery: '小包は<b>今日</ b>到着します。',
      DestinationDeliveryCenter: '小包は<b>明日</ b>到着します。'
    },
    openingHours: '営業時間',
    weekDays: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日'
    ],
    alwaysOpened: '24時間営業',
    closesIn: 'もうすぐ閉まります',
    opensIn: 'もうすぐ開きます',
    error: {
      delivery: 'ご注文の追跡情報をまだ受け取っていません。',
      search: '残念ながら、この配送に関する情報は見つかりませんでした。'
    },
    searchOrder: 'ご注文検索',
    zip: '郵便番号',
    search: '検索',
    enterZipCode:
      '全ての情報にアクセスするためには、郵便番号を入力してください',
    wrongZip: 'この郵便番号は間違っています。',
    containsOf: 'からなる',
    deliveries: '配送',
    showPickuplocation: '受け取り場所を表示',
    liveDelivery: 'ライブ追跡',
    articleList: '小包の中の品物',
    deliveryAddress: 'お届け先住所'
  },
  tr: {
    delivery: 'Gönderi Kodu',
    more: 'Daha fazla göster…',
    moreArticles: 'Daha fazla göster…',
    orderNo: 'Sipariş Numarası',
    predictions: {
      OutForDelivery: 'Teslimat <b>bugün</b> gönderilecek.',
      DestinationDeliveryCenter: 'Teslimat <b>yarın</b> gönderilecek.'
    },
    openingHours: 'açılış saatleri',
    openingHoursWarning: '###',
    weekDays: [
      'Pazar',
      'Pazartesi',
      'Sali',
      'Carsamba',
      'Persembe',
      'Cuma',
      'Cumartesi'
    ],
    alwaysOpened: '24 saat acik',
    closesIn: 'civarinda kapanir',
    opensIn: 'civarinda acilir',
    error: {
      delivery: 'Siparişiniz için henüz takip verisi almadık.',
      search: 'Maalesef bu teslimat için hiçbir bilgi bulunamadı.'
    },
    searchOrder: 'Sipariş ara',
    zip: 'Posta kodu',
    search: 'Ara',
    enterZipCode: 'Tüm bilgilere erişmek için lütfen posta kodunuzu girin.',
    wrongZip: 'Bu posta kodu yanlış.',
    containsOf: 'içerir',
    deliveries: 'Iletimler',
    showPickuplocation: 'Alma yerini göster',
    liveDelivery: 'Canli takip et',
    articleList: 'Paketin icindeki ürünler',
    deliveryAddress: 'Iletim Adresi',
    liveTrackingLastUpdate: '',
    liveTrackingStationsNext: '',
    liveTrackingStation: '',
    liveTrackingStations: '',
    liveTrackingCaption: '',
    liveTrackingCaptionNext: '',
    liveTrackingPrediction: ''
  },
  ca: {
    delivery: 'Lliurament',
    more: 'Mostra més...',
    moreArticles: 'Mostra més...',
    orderNo: 'Número de comanda',
    predictions: {
      OutForDelivery: 'El paquet arribarà <b>avui</b>.',
      DestinationDeliveryCenter: 'El paquet arribarà <b>demà</b>.'
    },
    openingHours: 'Horari d´obertura',
    weekDays: [
      'Diumenge',
      'Dilluns',
      'Dimarts',
      'Dimecres',
      'Dijous',
      'Divendres',
      'Dissabte'
    ],
    alwaysOpened: 'Obert tot el dia',
    closesIn: 'es tanca en',
    opensIn: 'obre en',
    openingHoursWarning: 'L´horari d´obertura pot variar a causa de ###',
    error: {
      delivery:
        'Actualment no hi ha de dades d´enviament disponibles per a aquesta comanda.',
      search: 'Malauradament, el teu paquet no està disponible.'
    },
    searchOrder: 'Cerca de l´enviament',
    search: 'Cerca',
    containsOf: 'consisteix en',
    deliveries: 'lliuraments',
    enterZipCode:
      'Si us plau, introdueix el teu codi postal per poder accedir a tota la informació.',
    wrongZip: 'Aquest codi postal no és correcte.',
    showPickuplocation: 'Lloc de recollida',
    articleList: 'Articles d´aquest paquet',
    deliveryAddress: 'Adreça de lliurament'
  },
  eu: {
    delivery: 'Entrega',
    more: 'Ikusi gehiago...',
    moreArticles: 'Ikusi gehiago...',
    orderNo: 'Eskaera-zenbakia',
    predictions: {
      OutForDelivery: 'Paketea <b>Gaur</b> iritsiko da.',
      DestinationDeliveryCenter: 'Paketea <b>Bihar</b> iritsiko da.'
    },
    openingHours: 'Ordutegia',
    weekDays: [
      'Igandea',
      'Astelehena',
      'Asteartea',
      'Asteazkena',
      'Osteguna',
      'Ostirala',
      'Larunbata'
    ],
    alwaysOpened: 'Egun osoan zehar irekita',
    closesIn: 'itxiera-ordua:',
    opensIn: 'irekiera-ordua:',
    openingHoursWarning: 'Irekiera-orduak aldatu daitezke ### dela eta.',
    error: {
      delivery:
        'Une honetan ez dago eskaera honentzako bidalketa-daturik eskuragarri.',
      search: 'Zoritxarrez, zure paketea ez dago eskuragarri.'
    },
    searchOrder: 'Bidalketaren bilaketa',
    search: 'Bilatu',
    containsOf: 'datza',
    deliveries: 'entregak',
    enterZipCode:
      'Sartu zure posta-kodea informazio guztia atzitu ahal izateko.',
    wrongZip: 'Posta-kode hau ez da zuzena.',
    showPickuplocation: 'Jasotzeko lekua',
    articleList: 'Pakete honetako artikuluak',
    deliveryAddress: 'Entrega-helbidea'
  },
  gl: {
    delivery: 'Entrega',
    more: 'Ver máis...',
    moreArticles: 'Ver máis...',
    orderNo: 'Número de pedido',
    predictions: {
      OutForDelivery: 'O paquete chegará <b>hoxe</b>.',
      DestinationDeliveryCenter: 'O paquete chegará <b>mañá</b>.'
    },
    openingHours: 'Horario de apertura',
    weekDays: [
      'Domingo',
      'Luns',
      'Martes',
      'Mércores',
      'Xoves',
      'Venres',
      'Sábado'
    ],
    alwaysOpened: 'Aberto todo o día',
    closesIn: 'pecha en',
    opensIn: 'abre en',
    openingHoursWarning: 'As horas de apertura poden variar debido a ###',
    error: {
      delivery:
        'Nestes momentos non hai datos de envío dispoñibles para este pedido.',
      search: 'Sentímolo, o teu paquete non está dispoñible.'
    },
    searchOrder: 'Búsqueda do envío',
    search: 'Buscar',
    containsOf: 'consiste en',
    deliveries: 'entregas',
    enterZipCode:
      'Introduce o teu código postal para ter acceso a toda a información.',
    wrongZip: 'Este código postal está mal.',
    showPickuplocation: 'Lugar de recollida',
    articleList: 'Artigos neste paquete',
    deliveryAddress: 'Enderezo de entrega'
  },
  el: {
    'submit-btn': 'Αναζήτηση',
    delivery: 'Παράδοση',
    more: 'Δείτε περισσότερα...',
    moreArticles: 'Δείτε περισσότερα...',
    orderNo: 'Παραγγελία',
    predictions: {
      OutForDelivery: 'Το πακέτο θα φτάσει <b>σήμερα</b>.',
      DestinationDeliveryCenter: 'Το πακέτο θα φτάσει <b>αύριο</b>.'
    },
    openingHours: 'Ώρες λειτουργίας',
    weekDays: [
      'Κυριακή',
      'Δευτέρα',
      'Τρίτη',
      'Τετάρτη',
      'Πέμπτη',
      'Παρασκευή',
      'Σάββατο'
    ],
    alwaysOpened: 'Ανοικτό 24 ώρες',
    closesIn: 'Κλείνει σε περίπου',
    opensIn: 'Ανοίγει σε περίπου',
    openingHoursWarning: 'Οι ώρες λειτουργίας ενδέχεται να διαφέρουν λόγω ###',
    error: {
      delivery:
        'Δεν έχουμε λάβει ακόμη δεδομένα παρακολούθησης για την παραγγελία σας.',
      search: 'Δυστυχώς, δεν βρέθηκαν πληροφορίες για την παράδοση αυτή.'
    },
    searchOrder: 'Παραγγελία αναζήτησης',
    zip: 'TK',
    enterZipCode:
      'Εισάγετε την TK σας για να αποκτήσετε πρόσβαση σε όλες τις πληροφορίες.',
    wrongZip: 'Αυτή η TK είναι λάθος.',
    search: 'Αναζήτηση',
    containsOf: 'αποτελείται από',
    deliveries: 'παραδόσεις',
    showPickuplocation: 'Εμφάνιση τοποθεσίας παραλαβής',
    liveDelivery: 'Ζωντανή παρακολούθηση',
    articleList: 'Στοιχεία σε αυτό το πακέτο',
    deliveryAddress: 'Διεύθυνση παράδοσης',
    liveTrackingLastUpdate: 'Τελευταία ενημέρωση',
    liveTrackingStationsNext: "Ο οδηγός είναι καθ' οδόν προς εσάς.",
    liveTrackingStation: '### ενδιάμεση στάση',
    liveTrackingStations: '### στάσεις',
    liveTrackingCaption: 'μέχρι να φτάσει η αποστολή σας.',
    liveTrackingCaptionNext: 'Είστε ο επόμενος ενδιάμεσος σταθμός.',
    liveTrackingPrediction: 'Χρόνος άφιξης περίπου.'
  },
  ar: {
    'submit-btn': 'بحث',
    delivery: 'التوصيل',
    more: 'عرض المزيد',
    moreArticles: 'عرض المزيد',
    orderNo: 'الطلب',
    predictions: {
      OutForDelivery: 'طردك سيصل <b>اليوم</b>',
      DestinationDeliveryCenter: 'طردك سيصل <b>غدًا</b>'
    },
    openingHours: 'ساعات العمل',
    weekDays: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت'
    ],
    alwaysOpened: 'مفتوح على مدار اليوم',
    closesIn: 'يغلق في',
    opensIn: 'يفتح في',
    searchOrder: 'البحث عن طلبك',
    zip: 'الرمز البريدي',
    search: 'بحث',
    containsOf: 'يشمل',
    deliveries: 'عمليات التوصيل',
    showPickuplocation: 'عرض مكان الاستلام',
    liveDelivery: 'تتبع طلبك',
    articleList: 'القطع الموجودة في هذا الطرد',
    deliveryAddress: 'عنوان التوصيل',
    countryName: {
      AFG: 'Afghanistan',
      ALB: 'Albania',
      DZA: 'Algeria',
      ASM: 'American Samoa',
      AND: 'Andorra',
      AGO: 'Angola',
      AIA: 'Anguilla',
      ATG: 'Antigua and Barbuda',
      ARG: 'Argentina',
      ARM: 'Armenia',
      ABW: 'Aruba',
      AUS: 'Australia',
      AUT: 'Austria',
      AZE: 'Azerbaijan',
      BHS: 'Bahamas',
      BHR: 'Bahrain',
      BGD: 'Bangladesh',
      BRB: 'Barbados',
      BLR: 'Belarus',
      BEL: 'Belgium',
      BLZ: 'Belize',
      BEN: 'Benin',
      BMU: 'Bermuda',
      BTN: 'Bhutan',
      BOL: 'Bolivia',
      BIH: 'Bosnia and Herzegovina',
      BWA: 'Botswana',
      BRA: 'Brazil',
      IOT: 'British Indian Ocean Territory',
      VGB: 'British Virgin Islands',
      BRN: 'Brunei',
      BGR: 'Bulgaria',
      BFA: 'Burkina Faso',
      BDI: 'Burundi',
      CPV: 'Cabo Verde',
      KHM: 'Cambodia',
      CMR: 'Cameroon',
      CAN: 'Canada',
      CYM: 'Cayman Islands',
      CAF: 'Central African Republic',
      TCD: 'Chad',
      CHL: 'Chile',
      CHN: 'China',
      COL: 'Colombia',
      COM: 'Comoros',
      COK: 'Cook Islands',
      CRI: 'Costa Rica',
      HRV: 'Croatia',
      CUB: 'Cuba',
      CUW: 'Curacao',
      CYP: 'Cyprus',
      CZE: 'Czechia',
      COD: 'Democratic Republic of the Congo',
      DNK: 'Denmark',
      DJI: 'Djibouti',
      DMA: 'Dominica',
      DOM: 'Dominican Republic',
      TLS: 'East Timor',
      ECU: 'Ecuador',
      EGY: 'Egypt',
      SLV: 'El Salvador',
      GNQ: 'Equatorial Guinea',
      ERI: 'Eritrea',
      EST: 'Estonia',
      SWZ: 'Eswatini',
      ETH: 'Ethiopia',
      FLK: 'Falkland Islands',
      FRO: 'Faroe Islands',
      FSM: 'Federated States of Micronesia',
      FJI: 'Fiji',
      FIN: 'Finland',
      FRA: 'France',
      GAB: 'Gabon',
      GEO: 'Georgia',
      DEU: 'Germany',
      GHA: 'Ghana',
      GIB: 'Gibraltar',
      GRC: 'Greece',
      GRL: 'Greenland',
      GRD: 'Grenada',
      GTM: 'Guatemala',
      GGY: 'Guernsey',
      GIN: 'Guinea',
      GNB: 'Guinea-Bissau',
      GUY: 'Guyana',
      HTI: 'Haiti',
      HND: 'Honduras',
      HUN: 'Hungary',
      ISL: 'Iceland',
      IND: 'India',
      IDN: 'Indonesia',
      IRN: 'Iran',
      IRQ: 'Iraq',
      IRL: 'Ireland',
      IMN: 'Isle of Man',
      ISR: 'Israel',
      ITA: 'Italy',
      CIV: 'Ivory Coast',
      JAM: 'Jamaica',
      JPN: 'Japan',
      JEY: 'Jersey',
      JOR: 'Jordan',
      KAZ: 'Kazakhstan',
      KEN: 'Kenya',
      KIR: 'Kiribati',
      KOS: 'Kosovo',
      KWT: 'Kuwait',
      KGZ: 'Kyrgyzstan',
      LAO: 'Laos',
      LVA: 'Latvia',
      LBN: 'Lebanon',
      LSO: 'Lesotho',
      LBR: 'Liberia',
      LBY: 'Libya',
      LIE: 'Liechtenstein',
      LTU: 'Lithuania',
      LUX: 'Luxembourg',
      MDG: 'Madagascar',
      MWI: 'Malawi',
      MYS: 'Malaysia',
      MDV: 'Maldives',
      MLI: 'Mali',
      MLT: 'Malta',
      MHL: 'Marshall Islands',
      MRT: 'Mauritania',
      MUS: 'Mauritius',
      MEX: 'Mexico',
      MDA: 'Moldova',
      MCO: 'Monaco',
      MNG: 'Mongolia',
      MNE: 'Montenegro',
      MSR: 'Montserrat',
      MAR: 'Morocco',
      MOZ: 'Mozambique',
      MMR: 'Myanmar',
      NAM: 'Namibia',
      NRU: 'Nauru',
      NPL: 'Nepal',
      NLD: 'Netherlands',
      NZL: 'New Zealand',
      NIC: 'Nicaragua',
      NER: 'Niger',
      NGA: 'Nigeria',
      NIU: 'Niue',
      PRK: 'North Korea',
      MKD: 'North Macedonia',
      NOR: 'Norway',
      OMN: 'Oman',
      PAK: 'Pakistan',
      PLW: 'Palau',
      PSE: 'Palestinian Territories',
      PAN: 'Panama',
      PNG: 'Papua New Guinea',
      PRY: 'Paraguay',
      PER: 'Peru',
      PHL: 'Philippines',
      PCN: 'Pitcairn',
      POL: 'Poland',
      PRT: 'Portugal',
      QAT: 'Qatar',
      COG: 'Republic of the Congo',
      ROU: 'Romania',
      RUS: 'Russia',
      RWA: 'Rwanda',
      SHN: 'Saint Helena, Ascension and Tristan da Cunha',
      KNA: 'Saint Kitts and Nevis',
      LCA: 'Saint Lucia',
      VCT: 'Saint Vincent and the Grenadines',
      SMR: 'San Marino',
      SAU: 'Saudi Arabia',
      SEN: 'Senegal',
      SRB: 'Serbia',
      SYC: 'Seychelles',
      SLE: 'Sierra Leone',
      SGP: 'Singapore',
      SXM: 'Sint Maarten (Netherlands)',
      SVK: 'Slovakia',
      SVN: 'Slovenia',
      SLB: 'Solomon Islands',
      SOM: 'Somalia',
      ZAF: 'South Africa',
      SGS: 'South Georgia and South Sandwich Islands',
      KOR: 'South Korea',
      SSD: 'South Sudan',
      ESP: 'Spain',
      LKA: 'Sri Lanka',
      SDN: 'Sudan',
      SUR: 'Suriname',
      SWE: 'Sweden',
      CHE: 'Switzerland',
      SYR: 'Syria',
      STP: 'São Tomé and Príncipe',
      WSM: 'Sāmoa',
      TWN: 'Taiwan',
      TJK: 'Tajikistan',
      TZA: 'Tanzania',
      THA: 'Thailand',
      GMB: 'The Gambia',
      TGO: 'Togo',
      TKL: 'Tokelau',
      TON: 'Tonga',
      TTO: 'Trinidad and Tobago',
      TUN: 'Tunisia',
      TUR: 'Turkey',
      TKM: 'Turkmenistan',
      TCA: 'Turks and Caicos Islands',
      TUV: 'Tuvalu',
      UGA: 'Uganda',
      UKR: 'Ukraine',
      ARE: 'United Arab Emirates',
      GBR: 'United Kingdom',
      USA: 'United States of America',
      URY: 'Uruguay',
      UZB: 'Uzbekistan',
      VUT: 'Vanuatu',
      VAT: 'Vatican City',
      VEN: 'Venezuela',
      VNM: 'Vietnam',
      ESH: 'Western Sahara',
      YEM: 'Yemen',
      ZMB: 'Zambia',
      ZWE: 'Zimbabwe'
    }
  },
  'mx-es': {
    delivery: 'Entrega',
    more: 'Ver más',
    orderNo: 'Pedido',
    predictions:{
      OutForDelivery: 'Tu paquete llegará <b>hoy</b>',
      DestinationDeliveryCenter: 'Tu paquete llegará <b>mañana</b>',
    },
    openingHours: 'Horario de apertura',
    weekDays:[
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ],
    alwaysOpened: 'Abierto las 24 horas',
    closesIn: 'Cierra a las [time]',
    opensIn: 'Abre a las [time]',
    searchOrder: 'Busca tu pedido',
    zip: 'Código postal',
    search: 'Buscar',
    containsOf: 'incluye',
    deliveries: 'entregas',
    showPickuplocation: 'Mostrar ubicación para la recolección',
    liveDelivery: 'Rastrea tu pedido',
    articleList: 'Artículos en este paquete',
    deliveryAddress: 'Dirección de entrega',
  }
};

module.exports = {
  translations,
  languages,
  transitStates,
  getIconName
};
