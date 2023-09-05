import { View, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('window')
const FONT_SIZE = width * .03
const COIN_HEX = '#FFD700'
const COIN_SIZE = width * .03
const CONTAINER_PADDING = width * .03
const CONTAINER_LEFT_MARGIN = width - 115

const Coins = ({ containerStyle }) => {
  const { coins } = useGameContext()

	return (
		<View style={[styles.container, { ...containerStyle }]}>
			<Text style={styles.coinsText}>{coins}</Text>
			<FontAwesome5Icon name={'coins'} color={COIN_HEX} size={COIN_SIZE} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'grey',
		borderRadius: FONT_SIZE + CONTAINER_PADDING,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: 90,
		height: 45,
		marginLeft: CONTAINER_LEFT_MARGIN,
		left: 20,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	coinsText: {
		fontSize: FONT_SIZE,
		fontFamily: 'Raleway',
		color: 'white',
		marginRight: 10,
	}
})

export default Coins