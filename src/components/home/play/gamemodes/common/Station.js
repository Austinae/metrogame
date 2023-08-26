import React from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import linesImagesData from 'data/linesImages'
import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('window')
const CONTAINER_BOTTOM = height * .08
const STATION_CONTAINER_WIDTH = width * .6
const STATION_CONTAINER_PADDING = width * .02
const STATION_CONTAINER_HEIGHT = height * .1
const STATION_CONTAINER_FONT = height * .03
const STATION_CONTAINER_MEDIUM_FONT = height * .02
const STATION_CONTAINER_SMALL_FONT = height * .018
const STATION_CONTAINER_TINY_FONT = height * .014
const LINE_CONTAINER_HEIGHT = height * .05
const LINE_IMAGE_CONTAINER_SIZE = height * .04

const Station = ({ station }) => {
	if (station == null || station == undefined) return null
	const { region } = useGameContext()
	const linesImages = linesImagesData[region]

	let newFontSize = STATION_CONTAINER_FONT
  if (station.name.length > 20) newFontSize = STATION_CONTAINER_MEDIUM_FONT
  if (station.name.length > 40) newFontSize = STATION_CONTAINER_SMALL_FONT
  if (station.name.length > 50) newFontSize = STATION_CONTAINER_TINY_FONT

	return (
		<View style={styles.container}>
			<View style={styles.linesContainer}>
				{station.lines.map((line, idx) => {
					const source = linesImages.find(item => item.name === line).source
					return <View key={idx} style={styles.lineImageContainer}><Image source={source} style={styles.lineImage} /></View>
				})}
			</View>
			<LinearGradient start={[.1, .2]} colors={['skyblue', 'skyblue']} style={styles.stationTextContainer}>
				<Text style={[styles.stationText, { fontSize: newFontSize }]}>{station.name}</Text>
			</LinearGradient>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: CONTAINER_BOTTOM,
		left: '50%',
	},
	stationTextContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		transform: [{ translateX: -STATION_CONTAINER_WIDTH / 2}],
		borderRadius: STATION_CONTAINER_HEIGHT/2,
		width: STATION_CONTAINER_WIDTH,
		height: STATION_CONTAINER_HEIGHT,
		paddingHorizontal: STATION_CONTAINER_PADDING,
	},
	linesContainer: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		transform: [{ translateX: -STATION_CONTAINER_WIDTH / 2 }, { translateY: LINE_IMAGE_CONTAINER_SIZE / 2 }],
		borderRadius: LINE_CONTAINER_HEIGHT/2,
		height: LINE_CONTAINER_HEIGHT,
		flexDirection: 'row',
		width: STATION_CONTAINER_WIDTH,
		zIndex: 2,
	},
	lineImageContainer: {
		width: LINE_IMAGE_CONTAINER_SIZE,
		height: LINE_IMAGE_CONTAINER_SIZE,
	},
	lineImage: {
		width: '100%',
		height: '100%',
	},
	stationText: {
		fontFamily: 'Raleway-bold'
	},
})

export default Station