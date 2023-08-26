import * as SplashScreen from 'expo-splash-screen'

const Provider = ({ children }) => {
  SplashScreen.hideAsync()
	
  return <>{children}</>
}

export { Provider }
