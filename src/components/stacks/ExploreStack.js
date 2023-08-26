import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Explore from 'components/Explore'
import ExploreMap from 'components/explore/ExploreMap'

const ExploreStack = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator
			initialRouteName="Explore"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Explore" component={Explore} />
			<Stack.Screen name="ExploreMap" component={ExploreMap} />
		</Stack.Navigator>
	)
}

export default ExploreStack