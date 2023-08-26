import { useState, useEffect } from 'react'
import { loadAsync } from 'expo-font'

import parisineRegular from 'assets/fonts/Parisine-regular.otf'
import ralewayRegular from 'assets/fonts/Raleway-regular.ttf'
import ralewayBold from 'assets/fonts/Raleway-bold.ttf'

const FONTS = { 'Parisine': parisineRegular, 'Raleway': ralewayRegular, 'Raleway-bold': ralewayBold } 

const Provider = ({ children }) => {
	const [fontLoaded, setFontLoaded] = useState(false)
	useEffect(() => { const loadFonts = async() => { await loadAsync(FONTS); setFontLoaded(true) }; loadFonts() }, [])

	if (!fontLoaded) return null

	
  return <>{children}</>
}

export { Provider }
