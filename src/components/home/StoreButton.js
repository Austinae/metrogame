import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .17
const ICON_COLOR = 'grey'
const STORE_TOP = width > 700 ? 110 : 60

const StoreButton = ({ navigation }) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate('HomeStack', { screen: 'Store' })} style={styles.container}>
			<FontAwesome5Icon name={"store"} size={ICON_SIZE} color={ICON_COLOR} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: STORE_TOP,
		right: 10,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default StoreButton

