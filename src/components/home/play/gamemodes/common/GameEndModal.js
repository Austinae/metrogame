import { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'

import { convertNumToDistance } from 'helpers/distances'
import useMusicContext from 'contexts/Music'
import useGameContext from 'contexts/Game'
import gameEndAudio from 'assets/sounds/gameEnd.mp3'

const { width, height } = Dimensions.get('window')
const TITLE_FONT_SIZE = height * .03
const SUBTITLE_FONT_SIZE = TITLE_FONT_SIZE * .6
const SCORE_FONT_SIZE = TITLE_FONT_SIZE * 1
const SCORE_CONTAINER = SCORE_FONT_SIZE
const ICON_SIZE = height * .1
const SHADOW_OFFSET = { width: width * .01, height: height * .01 }
const SHADOW_OPACITY = .25
const SHADOW_RADIUS = 3.8
const ELEVATION = 5
const COINS_FONT_SIZE = height * .03
const COINS_ICON_SIZE = height * .04
const FOOT_ICON_SIZE = height * .06
const INFO_FONT_SIZE = height * .02
const GOLD_HEX = '#FFD700'
const SILVER_HEX = '#C0C0C0'
const BRONZE_HEX = '#CD7F32'
const MASTER_HEX = '#9400D3'
const CHAMPION_HEX = '#B9F2FF'

const GameEndModal = ({ isGameEndModalVisible, setIsGameEndModalVisible, score, restart, lives, answer, abandoned, type, endByRound }) => {
	const { t } = useTranslation()
	const navigation = useNavigation()
	const { playAudioAsync } = useMusicContext()
	const { coins, setCoins, setRecentlyPlayed, region, gamemode, lines, drawLines } = useGameContext()
	// Confetti?

	useEffect(() => {
		const playEngGameAudio = async() => {
			await playAudioAsync(gameEndAudio)
		}
		playEngGameAudio()
		setRecentlyPlayed({region, gamemode, lines, drawLines})
	}, [])

	/**
	 * Rules for calculating score in distance game mode
	 * 10 rounds are played
	 * Per station let's calculate a good and a bad distance
	 * Bronze: 4,000m / station <=> >40,000m 5 points 
	 * Silver: 2,000m / station <=> >20,000m 10 points
	 * Gold: 1,000m / station <=> >10,000m 20 points
	 * Platinum / Master: 500m / station <=> >5,000m 50 points
	 * Diamond / Champion: <=> >0m 100 points
	 * 
	 * What if you lose on time? <=> 5 points, this forces people to play quickly and precisely
	 */
	const getTitle = () => {
		if (abandoned) return t("gameEndModal.abandoned")
		if (lives == 0) return t('gameEndModal.lifeless')
		if (type == 'distance' && !endByRound) return t("gameEndModal.timeless")
		return t("gameEndModal.congratulations")
	}

	const getCoinsToAdd = () => {
		if (abandoned || lives == 0) return 0
		if (type == 'distance') {
			if (score >= 40_000 || !endByRound) return 5
			else if (score >= 20_000) return 10
			else if (score >= 10_000) return 20
			else if (score >= 5_000) return 30
			else return 50
		}
		return score * 2
	}

	const getScoreTitle = () => {
		if (type == 'distance') return `${t('gameEndModal.totalDistance')}: `
		return `${t('gameEndModal.score')}: `
	}

	const getScoreToShow = () => {
		if (type == 'distance') return `${convertNumToDistance(score)}m`
		return score
	}

	const getDistanceGroup = () => {
		if (score >= 40_000 || !endByRound) return t("gameEndModal.bronze")
		else if (score >= 20_000) return t("gameEndModal.silver")
		else if (score >= 10_000) return t("gameEndModal.gold")
		else if (score >= 5_000) return t("gameEndModal.master")
		return t("gameEndModal.champion")
	}

	const getDistanceExplanation = () => {
		if (score >= 40_000 || !endByRound) return t('gameEndModal.40k')
		else if (score >= 20_000) return t('gameEndModal.20k')
		else if (score >= 10_000) return t('gameEndModal.10k')
		else if (score >= 5_000) return t('gameEndModal.5k')
		return t('gameEndModal.0-5k')
	}

	const getDistanceGroupColor = () => {
		if (score >= 40_000 || !endByRound) return BRONZE_HEX
		else if (score >= 20_000) return SILVER_HEX
		else if (score >= 10_000) return GOLD_HEX
		else if (score >= 5_000) return MASTER_HEX
		return CHAMPION_HEX
	}

	useEffect(() => setCoins(coins + getCoinsToAdd()), [])

	return (
		<Modal 
			isVisible={isGameEndModalVisible}
			// We want to avoid setting onBackdropPress here or else the user might not be able to restart
			// onBackdropPress={() => setIsGameEndModalVisible(!isGameEndModalVisible)} 
			style={styles.container}
		>
			<LinearGradient start={[.1, .2]} colors={['#ffb6c1', '#088F8F']} style={styles.card}>
				<Text style={styles.title}>{getTitle()}</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
					<Text style={styles.scoreTitle}>{getScoreTitle()}</Text>
					<View style={styles.scoreContainer}>
						<Text style={styles.score}>{getScoreToShow()}</Text>
					</View>
				</View>
				{type == 'distance' && 
					<View style={styles.infoContainer}>
						<MaterialCommunityIcon name={'foot-print'} size={FOOT_ICON_SIZE} color={getDistanceGroupColor()} />
						<View>
							<Text style={[styles.infoText, { fontWeight: 700, fontSize: INFO_FONT_SIZE * 1.3 }]}>{getDistanceGroup()}</Text>
							<Text style={styles.infoText}>{getDistanceExplanation()}</Text>
						</View>
					</View>
				}
				<View style={styles.coinsContainer}>
					<Text style={styles.coinsText}>{coins}  (+{getCoinsToAdd()})</Text>
					<FontAwesome5Icon name={'coins'} color={'#FFD700'} size={COINS_ICON_SIZE} />
				</View>
				{answer &&
					<View style={styles.answerContainer}>
						<Text style={styles.answerText}>{t("gameEndModal.theAnswerWas")}</Text>
						<Text style={[styles.answerText, {fontFamily: 'Raleway-bold'}]}>{answer}</Text>
					</View>
				}
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={() => {setIsGameEndModalVisible(!isGameEndModalVisible); restart()}}>
						<FontAwesomeIcon
							name="repeat"
							size={ICON_SIZE}
							color="orange"
							style={{borderColor: 'transparent'}}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {setIsGameEndModalVisible(!isGameEndModalVisible); navigation.navigate('HomeStack', { screen: 'Home' })}}>
						<FontAwesomeIcon
							name="times"
							size={ICON_SIZE}
							color="#BDBDBD"
							style={{borderColor: 'transparent'}}
						/>
					</TouchableOpacity>
				</View>
				<Text style={{ marginTop: 10}}>⭐️ Rate this app if you like it ⭐️</Text>
			</LinearGradient>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		backgroundColor: 'white',
		padding: 22,
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#FFF',
		shadowOffset: SHADOW_OFFSET,
		shadowOpacity: SHADOW_OPACITY,
		shadowRadius: SHADOW_RADIUS,
		elevation: ELEVATION,
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
		fontFamily: 'Raleway-bold'
	},
	answerContainer: {
		marginVertical: 15,
		backgroundColor: '#EEB5DA',
		padding: 30,
		borderRadius: 10,
	},
	answerText: {
		fontSize: SUBTITLE_FONT_SIZE,
		fontFamily: 'Raleway',
		textAlign: 'center',
	},
	scoreTitle: {
		fontSize: SUBTITLE_FONT_SIZE,
		fontFamily: 'Raleway',
	},
	scoreContainer: {
		alignItems: 'flex-end',
		padding: SCORE_CONTAINER / 2,
	},
	score: {
		fontFamily: 'Parisine',
		fontSize: SCORE_FONT_SIZE,
	},
	buttonsContainer: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		gap: 30,
		margin: 30,
	},
	coinsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: COINS_FONT_SIZE * 2,
		gap: COINS_FONT_SIZE / 2,
		backgroundColor: '#A3A3A3',
		padding: COINS_FONT_SIZE,
	},
	coinsText: {
		fontSize: COINS_FONT_SIZE,
		fontFamily: 'Parisine',
	},
	infoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5,
		marginBottom: 10,
		backgroundColor: 'rgba(47, 214, 214, .3)',
		borderRadius: FOOT_ICON_SIZE,
		paddingHorizontal: FOOT_ICON_SIZE / 2,
		paddingVertical: FOOT_ICON_SIZE / 4,
	},
	infoText: {
		fontSize: INFO_FONT_SIZE,
		fontFamily: 'Parisine',
	}
})

export default GameEndModal