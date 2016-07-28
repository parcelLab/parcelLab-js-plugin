// Loads and renders information about the sender, i.e. the shop

var Api = require('./api.js');
var Utils = require('./utils/utils.js');
var Static = require('./static.js');
var baseUrl = 'https://api.parcellab.com/';
var endpoint = 'sender';
var Templates = require('../../templates/');
var rootOptions;
var devErrorMsg = 'No ### placeholder specified, please check https://docs.parcellab.com/';

/**
 * Initializes the sender module.
 * @param  {Array} query, array of objects {name,value}.
 * @param  {String} lang, code of the language.
 */
function getSenderAndRender(options, requestQuery, lang) {
  rootOptions = options;
  Api.loadFromAPI(baseUrl, endpoint, requestQuery, 'GET', null, function (err, sender) {
    if (err) return lang.showError('shipper');
    renderSenderInfo(sender);

    if (sender.tickets)
      renderTicketsForm(lang);
    if (sender.faq)
      renderSenderFAQ(sender.faq);
  });
}

function getSenderInfo(requestQuery, callback) {
  Api.loadFromAPI(baseUrl, endpoint, requestQuery, 'GET', null, function (err, sender) {
    if (err) return lang.showError('shipper');
    callback(sender);
  });
}

//////////////////////
// Render functions //
//////////////////////

/**
 * Renders the sender information.
 * @param  {Object} sender, the sender object recieved from the api.
 */
function renderSenderInfo(sender) {
  var senderHTML = document.querySelector(rootOptions.info);
  if (!senderHTML) return console.log(devErrorMsg.replace('###', 'info'));

  var social = [];
  senderHTML.innerHTML = '';
  if (sender && sender.name) {
    sender.contact.website = sender.contact.website;
    if (sender.social) {
      for (var key in sender.social) {
        var urlElements = sender.social[key].split('/');
        social.push({
          socialName: Static.socialIcons[key].prefix + urlElements[urlElements.length - 1],
          link: sender.social[key],
          name: key,
          color: Static.socialIcons[key].color,
        });
      }
    }

    if (sender.customisation.backgroundUrl !== '') {
      document.querySelector('body').style.background =
        'url("' + sender.customisation.backgroundUrl + '")';
      document.querySelector('body').style.backgroundSize =
        sender.customisation.backgroundStyle !== 'tile' ? 'cover' : '';
    }
  }

  senderHTML.innerHTML = Templates.get('sender')({
    sender: sender,
    social: social,
  });
}

/**
 * Renders the FAQ from the given user.
 * @param  {Array} faq, array of objects{question,answer}.
 */
function renderSenderFAQ(faq) {
  var faqObject = document.querySelector(rootOptions.faq);
  if (!faqObject) return console.log(devErrorMsg.replace('###', 'faq'));
  faqObject.innerHTML = '';
  for (var i = 0; i < faq.length; i++) {
    var f = faq[i];
    faqObject.innerHTML += Templates.get('faq')({
      i: i,
      f: f,
    });
  }

  initFaq();
}

/**
 * Renders the ticket form.
 * @param  {String} lang, languangue code.
 */
function renderTicketsForm(lang) {
  var ticketHolder = document.querySelector(rootOptions.questionBox);
  if (!ticketHolder) return console.log(devErrorMsg.replace('###', 'questionBox'));
  ticketHolder.innerHTML = '';
  data = {
    anyquestion: lang.data('anyquestion'),
    ask: lang.data('ask'),
  };

  ticketHolder.innerHTML = Templates.get('tickets')(data);
  var req = Utils.prepareQuery(query);

  addFormListener(ticketHolder, req, lang);
}

/**
 * Renders the ticket result/alert
 * @param  {Boolean} result, the result of the ticket form.
 * @param  {String} lang, language code.
 */
function renderTicketResult(result, lang) {

  var cls = '';
  var text = '';
  if (!result) {
    cls = 'alert-success';
    text = lang.data('ticketSuccess');
  } else {
    cls = 'alert-danger';
    text = lang.data('ticketFail');
  }

  var resultHMTL = '<div class="pl-alert ' + cls + '" role="alert">' + text + '</div>';
  var resultBox = document.querySelector(rootOptions.resultBox);
  if (!resultBox) return console.log(devErrorMsg.replace('###', 'resultBox'));
  resultBox.innerHTML = resultHMTL;
}

/**
 * @param  {Object} data, the data that is going to be send to the API.
 * @param  {String} lang, languge code.
 */
function addFormListener(ticketHolder, data, lang) {
  var form = ticketHolder.querySelector('#form-tickets');
  var iconLoading = '<i class="fa fa-spinner"></i>';
  var noMessage = '<div class="pl-alert alert-danger" role="alert">' +
    lang.data('emptyMsg') +
    '</div>';

  var statusInputs = function (status) {
    elems = form.querySelectorAll('input, textarea');
    for (var i = 0; i < elems.length; i++) {
      if (status) elems[i].setAttribute('disabled', 'disabled');
      else elems[i].removeAttribute('disabled');
    }
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    data.message = form.question.value;
    if (!data.message) {
      var resultBox = document.querySelector(rootOptions.resultBox);
      if (!resultBox) return console.log(devErrorMsg.replace('###', 'resultBox'));

      resultBox.innerHTML = noMessage;
      return true;
    }

    var oldHtml = form.querySelector('button[type=submit]').innerHTML;
    statusInputs(true);
    form.querySelector('button[type=submit]').innerHTML = iconLoading;

    //var tempUrl = "http://localhost:16135/";

    Api.loadFromAPI(baseUrl, 'tickets', [], 'POST', data, function (err, data) {
      statusInputs(false);
      form.querySelector('button[type=submit]').innerHTML = oldHtml;

      if (err || !data) return renderTicketResult(err, lang);

      renderTicketResult(null, lang);
    });
  });
}

function initFaq() {
  Utils.eventFromParent('click', rootOptions.faq, '.parcelLab-panel-title a', function (e) {
    e.preventDefault();
    var target = e.target;
    Utils.toggleDisplay(document.querySelector(target.getAttribute('target')));
  });
}

module.exports = {
  getSenderInfo: getSenderInfo,
  getSenderAndRender: getSenderAndRender,
};
