import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import nextButton from 'assets/images/buttons/nextButton.png'

const NextButton = ({ onPress, containerStyle }) => {
	return (
		<TouchableOpacity
			style={containerStyle}
			onPress={onPress}
		>
			<Image
				source={nextButton}
				style={styles.image}
				tintColor={'skyblue'}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	image: {
    width: '100%',
    height: '100%',
  },
})

export default NextButton