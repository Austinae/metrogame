import { View, Text, StyleSheet, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import gamemodes from 'data/gamemodes'
import linesImagesData from 'data/linesImages'
import regions from 'data/regions'
import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('window')
const CONTAINER_HEIGHT = height * .2
const CONTAINER_WIDTH = height * .3
const CONTAINER_TOP = height * .6
const LINE_CONTAINER_HEIGHT = height * .05
const STATION_CONTAINER_WIDTH = width * .6
const LINE_IMAGE_CONTAINER_SIZE = height * .06
const SETTINGS_FONT_SIZE = height * .03
const TITLE_FONT_SIZE = height * .03

const RecentlyPlayed = ({ navigation }) => {
	const { t } = useTranslation()
	const { recentlyPlayed, setRegion, setGamemode, setLines, setDrawLines } = useGameContext()
	if (recentlyPlayed == null) return
	
	const {region, gamemode, lines, drawLines} = recentlyPlayed
	const dataGameMode = gamemodes.find(item => item.key === gamemode)
	const imageGamemode = dataGameMode.image
	const gamemodeTitle = t(`gameSelection.${dataGameMode.key}`)
	const dataRegion = regions.find(item => item.key === region)
	const regionTitle = t(`cities.${dataRegion.key}`)
	const linesImages = linesImagesData[region]

	const onPress = () => {
		setRegion(region)
		setGamemode(gamemode)
		setLines(lines)
		setDrawLines(drawLines)
		navigation.navigate(gamemode.charAt(0).toUpperCase() + gamemode.slice(1))
	}

	let imageSize = LINE_IMAGE_CONTAINER_SIZE
	if (lines.length > 5) imageSize = LINE_IMAGE_CONTAINER_SIZE / 1.8

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text style={styles.title}>{t("playAgain.title")}:</Text>
			<ImageBackground source={imageGamemode} imageStyle={{opacity: .5}} style={styles.gameSettingsContainer}>
				<View style={styles.linesContainer}>
					{lines.map((line, idx) => {
						const source = linesImages.find(item => item.name === line).source
						return (
							<View
								key={idx}
								style={{
									width: imageSize,
									height: imageSize,
								}}
							>
								<Image source={source} style={styles.lineImage} />
							</View>
						)
					})}
				</View>
				<View style={{flexDirection: 'row'}}>
					<Text style={[styles.settingsText, { fontFamily: 'Raleway-bold'}]}>{t("playAgain.region")}: </Text>
					<Text style={styles.settingsText}>{regionTitle}</Text>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Text style={[styles.settingsText, { fontFamily: 'Raleway-bold'}]}>{t("playAgain.gameMode")}: </Text>
					<Text style={styles.settingsText}>{gamemodeTitle}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: CONTAINER_TOP,
		padding: 20,
		backgroundColor: 'rgba(230,230,250,.9)',
		borderRadius: 20,
	},
	gameSettingsContainer: {
		padding: 10,
		width: CONTAINER_WIDTH,
		height: CONTAINER_HEIGHT,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		borderRadius: 5,
		overflow: 'hidden',
	},
	linesContainer: {
		alignItems: 'center',
		top: 0,
		left: 0,
		borderRadius: LINE_CONTAINER_HEIGHT/2,
		zIndex: 2,
		position: 'absolute',
		flexDirection: 'row',
		flexWrap: "wrap",
	},
	lineImage: {
		width: '100%',
		height: '100%',
	},
	settingsText: {
		fontSize: SETTINGS_FONT_SIZE,
		fontFamily: 'Raleway',
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
		fontFamily: 'Parisine',
		textDecorationLine: 'underline',
		marginBottom: 20,
	}
})

export default RecentlyPlayed