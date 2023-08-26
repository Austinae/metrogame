import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from './en.json'

const resources = {
  en: {translation: en},
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
})