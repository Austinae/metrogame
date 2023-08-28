import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Learn from 'components/Learn'
import SubwayInformation from 'components/learn/SubwayInformation'
import LearnRegionPick from 'components/learn/LearnRegionPick'
import World from 'components/learn/World'
import ExploreRegionPick from 'components/learn/ExploreRegionPick'
import ExploreMap from 'components/learn/ExploreMap'

const HomeStack = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator
			initialRouteName="Learn"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Learn" component={Learn} />
			<Stack.Screen name="World" component={World} />
			<Stack.Screen name="LearnRegionPick" component={LearnRegionPick} />
			<Stack.Screen name="SubwayInformation" component={SubwayInformation} />
			<Stack.Screen name="ExploreRegionPick" component={ExploreRegionPick} />
			<Stack.Screen name="ExploreMap" component={ExploreMap} />


			{/* <Stack.Screen name="SubwayInformation" component={SubwayInformation} /> */}
		</Stack.Navigator>
	)
}

export default HomeStack