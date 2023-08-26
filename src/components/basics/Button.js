import { Text, useWindowDimensions, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')
const BUTTON_SIZE = width * .7
const FONT_SIZE = BUTTON_SIZE * .08
const BUTTON_BORDER_SIZE = width * .01
const BUTTON_PADDING = width * .06

const Button = ({ customStyle, customTextStyle, text, onPress, children }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.homeButtons, { gap: text ? FONT_SIZE : 0, ...customStyle }]}
		>
			{children}
			<Text style={[styles.buttonTextStyle, { ...customTextStyle }]}>{text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	homeButtons: {
		width: BUTTON_SIZE,
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: 'rgba(10, 10, 10, .95)',
		borderColor: 'rgba(100,100,100,.6)',
		flexDirection: 'row',
		borderBottomWidth: BUTTON_BORDER_SIZE,
		borderLeftWidth: BUTTON_BORDER_SIZE,
		paddingHorizontal: BUTTON_PADDING,
	},
	buttonTextStyle: {
		fontSize: FONT_SIZE,
		color: '#CCCCCC',
		fontFamily: 'Raleway'
	},
})
export default Button