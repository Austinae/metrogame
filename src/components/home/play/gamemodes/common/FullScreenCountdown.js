import React, { useEffect, useState, useRef } from 'react'
import { Animated, Text, Dimensions, StyleSheet, View } from 'react-native'

const { width, height } = Dimensions.get('window')
const COUNT_FONT_SIZE = height * .1

const FullScreenCountdown = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current
  
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000)
    } else if (count === 0) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }
      ).start()
    }
  }, [count])
  

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.countText}>{count == 0 ? '🚇' : count}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: COUNT_FONT_SIZE,
    fontFamily: 'Raleway-bold',
    color: 'white',
  },
})

export default FullScreenCountdown
