var gCurrLang = 'en'

var gTrans = {
    title: {
        en: 'Welcome to "Give Me A  /br" Book Store',
        he: 'ברוכים הבאים לחנות הספרים ״תן לי הפסקה״'
    },
    'filter-title': {
        en: 'Filter',
        he: 'בחר'
    },
    'title-filter-label': {
        en: 'Filter By Title',
        he: 'בחר לפי כותרת'
    },
    'title-filter-placeholder': {
        en: 'Title',
        he: 'כותרת'
    },
    'max-filter-label': {
        en: 'Max Price',
        he: 'מחיר מקסימלי'
    },
    'min-filter-label': {
        en: 'Min Rating',
        he: 'דירוג מינימלי'
    },
    'sort-by-label': {
        en: 'Sort By',
        he: 'סנן על פי'
    },
    'default-option': {
        en: 'Select Sorting',
        he: 'בחר סינון'
    },
    'title-option': {
        en: 'By Title',
        he: 'כותרת'
    },
    'price-option': {
        en: 'By Price',
        he: 'מחיר'
    },
    'rating-option': {
        en: 'By Rating',
        he: 'דירוג'
    },
    'descending-label': {
        en: 'Descending',
        he: 'סדר יורד'
    },
    'add-btn': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'next-page-btn': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'img-th': {
        en: 'Img',
        he: 'תמונה'
    },
    'id-th': {
        en: 'Id',
        he: 'מק״ט'
    },
    'title-th': {
        en: 'Title',
        he: 'כותרת'
    },
    'price-th': {
        en: 'Price',
        he: 'מחיר'
    },
    'rating-th': {
        en: 'Rating',
        he: 'דירוג'
    },
    'actions-th': {
        en: 'Actions',
        he: 'פעולות'
    }
}

function getTrans(transKey) {
    // DONE: if key is unknown return 'UNKNOWN'
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    // DONE: get from gTrans
    let translation = transMap[gCurrLang]
    // DONE: If translation not found - use english
    if (!translation) translation = transMap.en
    return translation
}
function onSetLang(lang) {
    setLang(lang)
    // const rtlLangs = ['he', 'ar']
    // DONE: if lang is hebrew add RTL class to document.body
    if (lang === 'he') {
        document.body.classList.add('rtl')
        //in css: body.rel {direction:rtl}
        setQueryParams({ lng: 'he' })
    } else {
        document.body.classList.remove('rtl')
        setQueryParams({ lng: 'en' })
    }
    render()
}
function doTrans() {
    // DONE: 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        if (el.placeholder) el.placeholder = translation
        else el.innerText = translation

        // const prop = el.placeholder ? 'placeholder': 'innerText'
        // el[prop] = translation


        // for each el:
        // get the data-trans and use getTrans to replace the innerText 
        // ITP: support placeholder    
    })
}

function setLang(lang) {
    gCurrLang = lang
}

function formatNumSimple(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}

function formatDate(time) {

    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

// Kilometers to Miles
function kmToMiles(km) {
    return km / 1.609
}

// Kilograms to Pounds:
function kgToLbs(kg) {
    return kg * 2.20462262185
}


function getPastRelativeFrom(ts) {
    const diff = Date.now() - new Date(ts)
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24

    const formatter = new Intl.RelativeTimeFormat('en-US', {
        numeric: 'auto'
    })
    if (seconds <= 60) return formatter.format(-seconds, 'seconds')
    if (minutes <= 60) return formatter.format(-minutes, 'minutes')
    if (hours <= 24) return formatter.format(-hours, 'hours')
    return formatter.format(-days, 'days')
}
