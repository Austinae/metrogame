import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .2
const ICON_COLOR = 'grey'
const STORE_TOP = width > 700 ? 100 : 50

const StoreButton = ({ navigation }) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate('HomeStack', { screen: 'Store' })} style={styles.container}>
			<MaterialIcon name={'local-grocery-store'} size={ICON_SIZE} color={ICON_COLOR} />
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

