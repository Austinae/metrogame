import { useEffect, useState } from 'react'
import { Image, View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import useGameContext from 'contexts/Game'
import useMusicContext from 'contexts/Music'
import { delay } from 'helpers/time'
import linesImagesData from 'data/linesImages'

import RibbonProgressBar from 'components/basics/RibbonProgressBar'
import ToggleButton from 'components/basics/ToggleButton'
import Back from 'components/basics/Back'

import ChoochooImage from 'assets/images/miscellaneous/choochoo.gif' 
import PlayCTAImage from 'assets/images/miscellaneous/PlayCTA.png' 
import TicketOnRenderImage from 'assets/images/miscellaneous/ticketOnRender.gif'
import TicketClickedImage from 'assets/images/miscellaneous/ticketClicked.gif'
import buttonSound from 'assets/sounds/button3.mp3'
import ticketingSound from 'assets/sounds/ticketing.mp3'

const { width, height } = Dimensions.get('window')
const GRID_MARGIN_HORIZONTAL = width * .01
const GRID_MARGIN_TOP = height * .05
const PLAY_CTA_SIZE = height * .1
const PLAY_CTA_ASPECT_RATIO = 597 / 257
const GRID_ITEM_SIZE = width * .11
const GRID_ITEM_BORDER_WIDTH = GRID_ITEM_SIZE * .1
const TITLE_FONT_SIZE = width * .07
const TITLE_MARGIN_TOP = height * .1
const TITLE_MARGIN_LEFT = width * .02
const TICKET_IMAGE_HEIGHT = height * .3
const TICKET_IMAGE_ASPECT_RATIO = 800 / 600
const TICKET_IMAGE_WIDTH = TICKET_IMAGE_HEIGHT * TICKET_IMAGE_ASPECT_RATIO
const TOGGLE_BUTTON_HEIGHT = width * .1
const TOGGLE_BUTTON_GAP = width * .02

const LinesSelection = ({ navigation }) => {
	const { t } = useTranslation()
	const { setLines, region, setDrawLines, gamemode } = useGameContext()
  const { playAudioAsync } = useMusicContext()
	const data = linesImagesData[region]
	const lineNames = data.map(item => item.name)

	const [ticketImageStep , setTicketImageStep] = useState(0)
	const [selectedLines, setSelectedLines] = useState([data[0].name])
	const [isToggleSelected, setIsToggleSelected] = useState(false)

	const menuItems = [t('gameSetupStepRegion'), t('gameSetupStepGamemode'), t('gameSetupStepLines')]

	const onPressEvent = async() => {
		await playAudioAsync(ticketingSound)
		if (selectedLines[0] == 'all') {setLines(lineNames); setDrawLines(lineNames)}
		else {setLines(selectedLines); setDrawLines(selectedLines)}
		setTicketImageStep(1)
		delay(1500).then(() => {
			setTicketImageStep(0)
		 	navigation.navigate(gamemode.charAt(0).toUpperCase() + gamemode.slice(1))
		})
  } 

	/*
		If all is selected, select only all.
		If all is currently selected, deselect all and select the clicked item.
		If the clicked item is currently selected, deselect it unless it's the only selected item.
		If all items except all are selected, select all instead.
	*/
	const onLinePressEvent = async(lineName) => {
    await playAudioAsync(buttonSound)
		const isAllSelected = selectedLines.includes('all')
    const isItemAlreadySelected = selectedLines.includes(lineName)
    const areAllLinesSelected = selectedLines.length === lineNames.length - 1

		if (lineName === 'all') { setSelectedLines(['all']); setIsToggleSelected(true); return }
		if (isAllSelected) { setSelectedLines([lineName]); setIsToggleSelected(false); return }
    if (isItemAlreadySelected) {
			if (selectedLines.length > 1) setSelectedLines(selectedLines.filter(name => name !== lineName))
			return null
    }
    if (areAllLinesSelected) { setSelectedLines(['all']); setIsToggleSelected(true)}
		else setSelectedLines(prevSelectedLines => [...prevSelectedLines, lineName])
	}

	const renderLine = (item, index) => {
		const { name: lineName, source } = item
		const isSelected = selectedLines.includes(lineName)
		return (
			<TouchableOpacity
				key={index}
				style={[styles.lineImage, { opacity: isSelected ? 1 : .5, borderColor: isSelected ? '#FFFFFF' : 'transparent' }]}
				onPress={() => onLinePressEvent(lineName)}
			>
				<Image source={source} style={styles.gridItemImage} />
			</TouchableOpacity>
		)
	}

  return (
    <View style={styles.container}>
			<Image source={ChoochooImage} style={styles.subwayImage} />
      <RibbonProgressBar menuItems={menuItems} />
			<Text style={styles.title}>{t("pickYourLines")}</Text>
			<View style={styles.grid}>{data.map((line, index) => renderLine(line, index))}</View>
			<View style={{ width, alignItems: 'flex-end'}}>
				<ToggleButton
					isOn={isToggleSelected}
					onPress={() => {onLinePressEvent('all'); setIsToggleSelected(!isToggleSelected)}}
					toggleHeight={TOGGLE_BUTTON_HEIGHT}
					text={t('selectAllLines')}
					gap={TOGGLE_BUTTON_GAP}
				/>
			</View>
			<TouchableOpacity style={styles.playButtonContainer} activeOpacity={.7} onPress={onPressEvent}>
				{ ticketImageStep == 0 && <Image source={TicketOnRenderImage} style={styles.ticketImage} />}
				{ ticketImageStep == 1 && <Image source={TicketClickedImage} style={styles.ticketImage} />}
				{ ticketImageStep == 0 && <Image source={PlayCTAImage} opacity={0.4} style={styles.playCTAImage} />}
			</TouchableOpacity>
			<Back onPress={() => navigation.navigate('GamemodeSelection')} customStyle={{ position: 'absolute', top: 10, right: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	title: {
		color: '#DDDDDD',
		fontSize: TITLE_FONT_SIZE,
		marginTop: TITLE_MARGIN_TOP,
		marginLeft: TITLE_MARGIN_LEFT,
		fontFamily: 'Raleway-bold',
	},
	grid: {
		justifyContent: 'center',
		alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
		marginTop: GRID_MARGIN_TOP,
		marginHorizontal: GRID_MARGIN_HORIZONTAL
  },
	gridItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
	playButtonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	subwayImage: {
		position: 'absolute',
		bottom: 0,
		width,
		height: width,
		opacity: .5
	},
	lineImage: {
		width: GRID_ITEM_SIZE+GRID_ITEM_BORDER_WIDTH,
		height: GRID_ITEM_SIZE+GRID_ITEM_BORDER_WIDTH,
		margin: 8,
		borderRadius: GRID_ITEM_SIZE,
		borderWidth: GRID_ITEM_BORDER_WIDTH,
		overflow: 'hidden',
	},
	playCTAImage: {
		aspectRatio: PLAY_CTA_ASPECT_RATIO,
		height: PLAY_CTA_SIZE,
		width: PLAY_CTA_SIZE * PLAY_CTA_ASPECT_RATIO,
		position: 'absolute',
		right: 0,
		bottom: TICKET_IMAGE_HEIGHT / 2,
	},
	ticketImage: {
		width: TICKET_IMAGE_WIDTH,
		height: TICKET_IMAGE_HEIGHT,
	}
})

export default LinesSelection