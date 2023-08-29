import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground, TouchableOpacity, Button, Image } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Modal from 'react-native-modal'
import { useTranslation } from 'react-i18next'

import PirateMapImage from 'assets/images/miscellaneous/piratemap.jpeg'
import Coins from 'components/common/Coins'
import mapStylesImages from 'data/customization/mapStylesStore'
import markers from 'data/customization/markers'
import useGameContext from 'contexts/Game'
import Back from 'components/basics/Back'

const { width, height } = Dimensions.get('window')
const CARD_CONTAINER_WIDTH = width * .95
const CARD_PADDING = height * .01
const CARD_BORDER_RADIUS = height * .08
const CARD_BORDER_WIDTH = height * .002
const CARD_CTA_CONTAINER_SIZE = height * .09
const CARD_CTA_CONTAINER_PADDING = height * .01
const CARD_FONT_SIZE = height * .02
const CARD_CTA_FONT_SIZE = height * .02
const CHECK_ICON_SIZE = height * .06
const CARD_MARGIN = height * .01
const LOCK_ICON_SIZE = height * .08
const TITLE_FONT_SIZE = height * .05
const PIN_IMAGE_ASPECT_RATIO = 50/70
const PIN_IMAGE_HEIGHT = height * .08
const PIN_IMAGE_WIDTH = PIN_IMAGE_HEIGHT * PIN_IMAGE_ASPECT_RATIO

const Store = ({ navigation }) => {
	const [isModalVisible, setModalVisible] = useState(false)
	const [modalMessage, setModalMessage] = useState(null)
  	const {
		markerStyle,
		setMarkerStyle,
		collectedMarkerStyle,
		setCollectedMarkerStyle,
		collectedMapStyles,
		setCollectedMapStyles,
		mapStyle,
		setMapStyle,
		coins,
		setCoins
	} = useGameContext()
	const { t } = useTranslation()

	const renderMarkerStyleCard = (item) => {
		const isStylePurchased = collectedMarkerStyle.includes(item.key)
		const isActiveStyle = markerStyle == item.key
	
		const getCTAText = () => {
			if (isActiveStyle || isStylePurchased) return ''
			return item.price
		}
	
		const getCTABackgroundColor = () => {
			if (isStylePurchased) return '#E5E4E2'
			return '#F6CC08'
		}
	
		const onCardPress = () => {
			if (isActiveStyle) return
			if (isStylePurchased) { setMarkerStyle(item.key); return}
			if (coins - item.price >= 0) {
				// remove money from wallet, add style to collection and set as mapStyle, open modal letting them know they bought something
				setCoins(coins - item.price)
				setCollectedMarkerStyle([...collectedMarkerStyle, item.key])
				setMarkerStyle(item.key)
				setModalMessage('Congratulations on this item\'s purchase')
				setModalVisible(true)
			} else {
				// indicate that the user doesn't have enough money
				setModalMessage('Not enough coins to purchase this item')
				setModalVisible(true)
			}
		}
	
		return (
			<TouchableOpacity key={item.key} onPress={onCardPress}>
				<View style={[styles.cardContainer, {backgroundColor: item.background }]}>
					<View style={[styles.cardCTAContainer, { backgroundColor: getCTABackgroundColor() }]}>
						{
							isActiveStyle ? 
							<FontAwesomeIcon name={"check"} size={CHECK_ICON_SIZE} color={'#50C878'} />
							:
							<Text style={styles.ctaFontSize}>{getCTAText()}</Text>
						}
					</View>
					<View style={{ flexDirection: 'row', gap: 15, justifyContent: 'center', alignItems: 'center'}}>
						<Image
							source={item.image}
							style={{ width: PIN_IMAGE_WIDTH, height: PIN_IMAGE_HEIGHT }}
							resizeMode="contain"
							height={height}
							width={width}
							tintColor={'#444444'}
						/>
						<View style={{ width: LOCK_ICON_SIZE, height: LOCK_ICON_SIZE}}>
							{!isStylePurchased && <EntypoIcon name={"lock"} size={LOCK_ICON_SIZE} color={'#F6CC08'} />}
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

	const renderMapStyleCard = (item) => {
		const isStylePurchased = collectedMapStyles.includes(item.key)
		const isActiveStyle = mapStyle == item.key
	
		const getCTAText = () => {
			if (isActiveStyle || isStylePurchased) return ''
			return item.price
		}
	
		const getCTABackgroundColor = () => {
			if (isStylePurchased) return '#E5E4E2'
			return '#F6CC08'
		}
	
		const onCardPress = () => {
			if (isActiveStyle) return
			if (isStylePurchased) { setMapStyle(item.key); return}
			if (coins - item.price >= 0) {
				// remove money from wallet, add style to collection and set as mapStyle, open modal letting them know they bought something
				setCoins(coins - item.price)
				setCollectedMapStyles([...collectedMapStyles, item.key])
				setMapStyle(item.key)
				setModalMessage(t("purchaseSuccessful"))
				setModalVisible(true)
			} else {
				// indicate that the user doesn't have enough money
				setModalMessage(t("purchaseUnsuccessful"))
				setModalVisible(true)
			}
		}
	
		return (
			<TouchableOpacity key={item.key} onPress={onCardPress}>
				<ImageBackground
					container
					style={styles.cardContainer}
					source={item.image}
					resizeMode='cover'
				>
					<View style={[styles.cardCTAContainer, { backgroundColor: getCTABackgroundColor() }]}>
						{
							isActiveStyle ? 
							<FontAwesomeIcon name={"check"} size={CHECK_ICON_SIZE} color={'#50C878'} />
							:
							<Text style={styles.ctaFontSize}>{getCTAText()}</Text>
						}
					</View>
					<View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center'}}>
						{!isStylePurchased && <EntypoIcon name={"lock"} size={LOCK_ICON_SIZE} color={'#F6CC08'} />}
					</View>
				</ImageBackground>
			</TouchableOpacity>
		)
	}

	return (
		<ImageBackground source={PirateMapImage} style={{flex: 1}} imageStyle={{opacity: .2}}>
			<Back onPress={() => navigation.navigate('Home')} />
			<Coins containerStyle={styles.coinsContainer} />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.cushion}>
					<Text style={styles.title}>{t('mapStyles')}</Text>
				</View>
				{mapStylesImages.map((item, _) => renderMapStyleCard(item))}
				<View style={styles.cushion}>
					<Text style={styles.title}>{t("markerStyles")}</Text>
				</View>
				{markers.map((marker, _) => renderMarkerStyleCard(marker))}
			</ScrollView>
			<Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalText}>{modalMessage}</Text>
					<Button title={"✅"} onPress={() => setModalVisible(false)} />
				</View>
      		</Modal>
		</ImageBackground>
  )
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cushion: {
		paddingTop: 60,
		paddingBottom: 30,		
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
		fontFamily: 'Raleway-bold',
		textDecorationLine: 'underline',
	},
	cardContainer: {
		width: CARD_CONTAINER_WIDTH,
		padding: CARD_PADDING,
		borderRadius: CARD_BORDER_RADIUS,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderColor: 'black',
		borderWidth: CARD_BORDER_WIDTH,
		overflow: 'hidden',
		marginVertical: CARD_MARGIN,
	},
	cardCTAContainer: {
		height: CARD_CTA_CONTAINER_SIZE,
		width: CARD_CTA_CONTAINER_SIZE,
		justifyContent: 'center',
		alignItems: 'center',
		padding: CARD_CTA_CONTAINER_PADDING,
		borderRadius: CARD_CTA_CONTAINER_SIZE,
		backgroundColor: 'grey',
		borderWidth: 2,
		borderColor: 'black',
	},
	mapStyleText: {
		fontFamily: 'Raleway-bold',
		fontSize: CARD_FONT_SIZE,
	},
	ctaFontSize: {
		fontFamily: 'Parisine',
		fontSize: CARD_CTA_FONT_SIZE,
	},
	coinsContainer: {
		zIndex: 2,
		position: 'absolute',
		top: 10,
		right: 10,
	},
	lockIconContainer: {
		position: 'absolute',
		top: '50%',
		right: '50%',
		transform: [{translateX: LOCK_ICON_SIZE/2}, {translateY: -LOCK_ICON_SIZE/2}],
	},
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
})

export default Store