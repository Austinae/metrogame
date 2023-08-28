import { Dimensions, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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

const Tab = createBottomTabNavigator()
const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .05
const TAB_HEIGHT = width * .12
const TAB_FONT_SIZE = width * .023
const TAB_CONTAINER_MARGIN = width * .01
const NAV_SCREEN_OPTIONS = {
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: '#AAA',
  headerShown: false,
  tabBarItemStyle: { backgroundColor: 'grey', paddingBottom: TAB_CONTAINER_MARGIN },
  tabBarActiveBackgroundColor: 'white',
  tabBarIconStyle: { width: ICON_SIZE, height: ICON_SIZE },
  tabBarLabelStyle: { fontSize: TAB_FONT_SIZE, fontFamily: 'Raleway-bold' },
}

const AppContent = () => {
  const { t } = useTranslation()

  return (
    <MusicProvider>
      <SplashScreenProvider>
        <WelcomeProvider>
          <GameProvider>
            <WelcomeStack>
              <ConnectionProvider>
                <>
                  <StatusBar />
                  <Connection />
                  <Tab.Navigator
                    initialRouteName="HomeStack"
                    screenOptions={NAV_SCREEN_OPTIONS}
                  >
                    <Tab.Screen
                      name="HomeStack"
                      component={HomeStack}
                      options={{
                        tabBarLabel: t("navigationTitle.home"),
                        tabBarIcon: ({ color }) => (
                          <Ionicon name="md-home" color={color} size={ICON_SIZE} />
                        )
                      }}
                    />
                    <Tab.Screen
                      name="LearnStack"
                      component={LearnStack}
                      options={{
                        tabBarLabel: t("navigationTitle.learn"),
                        tabBarIcon: ({ color }) => (
                          <Ionicon name="md-book" color={color} size={ICON_SIZE} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Settings"
                      component={Settings}
                      options={{
                        tabBarLabel: t("navigationTitle.settings"),
                        tabBarIcon: ({ color }) => (
                          <Ionicon name="md-settings" color={color} size={ICON_SIZE} />
                        ),
                      }}
                    />
                  </Tab.Navigator>
                </>
              </ConnectionProvider>
            </WelcomeStack>
          </GameProvider>
        </WelcomeProvider>
      </SplashScreenProvider>
    </MusicProvider>
  )
}


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