import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

const { width, height } = Dimensions.get('window')
const ROUND_CONTAINER_TOP = height * .2 + 10
const ROUND_TEXT_FONT = height * .025
const ROUND_CONTAINER_PADDING_HORIZONTAL = ROUND_TEXT_FONT * .5
const ROUND_CONTAINER_PADDING_VERTICAL = ROUND_TEXT_FONT * .1

const Round = ({ round, roundLimit }) => {
	const { t } = useTranslation()

	return (
		<View style={styles.container}>
			<Text style={styles.roundText}>{t("roundNumber")}: {round}{roundLimit && ` / ${roundLimit}`}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: ROUND_CONTAINER_TOP,
		left: 0,
		backgroundColor: 'skyblue',
		paddingHorizontal: ROUND_CONTAINER_PADDING_HORIZONTAL,
		paddingVertical: ROUND_CONTAINER_PADDING_VERTICAL,
		borderBottomRightRadius: ROUND_TEXT_FONT,
		borderTopRightRadius: ROUND_TEXT_FONT,
	},
	roundText: {
		fontSize: ROUND_TEXT_FONT,
		fontFamily: 'Parisine',
	}
})

export default Round