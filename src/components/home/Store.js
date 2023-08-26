import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import CandyShopImage from 'assets/images/miscellaneous/candyshop.webp'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { useTranslation } from 'react-i18next'

import Back from 'components/basics/Back'
import Coins from 'components/common/Coins'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .7 * .2
const TITLE_FONT_SIZE = height * .05
const STORE_OPTION_FONT_SIZE = height * .03

const Store = ({ navigation }) => {
	const { t } = useTranslation()

  return (
		<ImageBackground source={CandyShopImage} style={{flex: 1}} imageStyle={{opacity: .3}}>
			<Back onPress={() => navigation.navigate('Home')} />
			<Coins containerStyle={styles.coinsContainer} />
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.cushion}>
					<Text style={styles.title}>{t("store")}</Text>
				</View>
				<TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('MapStyleStore')}>
					<Text style={styles.optionStoreText}>{t("mapStyles")}</Text>
					<FontAwesomeIcon
						name="paint-brush"
						size={ICON_SIZE}
						color="orange"
						style={styles.shadow}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('MarkerStyleStore')}>
					<Text style={styles.optionStoreText}>{t("markerStyles")}</Text>
					<EntypoIcon
						name="location-pin"
						size={ICON_SIZE}
						color="black"
						style={styles.shadow}
					/>
				</TouchableOpacity>
			</ScrollView>
		</ImageBackground>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
		fontFamily: 'Raleway-bold',
		textDecorationLine: 'underline',
	},
	cushion: {
		paddingTop: 60,
		paddingBottom: 30,		
	},
	paintBrushGradient: {
		height: ICON_SIZE,
		width: ICON_SIZE,
	},
	shadow: {
    shadowColor: 'black',
    shadowOpacity: .5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
	coinsContainer: {
		zIndex: 2,
		position: 'absolute',
		top: 10,
		right: 10,
	},
	optionContainer: {
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 20,
		backgroundColor: 'rgba(255,255,255,.4)',
		borderColor: 'black',
		borderRadius: ICON_SIZE,
		padding: ICON_SIZE / 2,
		borderWidth: 2,
		marginVertical: 20,
	},
	optionStoreText: {
		fontSize: STORE_OPTION_FONT_SIZE,
		fontFamily: 'Parisine',
	},
})

export default Store