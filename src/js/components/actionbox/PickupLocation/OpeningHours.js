const html = require('nanohtml')
const raw = require('nanohtml/raw')
const translate = require('../../../lib/translator').translate
const Icon = require('../../Icon')

const currentWorkingDay = new Date().getDay()

function formatHourElement (hel) {
  if (hel.length === 4) {
    return `${hel.substring(0, 2)}:${hel.substring(2)}`
  } else return hel
}

function minutesOpen (ophObj) {
  const now = new Date()
  const closing = new Date()

  if (ophObj.close.day === now.getDay()) {
    closing.setHours(ophObj.close.time.substring(0, 2))
    closing.setMinutes(ophObj.close.time.substring(2))
  } else if (ophObj.close.day === now.getDay() + 1) {
    const ref = new Date(closing)
    closing.setDate(ref.getDate() + 1) // add 1 day
    closing.setHours(ophObj.close.time.substring(0, 2))
    closing.setMinutes(ophObj.close.time.substring(2))
  } else {
    throw new Error('Cant determine minutesOpen')
  }

  return (closing - now) / 1000 / 60
}

function dateifyOPHours (ophObj) {
  try {
    const now = new Date()
    let ref = null
    const res = {
      open: new Date(),
      close: new Date()
    }

    // open
    if (ophObj.open.day === now.getDay()) {
      res.open.setHours(ophObj.open.time.substring(0, 2))
      res.open.setMinutes(ophObj.open.time.substring(2))
    } else if (ophObj.open.day === now.getDay() + 1) {
      ref = new Date(res.open)
      res.open.setDate(ref.getDate() + 1) // add 1 day
      res.open.setHours(ophObj.open.time.substring(0, 2))
      res.open.setMinutes(ophObj.open.time.substring(2))
    }

    // close
    if (ophObj.close.day === now.getDay()) {
      res.close.setHours(ophObj.close.time.substring(0, 2))
      res.close.setMinutes(ophObj.close.time.substring(2))
    } else if (ophObj.close.day === now.getDay() + 1) {
      ref = new Date(res.close)
      res.close.setDate(ref.getDate() + 1) // add 1 day
      res.close.setHours(ophObj.close.time.substring(0, 2))
      res.close.setMinutes(ophObj.close.time.substring(2))
    }

    return res
  } catch (e) {
    console.log(e)
    return null
  }
}

function getCurrentTimeSlot (openingHours) {
  const todayTimeSlots = openingHours.filter(ophObj => ophObj.open.day === currentWorkingDay)
  let slot = null
  if (todayTimeSlots.length > 1) {
    const now = new Date()

    todayTimeSlots.forEach(ts => {
      const dts = dateifyOPHours(ts)
      if (dts && (dts.open < now) && (dts.close > now)) slot = ts
    })
  } else if (todayTimeSlots.length === 1) slot = todayTimeSlots[0]
  return slot
}

/// ///////////////////
// render functions //
/// ///////////////////

function renderOpeningHourEntry (ophObj, weekDays, fallBack, hideWeekDay) {
  const weekDay = weekDays[ophObj.open.day]
  let highlightClass = ''
  let fromTill = '-'

  // check if opening and closing times available
  if (ophObj.open && ophObj.close) {
    fromTill = formatHourElement(ophObj.open.time)
    fromTill += ' - '
    fromTill += formatHourElement(ophObj.close.time)
  }

  // check if open 24h
  if (ophObj.open && !ophObj.close && ophObj.open.time === '0000') {
    fromTill = fallBack
  }

  if (ophObj.open.day === currentWorkingDay) highlightClass = 'pl-highlighted-entry'

  return html`
    <div class="pl-col-row pl-opening-hours-entry ${highlightClass}">
      <div class="pl-week-day-col">
        ${(!hideWeekDay) ? weekDay + ':' : raw('<span>&nbsp;</span>')}
      </div>
      <div class="pl-hours-col">
        ${fromTill}
      </div>
    </div>
  `
}

function renderOpeningHoursList (openingHours, lang) {
  const weekDays = translate('weekDays', lang)
  const alwaysOpenedText = translate('alwaysOpened', lang)

  try { // because Object.keys not available on IE < 10
    const sortedOPHours = {}
    const openingHourEntries = []

    // sort opHours
    openingHours.forEach(ophObj => {
      if (sortedOPHours[ophObj.open.day]) sortedOPHours[ophObj.open.day].push(ophObj)
      else sortedOPHours[ophObj.open.day] = [ophObj]
    })

    Object.keys(sortedOPHours).forEach(key => {
      const ophDay = sortedOPHours[key]
      if (ophDay.length > 1) {
        // push first with weekDay text
        openingHourEntries.push(renderOpeningHourEntry(ophDay[0], weekDays, alwaysOpenedText))

        // and remaining without weekday text
        const remaining = ophDay.slice(1)
        for (let i = 0; i < remaining.length; i++) {
          const ophObj = remaining[i]
          openingHourEntries.push(renderOpeningHourEntry(ophObj, weekDays, alwaysOpenedText, true))
        }
      } else if (ophDay.length === 1) {
        openingHourEntries.push(renderOpeningHourEntry(ophDay[0], weekDays, alwaysOpenedText))
      }
    })

    return openingHourEntries
  } catch (e) {
    return []
  }
}

function renderRemainingOpeningTimeText (openingHours, lang) {
  try {
    let result = null

    // find openingHours for today
    const opHours = getCurrentTimeSlot(openingHours)

    if (opHours) {
      // 24 h open!
      if (!opHours.close && opHours.open && opHours.open.time === '0000') {
        return translate('alwaysOpened', lang)
      }

      const remainingMinutes = minutesOpen(opHours)

      if (remainingMinutes > 60) {
        // is open more then 1 h?
        result = `${translate('closesIn', lang)} ${Math.round(remainingMinutes / 60)} h`
      } else if (remainingMinutes > 0 && remainingMinutes < 60) {
        // closes the next 60 m ?
        result = `${translate('closesIn', lang)} ${remainingMinutes} m`
      }
    }
    return result
  } catch (e) {
    console.log(e)
    return null
  }
}

function generateOpeningHoursWarning (openingHoursWarning, lang) {
  const text = translate('openingHoursWarning', lang).replace('###', openingHoursWarning)
  return html`
    <div class="pl-opening-hours-box-warning" style="padding: 10px 20px 20px;font-size:12px;color:#979797;">
      ⚠️ ${text}
    </div>
  `
}

const OpeningHours = function ({ id, actionBox }, lang, openingHoursWarning, emit) {
  const { boxOpen } = actionBox
  const { openingHours } = actionBox.data

  if (!lang || typeof lang !== 'string') lang = 'en' // HACK

  let openingHourEntries = []
  let mobileText = ''

  // check if open 24h
  const alwaysOpened = openingHours.filter(oh =>
    (!oh.open || (oh.open.time !== '0000' && oh.close))
  ).length === 0

  if (alwaysOpened) {
    openingHourEntries = html`<div class="pl-opening-hours-entry">${raw(translate('alwaysOpened', lang))}</div>`
    mobileText = raw(translate('alwaysOpened', lang))
  } else {
    openingHourEntries = renderOpeningHoursList(openingHours, lang)
    mobileText = renderRemainingOpeningTimeText(openingHours, lang)
  }

  const openingHoursCaption = (!alwaysOpened && mobileText) ? html`<span class="pl-closes-in">(${mobileText})</span>` : null

  const mobileIcon = Icon('menu', '#000', '18')
  mobileIcon.style.float = 'right'

  return html`
      <div class="pl-opening-hours-box">
        <div class="pl-box-heading pl-toggle-opening-hours" onclick=${() => emit('toggleOpeningHours', id)}>
          <span class="hide-on-mobile">
            ${raw(translate('openingHours', lang))}
              ${openingHoursCaption ? html`<br>` : null}
            ${openingHoursCaption}
          </span>
          <span class="hide-on-desktop">
            ${mobileText || raw(translate('openingHours', lang))}
            ${mobileIcon}
          </span>
        </div>
        <div class="pl-box-body ${boxOpen ? 'pl-open' : ''}">
          ${openingHourEntries}
        </div>

        ${openingHoursWarning ? generateOpeningHoursWarning(openingHoursWarning, lang) : null}
      </div>
    `
}

module.exports = OpeningHours
