import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'

import Welcome from 'components/welcome/Welcome'
import LanguagePicker from 'components/welcome/LanguagePicker'
import useWelcomeContext from 'contexts/Welcome'

const HomeStack = ({ children }) => {
	const Stack = createNativeStackNavigator()
	const { hasAlreadySeenWelcome } = useWelcomeContext()

	if (hasAlreadySeenWelcome == null) return <>
		{children}
	</>

	if (!hasAlreadySeenWelcome) return (
		<>
			<StatusBar hidden />
			<Stack.Navigator
				initialRouteName="LanguagePicker"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen name="LanguagePicker" component={LanguagePicker} />
				<Stack.Screen name="Welcome" component={Welcome} />
			</Stack.Navigator>
		</>
	)

	return <>
		{children}
	</>
}

export default HomeStack