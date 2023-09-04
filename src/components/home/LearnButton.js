import React, { useRef }from 'react'
import { Animated, Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import buttonSound from 'assets/sounds/button2.mp3'
import useMusicContext from 'contexts/Music'

const { width } = Dimensions.get('window')
const BUTTON_SIZE = width * .7
const FONT_SIZE = BUTTON_SIZE * .1

const LearnButton = ({ navigation }) => {
	const playButtonAnim = useRef(new Animated.Value(1)).current
  const { playAudioAsync } = useMusicContext()
  const { t } = useTranslation()

  const onPressEvent = async() => {
    await playAudioAsync(buttonSound)
    navigation.navigate('LearnStack', { screen: 'learn' })
  }

	return (
    <TouchableOpacity onPressIn={onPressEvent} style={{transform: [{ scale: playButtonAnim }]}} activeOpacity={.6}>
      <LinearGradient
        colors={['blue', 'purple']}
        style={[styles.buttonContainer, {width: BUTTON_SIZE}]}
      >
        <View style={styles.innerButtonContainer}>
          <View style={styles.relief} />
          <Text style={styles.buttonText}>{t("learn")}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
	)
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
    borderWidth: 0,
		borderRadius: 50,
		flexDirection: 'row',
    right: 0,
    left: 0,
    bottom: 0,
    marginTop: 15,
  },
  innerButtonContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FONT_SIZE,
    fontFamily: 'Raleway-bold',
  },
  relief: {
    position: 'absolute',
    width: FONT_SIZE/4,
    height: FONT_SIZE/2,
    left: 0,
    top: 0,
    backgroundColor: 'white',
    borderRadius: BUTTON_SIZE/2,
    transform: [{rotate: '45deg'}],
  },
})

export default LearnButton