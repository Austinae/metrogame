import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native'
import { useRef, useEffect } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import useConnectionContext from 'contexts/Connection'
import { useTranslation } from 'react-i18next'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .03
const ICON_SIZE_CONTAINTER = ICON_SIZE * 1.5
const FONT_SIZE = ICON_SIZE
const CONNECTED_BACKGROUND = '#AFE1AF'
const DISCONNECTED_BACKGROUND = '#EE4B2B'

const Connection = () => {
	const { isConnected } = useConnectionContext()
	const animatedScale = useRef(new Animated.Value(isConnected ? 1 : 1.5)).current
	const { t } = useTranslation()

  useEffect(() => {
		if (isConnected) {
			Animated.timing(animatedScale, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}).start()
		} else {
			Animated.timing(animatedScale, {
				toValue: 1.5,
				duration: 500,
				useNativeDriver: false,
			}).start()
		}
  }, [isConnected])

	return (
		<View style={styles.container}>
      {!isConnected && <View style={styles.textContainer}>
				<Text style={styles.text}>{t("connectionInfo")}</Text>
			</View>}
      <Animated.View style={[
				styles.iconContainer,
				{
					backgroundColor: isConnected ? CONNECTED_BACKGROUND : DISCONNECTED_BACKGROUND,
					transform: [{ scale: animatedScale }],
					opacity: isConnected ? 0 : 1,
				}]}
			>
        <FeatherIcon name={isConnected ? 'wifi' : 'wifi-off'} size={ICON_SIZE} color={'black'} />
      </Animated.View>
    </View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 5,
		right: 5,
		height: ICON_SIZE_CONTAINTER,
		zIndex: 5,
		borderRadius: ICON_SIZE_CONTAINTER,
		backgroundColor: 'rgba(,255,255,.5)',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
	},
	iconContainer: {
		width: ICON_SIZE_CONTAINTER,
		height: ICON_SIZE_CONTAINTER,
		borderRadius: ICON_SIZE_CONTAINTER,
		backgroundColor: 'rgba(255,255,255,.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		height: FONT_SIZE * 2.5,
		justifyContent: 'center',
		paddingHorizontal: 5,
		backgroundColor: 'rgba(200,200,200,1)',
		borderRadius: FONT_SIZE * 2.5,
	},
	text: {
    fontSize: FONT_SIZE * 1.2,
		fontFamily: 'Raleway',
  }
})

export default Connection