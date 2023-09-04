import { Dimensions, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { preventAutoHideAsync } from 'expo-splash-screen'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

import { Provider as MusicProvider } from 'contexts/Music'
import { Provider as LanguageProvider } from 'contexts/Language'
import { Provider as GameProvider } from 'contexts/Game'
import { Provider as ConnectionProvider } from 'contexts/Connection'
import { Provider as WelcomeProvider } from 'contexts/Welcome'
import { Provider as SplashScreenProvider } from 'contexts/SplashScreen'
import { Provider as FontProvider } from 'contexts/Font'

import HomeStack from 'components/stacks/HomeStack'
import LearnStack from 'components/stacks/LearnStack'
import WelcomeStack from 'components/stacks/WelcomeStack'
import Settings from 'components/Settings'
import Connection from 'components/Connection'

const Stack = createNativeStackNavigator()

const AppContent = () => (
  <MusicProvider>
    <SplashScreenProvider>
      <WelcomeProvider>
        <GameProvider>
          <WelcomeStack>
            <ConnectionProvider>
              <>
                <StatusBar />
                <Connection />
                <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="HomeStack" component={HomeStack} />
                  <Stack.Screen name="LearnStack" component={LearnStack} />
                  <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
              </>
            </ConnectionProvider>
          </WelcomeStack>
        </GameProvider>
      </WelcomeProvider>
    </SplashScreenProvider>
  </MusicProvider>
)

const MyTabs = () => {
	preventAutoHideAsync()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FontProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </FontProvider>
    </GestureHandlerRootView>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  )
}

export default App