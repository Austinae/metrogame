import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'
import { SelectList } from 'react-native-dropdown-select-list'
import useLanguageContext from 'contexts/Language'
import TrainAnimation from 'components/home/TrainAnimation'

import regions from 'data/regions'
import LogoImage from 'assets/images/logos/icon.png'

const { width, height } = Dimensions.get('window')
const IMAGE_HEIGHT = height * 0.6
const BUTTON_BOTTOM = height * .1
const FONT_SIZE = height * .04
const SELECT_WIDTH = width * .5
const SELECT_HEIGHT = height * .06
const INPUT_FONT_SIZE = height * .025
const SELECT_LIST_CHEVRON_SIZE = height * .04
const SELECT_LIST_ICON_SIZE = height * .03
const TOP = width > 700 ? 110 : 60

const LanguagePicker = ({ navigation }) => {
	const { t } = useTranslation()
	const { setLanguage, languagePickerData } = useLanguageContext()
	const { map } = regions.find(item => item.key === 'paris')

	const renderItem = ({ item }) => (
    <View style={styles.featureContainer}>
      <FeatherIcon name={"check"} size={width * .07} color={"green"} />
      <Text style={styles.featureText}>{t(item)}</Text>
    </View>
  )

	return (
		<ImageBackground
			source={{uri: map}}
			imageStyle={{opacity: .1}}
			style={styles.container}
		>
			<View style={{ paddingTop: TOP }}>
				<Image source={LogoImage} style={{width: width * .35, height: width * .35}} />
			</View>
			<TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Welcome')}>
				<LinearGradient colors={['white', '#EEEEEE']} style={styles.buttonInnerContainer}>
					<Text style={styles.buttonText}>{t('languagePickerButton')}</Text>
				</LinearGradient>
			</TouchableOpacity>
			<View>
				<Text style={{ color: 'white', fontFamily: "Parisine", fontSize: width * .09, paddingTop: TOP, paddingBottom: TOP , fontWeight: 700 }}>
					{t('welcomeMessage')}
				</Text>
			</View>
			<Text style={{ color: "white", fontSize: width * .05, fontFamily: 'Parisine' }}>{t("pickLanguage")}</Text>
			<View style={{ marginTop: 30 }}>
				<SelectList 
					setSelected={(val) => setLanguage(val)} 
					data={languagePickerData}
					search={false}
					save="key"
					fontFamily="Parisine"
					boxStyles={{ width: SELECT_WIDTH, height: SELECT_HEIGHT }}
					inputStyles={{ fontSize: INPUT_FONT_SIZE, height: SELECT_HEIGHT, alignSelf: 'center', marginTop: INPUT_FONT_SIZE, color: "white" }}
					dropdownTextStyles={{ fontSize: INPUT_FONT_SIZE }}
					dropdownStyles={{ backgroundColor: 'rgba(255,255,255,.9)' }}
					arrowicon={<FeatherIcon name={"chevron-down"} size={SELECT_LIST_CHEVRON_SIZE} color="white"/>} 
					searchicon={<FeatherIcon name={"search"} size={SELECT_LIST_ICON_SIZE} color="white" />}
					defaultOption={languagePickerData[0]}
				/>
			</View>
    </ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#3f41e6',
		bottom: BUTTON_BOTTOM,
	},
	buttonInnerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: FONT_SIZE / 2,
	},	
	buttonText: {
		fontSize: FONT_SIZE,
		fontFamily: "Parisine",
	},
})

export default LanguagePicker