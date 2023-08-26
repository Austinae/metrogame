import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const { height } = Dimensions.get('window')
const LIFE_TRACKER_TOP = height * .1 + 10
const HEART_ICON_SIZE = height * .04

const LifeTracker = ({ totalLives, livesLeft }) => {
  const renderHearts = () => {
    let hearts = []

    for(let i = 0; i < totalLives; i++) {
      hearts.push(
        <FontAwesomeIcon 
          key={i}
          name={i < livesLeft ? 'heart' : 'heart-o'}
          size={HEART_ICON_SIZE}
          color={i < livesLeft ? 'red' : 'grey'}
        />
      )
    }

    return hearts
  }

  return (
    <View style={[styles.container, { gap: HEART_ICON_SIZE / 5 }]}>
      {renderHearts()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: LIFE_TRACKER_TOP,
    right: 0,
  }
})

export default LifeTracker