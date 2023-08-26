import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

import Slider from '@react-native-community/slider'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import CircleEmptyImage from 'assets/images/miscellaneous/circleEmpty.png'
import useMusicContext from 'contexts/Music'

const { width, height } = Dimensions.get('window')
const POINTER_SIZE = height * .2
const CONTAINER_WIDTH = width * .7
const SLIDER_WIDTH = CONTAINER_WIDTH * .8
const CONTAINER_HEIGHT = CONTAINER_WIDTH * .2
const BACKGROUND_COLOR = CONTAINER_WIDTH * .2
const FONT_SIZE = CONTAINER_WIDTH * .07

// values like 6% were hard to reach so I'm using Math.pow for interpolation
const VolumeSlider = () => {
  const { t } = useTranslation()
  const { volume, setVolume, isMusicOn } = useMusicContext()
  const [preSaveVolume, setPreSaveVolume] = useState(volume)

  const onSaveVolume = () => {
    setVolume(Math.pow(preSaveVolume, 2) < .01 ?
      .01 : 
      parseFloat((Math.round(Math.pow(preSaveVolume, 2) * 100) / 100).toFixed(2)))
  }

  if (!isMusicOn) return null

  return (
    <View style={styles.container}>
      <View style={styles.volumeAndText}>
        <Slider
          style={styles.slider}
          minimumValue={0.01}
          thumbTintColor={"#fff"}
          minimumTrackTintColor={"#000"}
          maximumTrackTintColor={"#808080"}
          maximumValue={1}
          value={preSaveVolume}
          onValueChange={(x) => setPreSaveVolume(x)}
          thumbImage={CircleEmptyImage}
        />
        <View style={{ width: FONT_SIZE * 1.5}}>
          <Text style={styles.percentage}>{Math.ceil(Math.pow(preSaveVolume, 2) * 100)}%</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.saveContainer, {
          opacity: (Math.pow(preSaveVolume, 2) < .01 ? .01 : (Math.round(Math.pow(preSaveVolume, 2) * 100) / 100).toFixed(2)) == volume ? .3 : 1.0
        }]}
        onPress={onSaveVolume}
      >
        <Text style={{ fontFamily: 'Raleway-bold', fontSize:FONT_SIZE }}>{t("save")}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: CONTAINER_WIDTH,
    padding: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 20,
		backgroundColor: 'grey',
		borderColor: 'rgba(100,100,100,.6)',
		flexDirection: 'column',
    gap: 10,
  },
  volumeAndText: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: CONTAINER_HEIGHT,
		justifyContent: 'space-between',
		alignItems: 'center',
    gap: 20,
    backgroundColor: '#797979',
    borderRadius: 10,
  },
  slider: {
    width: SLIDER_WIDTH,
  },
  percentage: {
    fontFamily: 'Raleway-bold',
    fontSize: FONT_SIZE / 1.5,
  },
  saveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6CA468',
    borderRadius: 10,
    paddingHorizontal: FONT_SIZE,
    paddingVertical: FONT_SIZE / 2,
  }
})

export default VolumeSlider
