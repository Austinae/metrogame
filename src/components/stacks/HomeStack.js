import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from 'components/Home'
import RegionSelection from 'components/home/play/RegionSelection'
import GamemodeSelection from 'components/home/play/GamemodeSelection'
import LinesSelection from 'components/home/play/LinesSelection'
import LengthSelection from 'components/home/play/LengthSelection'

import Choice from 'components/home/play/gamemodes/Choice'
import Distance from 'components/home/play/gamemodes/Distance'
import Store from 'components/home/Store'

const HomeStack = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Store" component={Store} />
			<Stack.Screen name="RegionSelection" component={RegionSelection} />
			<Stack.Screen name="GamemodeSelection" component={GamemodeSelection} />
			<Stack.Screen name="LinesSelection" component={LinesSelection} />
			<Stack.Screen name="Choice" component={Choice} />
			<Stack.Screen name="Distance" component={Distance} />
			{/* <Stack.Screen name="Classic" component={Classic} /> */}
			{/* <Stack.Screen name="LengthSelection" component={LengthSelection} /> */}
		</Stack.Navigator>
	)
}

export default HomeStack