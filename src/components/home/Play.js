import React, { useRef, useEffect, useState } from 'react'
import { Animated, Dimensions, Easing, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import buttonSound from 'assets/sounds/button2.mp3'
import useMusicContext from 'contexts/Music'

const { width } = Dimensions.get('window')
const BUTTON_SIZE = width * .7
const FONT_SIZE = BUTTON_SIZE * .1

const Play = ({ navigation }) => {
  const { t } = useTranslation()
	const playButtonAnim = useRef(new Animated.Value(1)).current
  const { playAudioAsync } = useMusicContext()

  const onPressEvent = async() => {
    await playAudioAsync(buttonSound)
    navigation.navigate('HomeStack', { screen: 'RegionSelection' })
  }

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(playButtonAnim, {
          toValue: 1.1,
          duration: 2000,
          easing: Easing.bezier(.38, .56, 1, 1.01),
          useNativeDriver: true,
        }),
        Animated.timing(playButtonAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.bezier(.65, .41, 1, 1.01),
          useNativeDriver: true,
        }),
      ])
    )

    animation.start()

    return () => {
      animation.stop()
    }
  }, [playButtonAnim])

	return (
    <TouchableOpacity onPressIn={onPressEvent} style={{transform: [{ scale: playButtonAnim }]}} activeOpacity={.6}>
      <LinearGradient
        colors={['red', 'purple']}
        style={[styles.buttonContainer, {width: BUTTON_SIZE}]}
      >
        <View style={styles.innerButtonContainer}>
          <View style={styles.relief} /> 
          <Text style={styles.buttonText}>{t("play")}</Text>
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

export default Play