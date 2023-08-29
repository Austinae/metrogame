import { View, Text, StyleSheet, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('window')
const FONT_SIZE = width * .04
const COIN_HEX = '#FFD700'
const COIN_SIZE = width * .04
const CONTAINER_PADDING = width * .03
const CONTAINER_LEFT_PADDING = width - 105

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
		gap: 7,
		alignItems: 'center',
		justifyContent: 'center',
		width: 80,
		marginLeft: CONTAINER_LEFT_PADDING,
		marginTop: 10,
	},
	coinsText: {
		fontSize: FONT_SIZE,
		fontFamily: 'Raleway',
		color: 'white',
		marginBottom: 6,
	}
})

export default Coins