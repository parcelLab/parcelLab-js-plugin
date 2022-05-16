/* ---------------------------------- Icons --------------------------------- */

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
  ru: {
    name: 'ru',
    label: 'Русский',
    code: 'RUS',
    icon: 'https://cdn.parcellab.com/img/flags/ru.png'
  },
  jp: {
	  name: 'jp',
	  label: '日本語',
	  code: 'JPN',
	  icon: 'https://cdn.parcellab.com/img/flags/jp.png'

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
    alwaysOpened: 'Open 24 hours a day',
    closesIn: 'Closes at',
    opensIn: 'Opens at',
    error: {
      delivery: 'We have not received your tracking information yet.',
      search: 'We couldn\'t find any information for this delivery – please contact our Customer Service team.'
    },
    searchOrder: 'Search for your order',
    zip: 'Zip code',
    search: 'Search',
    containsOf: 'includes',
    deliveries: 'deliveries',
    showPickuplocation: 'Show collection location',
    liveDelivery: 'Track your order',
    articleList: 'Items in this package',
    deliveryAddress: 'Delivery address',
    liveTrackingLastUpdate: 'Last update',
    liveTrackingStationsNext: 'The driver\'s on his way to you.',
    liveTrackingStation: '### stopover',
    liveTrackingStations: '### stopovers',
    liveTrackingCaption: 'until your shipment arrives.',
    liveTrackingCaptionNext: 'You are the next stopover.',
    liveTrackingPrediction: 'Arrival time approx.'
  },
  ru: {
    delivery: 'Доставка',
    more: 'Показать больше',
    orderNo: 'Заказ',
    predictions: {
      OutForDelivery: 'Посылку доставят <b>сегодня</b>.',
      DestinationDeliveryCenter: 'Посылку доставят <b>завтра</b>.'
    },
    openingHours: 'Часы работы',
    openingHoursWarning: '',
    weekDays: [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье'
    ],
    alwaysOpened: 'Открыто круглосуточно',
    closesIn: 'Закрывается в',
    opensIn: 'Открывается в',
    error: {
      delivery: 'Мы еще не получили информацию о заказе.',
      search: 'Не удалось найти информацию об этом заказе. Пожалуйста, обратитесь в клиентскую службу.'
    },
    searchOrder: 'Поиск заказа',
    zip: 'Почтовый индекс',
    search: 'Искать',
    containsOf: 'В этом заказе:',
    deliveries: 'Доставки',
    showPickuplocation: 'Посмотреть адрес пункта',
    liveDelivery: 'Отследить заказ',
    articleList: 'Товары в посылке',
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
    delivery: 'Zustellung',
    more: 'Mehr zeigen',
    orderNo: 'Bestellung',
    predictions: {
      OutForDelivery: 'Ihr Paket kommt <b>heute</b>an',
      DestinationDeliveryCenter: 'Ihr Paket kommt <b>morgen </b>an'
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
    alwaysOpened: '24 Stunden geöffnet',
    closesIn: 'Schließt um',
    opensIn: 'Öffnet um',
    error: {
      delivery: 'Es sind noch keine Tracking-Informationen verfügbar',
      search: 'Leider konnten wir für diese Sendung keine Informationen finden. Bitte wenden Sie sich an unseren Kundenservice'
    },
    searchOrder: 'Bestellung suchen',
    zip: 'Postleitzahl',
    search: 'Suchen',
    containsOf: 'beinhaltet',
    deliveries: 'Zustellungen',
    showPickuplocation: 'Abholort anzeigen',
    liveDelivery: 'Bestellung verfolgen',
    articleList: 'Artikel in diesem Paket',
    deliveryAddress: 'Lieferadresse',
    liveTrackingLastUpdate: 'Letzte Aktualisierung',
    liveTrackingStationsNext: 'Der Fahrer ist auf dem Weg zu dir.',
    liveTrackingStation: 'Noch ### Stopp vor dir',
    liveTrackingStations: 'Noch ### Stopps vor dir',
    liveTrackingCaption: 'bis deine Lieferung bei dir ist.',
    liveTrackingCaptionNext: 'Du bist der nächste Stopp.',
    liveTrackingPrediction: 'Ankunftszeit ca.'
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
    more: 'Voir plus.',
    orderNo: 'Commande',
    predictions: {
      OutForDelivery: "Votre colis arrivera <b>aujourd'hui</b>.",
      DestinationDeliveryCenter: 'Votre colis arrivera <b>demain</b>.'
    },
    openingHours: "Horaires d'ouverture",
    weekDays: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ],
    alwaysOpened: 'Ouvert 24h/24',
    closesIn: 'ferme à',
    opensIn: 'ouvre à',
    error: {
      delivery: "Nous n'avons pas encore reçu vos informations de suivi.",
      search: "Nous n'avons trouvé aucune information pour cette livraison - veuillez contacter notre équipe du Service client."
    },
    searchOrder: 'Chercher ma commande',
	zip: 'Code postal',
    search: 'Chercher',
    containsOf: 'inclut',
    deliveries: 'livraisons',
	liveDelivery:'Suivre ma commande',
    showPickuplocation: 'Afficher le lieu de collecte',
    articleList: 'Articles dans ce colis',
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
    more: 'Vis mere',
    orderNo: 'Ordre',
    predictions: {
      OutForDelivery: 'Din pakke ankommer <b>i dag</b>.',
      DestinationDeliveryCenter: 'Din pakke ankommer <b>i morgen</b>.'
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
    alwaysOpened: 'Åben 24 timer i døgnet',
    closesIn: 'Lukker',
    opensIn: 'Åbner',
    error: {
      delivery: 'Vi har endnu ikke modtaget dine sporingsoplysninger.',
      search: 'Vi kunne ikke finde nogen oplysninger om denne levering – kontakt venligst vores kundeservice-team.'
    },
    searchOrder: 'Søg efter din ordre',
    search: 'Søg',
	zip:'Postnummer',
    containsOf: 'omfatter',
    deliveries: 'leveringer',
    showPickuplocation: 'Vis afhentningslokation',
	liveDelivery: 'Spor din ordre',
    articleList: 'Produkter i denne pakke',
    deliveryAddress: 'Leveringsadresse'
  },
  sv: {
    delivery: 'Leverans',
    more: 'Visa mer',
    orderNo: 'Beställning:',
    predictions: {
      OutForDelivery: 'Ditt paket kommer att anlända <b>idag</b>.',
      DestinationDeliveryCenter: 'Ditt paket kommer att anlända <b>imorgon</b>.'
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
    alwaysOpened: 'Öppet dygnet runt',
    closesIn: 'Stänger klockan',
    opensIn: 'Öppnar klockan',
    error: {
      delivery: 'Vi har inte tagit emot dina spårningsuppgifter än.',
      search: 'Vi hittar ingen information om denna leverans – vänligen kontakta vårt kundtjänstteam.'
    },
    searchOrder: 'Sök efter din beställning',
	zip: 'Postnummer',
    search: 'Sök',
    containsOf: 'inkluderar',
    deliveries: 'leveranser',
	liveDelivery: 'Spåra beställning',
    showPickuplocation: 'Visa var du hittar upphämtningsstället',
    articleList: 'Varor i detta paket',
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
    more: 'Ver mais',
    orderNo: 'Pedido',
    predictions: {
      OutForDelivery: 'Seu pacote chegará <b>hoje</b>.',
      DestinationDeliveryCenter: 'Seu pacote chegará <b>amanhã</b>.'
    },
    openingHours: 'Horário de atendimento',
    weekDays: [
      'Domingo',
      'Segunda-feira',
      'Terça',
      'quarta-feira',
      'quinta-feira',
      'Sexta-feira',
      'Sábado'
    ],
    alwaysOpened: 'Aberto 24 horas por dia',
    closesIn: 'fecha às',
    opensIn: 'abre às',
    error: {
      delivery: 'Ainda não recebemos suas informações de rastreamento.',
      search: 'Não encontramos nenhuma informação para esta entrega. Por favor, entre em contato com o nosso time de Apoio ao cliente.'
    },
    searchOrder: 'Procure seu pedido',
    search: 'Procurar',
	zip: 'CEP',
    containsOf: 'inclui',
    deliveries: 'entregas',
	liveDelivery: 'Acompanhe seu pedido',
    showPickuplocation: 'Mostrar o local de retirada',
    articleList: 'Itens neste pacote',
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
  },
  jp: {
    delivery: '配送',
    more: '詳細を見る',
    orderNo: 'ご注文',
    predictions: {
      OutForDelivery: 'ご注文の商品は<b>本日お届け予定です</b>',
      DestinationDeliveryCenter: 'ご注文の商品は<b>明日お届け予定です</b>'
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
    closesIn: '閉店',
    opensIn: '開店',
    error: {
      delivery: '追跡情報を確認中です.',
      search: 'この配送について情報を表示できません。お手数ですが、カスタマーサービスまでお問い合わせいただきますようお願いいたします.'
    },
    searchOrder: 'ご注文を検索',
    zip: '郵便番号',
    search: '検索',
    containsOf: '含む',
    deliveries: '配送',
    showPickuplocation: '集荷先住所を見る',
    liveDelivery: 'ご注文の追跡',
    articleList: 'この荷物に含まれる商品',
    deliveryAddress: 'お届け先住所'
  }
}

module.exports = {
  translations,
  languages,
  transitStates,
  getIconName
}
