import { createContext, useContext, useState, useEffect } from 'react'
import { storeData, retrieveData, removeItemValue } from 'helpers/localStorage'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from 'locales/en.json'
import fr from 'locales/fr.json'
import es from 'locales/es.json'
import zh from 'locales/zh.json'
import hi from 'locales/hi.json'
import ar from 'locales/ar.json'
import ru from 'locales/ru.json'
import 'locales/index'

const resources = {
  en: {translation: en},
  fr: {translation: fr},
  es: {translation: es},
  zh: {translation: zh},
  hi: {translation: hi},
  ar: {translation: ar},
  ru: {translation: ru},
}

const languagePickerData = [
	{key:'en', value:'English'},
	{key:'fr', value:'Français'},
	{key:'es', value:'Español'},
	{key:'zh', value:'中文'},
	{key:'hi', value:'हिन्दी'},
	{key:'ar', value: "اَلْعَرَبِيَّةُ"},
	{key:'ru', value:'русский'},
]

const LANGUAGE_LOCAL_KEY = 'language'

const Context = createContext({
	language: null,
	setLanguage: () => null,
})

const Provider = ({ ...props }) => {
	const [language, setLanguage] = useState(null)

	useEffect(() => {
		// removeItemValue(LANGUAGE_LOCAL_KEY)
		const checkLocalStorage =  async () => {
			const languageLocal = await retrieveData(LANGUAGE_LOCAL_KEY)
			if (languageLocal == null) {setLanguage('en')}
			else {setLanguage(languageLocal)}
		}
		checkLocalStorage()
	}, [])

	useEffect(() => {
		const changeLocalStorage = async () => storeData(LANGUAGE_LOCAL_KEY, language)
		changeLocalStorage()
		i18n.use(initReactI18next).init({
			resources,
			lng: language,
			fallbackLng: 'en',
			compatibilityJSON: 'v3',
			interpolation: {
				escapeValue: false
			}
		})
	}, [language])

	const providedValues = { language, setLanguage, languagePickerData }

  return (
    <Context.Provider
      value={providedValues}
      {...props}
    />
  )
}

const useLanguageContext = () => useContext(Context)

export default useLanguageContext
export { Provider }