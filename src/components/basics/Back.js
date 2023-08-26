import { TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = height * .08

const Back = ({ onPress, color, customStyle }) => {
	return (
		<TouchableOpacity onPress={onPress} style={customStyle ? customStyle : styles.container}>
			<MaterialCommunityIconsIcon name={'arrow-left-bold-hexagon-outline'} size={ICON_SIZE} color={color ? color : 'red'} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 1,
	}
})

export default Back