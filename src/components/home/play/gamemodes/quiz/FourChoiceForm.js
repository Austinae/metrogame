import React, { useState }  from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import NextButton from 'components/home/play/gamemodes/common/NextButton'

const CORRECT_COLOR = '#52de3f'
const WRONG_COLOR = '#ff6052'
const DEFAULT_COLOR = 'skyblue'

const { width, height } = Dimensions.get('window')
const OPTION_WIDTH = (width - 50) / 2
const OPTION_HEIGHT = height * .1
const OPTION_FONT_SIZE = OPTION_HEIGHT * .2
const OPTION_BORDER_RADIUS = OPTION_HEIGHT * .5
const NAVIGATION_TAB_HEIGHT = width * .12
const OPTIONS_BOTTOM_HEIGHT = NAVIGATION_TAB_HEIGHT * .9
const NEXT_BUTTON_SIZE = height * .1

const FourChoiceForm = ({
  options,
  answer,
  onNext,
  onSelectionPress,
  selectedOption,
  setSelectedOption,
  isOptionSelected,
  setIsOptionSelected
}) => {
  if (options.length == 0) return null

  const handleOptionPress = (option) => {
    setIsOptionSelected(true)
    setSelectedOption(option)
    onSelectionPress(option)
  }

  const handleNextPress = () => {
    setSelectedOption(null)
    setIsOptionSelected(false)
    onNext()
  }

  const getBackgroundColor = (option) => {
    if (selectedOption){
      if (option == answer) return CORRECT_COLOR
      if (selectedOption == option) return selectedOption == answer ? CORRECT_COLOR : WRONG_COLOR
    }
    return DEFAULT_COLOR
  }

  const renderButtons = () => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleOptionPress(option)}
        disabled={isOptionSelected}
      >
        <LinearGradient start={[.1, .2]} colors={[getBackgroundColor(option), '#87CEEB']} style={styles.button}>
          <Text style={styles.optionText}>{option}</Text>
        </LinearGradient>
      </TouchableOpacity>
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderButtons().slice(0, 2)}</View>
      <View style={styles.row}>{renderButtons().slice(2, 4)}</View>
      {isOptionSelected && <NextButton onPress={handleNextPress} containerStyle={styles.nextButton} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: OPTIONS_BOTTOM_HEIGHT,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: OPTION_HEIGHT,
    width: OPTION_WIDTH,
    backgroundColor: 'skyblue',
    borderRadius: OPTION_BORDER_RADIUS,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  optionText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: OPTION_FONT_SIZE,
  },
  nextButton: {
    borderRadius: 10,
    width: NEXT_BUTTON_SIZE,
    height: NEXT_BUTTON_SIZE,
    position: 'absolute',
    top: -(NEXT_BUTTON_SIZE+10),
    left: '50%',
    transform: [{ translateX: -NEXT_BUTTON_SIZE/2 }],
  },
})

export default FourChoiceForm
