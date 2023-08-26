import { createContext, useContext, useState, useEffect } from 'react'
import { storeData, retrieveData, removeItemValue, removeMulti } from 'helpers/localStorage'

const WELCOME_LOCAL_KEY = 'welcome'

const Context = createContext({
	hasAlreadySeenWelcome: null,
	setHasAlreadySeenWelcome: () => null,
})

const LOCAL_KEYS = [
	'mapStyles',
	'mapStyle',
	'markers',
	'marker',
	'coins',
	'recentlyPlayed',
]

const Provider = ({ ...props }) => {
	const [hasAlreadySeenWelcome, setHasAlreadySeenWelcome] = useState(null)

	useEffect(() => {
		removeMulti(LOCAL_KEYS)
		// removeItemValue(WELCOME_LOCAL_KEY) // forces app to show welcome page
		const checkLocalStorage =  async () => {
			const hasAlreadySeenWelcomeLocal = await retrieveData(WELCOME_LOCAL_KEY)
			if (hasAlreadySeenWelcomeLocal == null) {setHasAlreadySeenWelcome(false)}
			else {setHasAlreadySeenWelcome(hasAlreadySeenWelcomeLocal)}
		}
		checkLocalStorage()
	}, [])

	useEffect(() => {const changeLocalStorage = async () => storeData(WELCOME_LOCAL_KEY, hasAlreadySeenWelcome); changeLocalStorage()}, [hasAlreadySeenWelcome])

	const providedValues = { hasAlreadySeenWelcome, setHasAlreadySeenWelcome }

  return (
    <Context.Provider
      value={providedValues}
      {...props}
    />
  )
}

const useWelcomeContext = () => useContext(Context)

export default useWelcomeContext
export { Provider }