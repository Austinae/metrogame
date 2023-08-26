import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('window')
const NAVIGATION_TAB_HEIGHT = width * .02
const ABANDON_BUTTON_SIZE = width * .08
const TIMES_ICON_SIZE = width * .06
const TEXT_FONT_SIZE = width * .04

const Abandon = ({ setIsGameEndModalVisible, setAbandoned, setIsTimmingRunning }) => {
	const { t } = useTranslation()

	const onPress = () => {
		setAbandoned(true)
		setIsGameEndModalVisible(true)
		setIsTimmingRunning(false)
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Text style={styles.text}>{t("exit")}</Text>
				<View
					style={{
						width: ABANDON_BUTTON_SIZE,
						height: ABANDON_BUTTON_SIZE,
						borderRadius: ABANDON_BUTTON_SIZE / 2,
						backgroundColor: 'red',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<FontAwesomeIcon
						name="times"
						size={TIMES_ICON_SIZE}
						color="#BDBDBD"
						style={{borderColor: 'transparent'}}
					/>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: NAVIGATION_TAB_HEIGHT,
		bottom: NAVIGATION_TAB_HEIGHT,
		height: ABANDON_BUTTON_SIZE,
		borderRadius: ABANDON_BUTTON_SIZE / 2,
		backgroundColor: 'coral',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: TEXT_FONT_SIZE,
		gap: TEXT_FONT_SIZE,
	},
	text: {
		fontFamily: 'Parisine',
		fontSize: TEXT_FONT_SIZE,
	}
})

export default Abandon