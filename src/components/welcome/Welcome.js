import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import CoolImage from 'assets/images/miscellaneous/cool.gif'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'

import Back from 'components/basics/Back'
import useWelcomeContext from 'contexts/Welcome'

const { width, height } = Dimensions.get('window')
const FONT_SIZE = height * .04
const BUTTON_BOTTOM = height * .1
const BACKGROUND_CIRCLE_WIDTH = width * 2

const features = [
	"features.amountStations",
	"features.amountGamemodes",
	"features.amountSubways",
	"features.learning",
	"features.explore",
	"features.mapCustomization",
	"features.pinCustomization"
]

const Welcome = ({ navigation }) => {
	const { t } = useTranslation()
	const { setHasAlreadySeenWelcome } = useWelcomeContext()

	const renderItem = ({ item }) => (
    <View style={styles.featureContainer}>
      <FeatherIcon name={"check"} size={width * .07} color={"green"} />
      <Text style={styles.featureText}>{t(item)}</Text>
    </View>
  )

	return (
		<LinearGradient colors={['coral', 'grey']} style={styles.container}>
			<View style={{ width, height: height * .4, overflow: 'hidden' }}>
				<Image style={{ width: '100%', height: '100%' }} source={CoolImage} />
			</View>
			<Back onPress={() => navigation.navigate('LanguagePicker')} color={'white'} />
			<View style={styles.welcomeContainer}>
				<Text style={{ marginTop: 20, fontSize: width * .05, fontFamily: 'Raleway-bold', textDecorationLine: 'underline'}}>
					{t("featureList")}
				</Text>
			</View>
			<FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={2}
        contentContainerStyle={styles.featureList}
      />
			<TouchableOpacity style={styles.buttonContainer} onPress={() => setHasAlreadySeenWelcome(true)}>
				<View style={styles.buttonInnerContainer}>
					<Text style={styles.buttonText}>{t('welcomeButton')}</Text>
				</View>
			</TouchableOpacity>
		</LinearGradient>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
		alignItems: 'center',
	},
	background: {
		position: 'absolute',
		width: BACKGROUND_CIRCLE_WIDTH,
		height: BACKGROUND_CIRCLE_WIDTH,
		backgroundColor: 'blue',
		borderRadius: width,
		transform: [{ translateY: - BACKGROUND_CIRCLE_WIDTH / 2}]
	},
	buttonContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: BUTTON_BOTTOM,
		padding: FONT_SIZE / 2,
		borderRadius: FONT_SIZE / 5,
	},
	buttonInnerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: FONT_SIZE / 2,
		borderRadius: FONT_SIZE / 5,
		backgroundColor: 'orange',
	},	
	buttonText: {
		fontSize: FONT_SIZE,
		fontFamily: 'Parisine',
	},
	featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.45,
    margin: 5,
  },
  featureText: {
    marginLeft: 10,
		fontSize: width * .035,
		flexShrink: 1,
  },
  featureList: {
		marginTop: width * .06,
		marginLeft: width * .03,
		justifyContent: 'center',
		alignItems: 'center',
  }
})

export default Welcome