import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, StyleSheet, Image, Easing, useWindowDimensions } from 'react-native'

import metroLeftDoorImage from 'assets/images/miscellaneous/metroLeftDoor.jpeg'
import metroRightDoorImage from 'assets/images/miscellaneous/metroRightDoor.jpeg'

const DoorsAnimation = () => {
  const leftAnim = useRef(new Animated.Value(0)).current
  const rightAnim = useRef(new Animated.Value(0)).current
	const [isVisible, setIsVisible] = useState(true)
	const { width, height } = useWindowDimensions()

  useEffect(() => {
    Animated.parallel([
      Animated.timing(leftAnim, {
        toValue: -width,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.bezier(.18,.55,.98,.57),
      }),
      Animated.timing(rightAnim, {
        toValue: width,
        duration: 3000,
        useNativeDriver: false,
        easing: Easing.bezier(.18,.55,.98,.57),
      })]).start(() => setIsVisible(false))
  }, [])

	if (!isVisible) {
    return null
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.leftDoor, { transform: [{ translateX: leftAnim }], width: width / 2, height: height + 40 }]}>
				<Image
					source={metroLeftDoorImage}
					style={{height: height + 40, aspectRatio: 504/654}}
				/>
			</Animated.View>
      <Animated.View style={[styles.rightDoor, { transform: [{ translateX: rightAnim }], width: width / 2, height: height + 40 }]}>
				<Image
					source={metroRightDoorImage}
					style={{height: height + 40, aspectRatio: 599/654}}
				/>
			</Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
		position: 'absolute',
    height: '100%',
		width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftDoor: {
    backgroundColor: '#404040',
		justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rightDoor: {
    backgroundColor: '#404040',
		justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

export default DoorsAnimation