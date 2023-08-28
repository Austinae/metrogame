import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useTranslation } from 'react-i18next'

import useGameContext from 'contexts/Game'
import Back from 'components/basics/Back'
import Coins from 'components/common/Coins'

import LearningImage from 'assets/images/miscellaneous/learning.png'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')
const SHOP_IMAGE_RATIO = 599/416
const SHOP_IMAGE_WIDTH = width * .6
const STORE_OPTION_FONT_SIZE = height * .05
const SHOP_IMAGE_HEIGHT = SHOP_IMAGE_WIDTH / SHOP_IMAGE_RATIO

const Store = ({ navigation }) => {
	const { t } = useTranslation()

  return (
		<LinearGradient colors={['skyblue', 'lightblue']} style={{flex: 1}}>
			<Back onPress={() => navigation.navigate('Home')} color={'white'} />
			<Coins containerStyle={styles.coinsContainer} />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.storeImageContainer}>
					<Image
						source={LearningImage}
						style={{width: SHOP_IMAGE_WIDTH, height: SHOP_IMAGE_HEIGHT }}
					/>
				</View>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('World')} style={styles.buttonContainer}>
						<Text style={styles.optionStoreText}>{t("navigationTitle.world")}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('ExploreRegionPick')} style={styles.buttonContainer}>
						<Text style={styles.optionStoreText}>{t("navigationTitle.explore")}</Text>
					</TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LearnRegionPick')} style={styles.buttonContainer}>
						<Text style={styles.optionStoreText}>{t("navigationTitle.learn")}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</LinearGradient>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	coinsContainer: {
		zIndex: 2,
		position: 'absolute',
		top: 10,
		right: 10,
	},
	storeImageContainer: {
		width,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: height * .1,
		marginBottom: height * .06,
	},
	optionStoreText: {
		fontSize: STORE_OPTION_FONT_SIZE,
		fontFamily: 'Parisine',
		textAlign: 'center',
	},
	buttonsContainer: {
		flex: 1,
		alignItems: 'center',
	},
	buttonContainer: {
		width: width * .8,
		borderWidth: width * .005,
		padding: width * .04,
		alignItems: 'center',
		marginVertical: height * .015,
		backgroundColor: '#CC5500	'
	}
})

export default Store