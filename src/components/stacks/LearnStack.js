import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Learn from 'components/Learn'
import SubwayInformation from 'components/learn/SubwayInformation'

const HomeStack = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator
			initialRouteName="Learn"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Learn" component={Learn} />
			<Stack.Screen name="SubwayInformation" component={SubwayInformation} />
		</Stack.Navigator>
	)
}

export default HomeStack