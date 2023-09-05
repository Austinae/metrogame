import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .08
const ICON_COLOR = 'grey'
const STORE_TOP = width > 700 ? 40 : 50

const SettingsButton = ({ navigation }) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Settings', { screen: 'Settings' })} style={styles.container}>
			<FontAwesome5Icon name={"cog"} size={ICON_SIZE} color={ICON_COLOR} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: STORE_TOP,
		left: 10,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default SettingsButton

