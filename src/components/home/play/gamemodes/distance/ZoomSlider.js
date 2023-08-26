import { useState, useEffect } from 'react'
import { View, Text, PanResponder, Animated, Dimensions, StyleSheet } from 'react-native'
import { animateMapToRegion } from 'helpers/map'

const { width, height } = Dimensions.get('window')
const SLIDER_HEIGHT = height * 0.6
const SLIDER_BOTTOM = height * 0.05
const SLIDER_CIRCLE_SIZE = SLIDER_HEIGHT * 0.06
const NAVIGATION_TAB_HEIGHT = width * .12
const Y_POSITION_OF_SLIDER = height - (SLIDER_HEIGHT + SLIDER_BOTTOM + NAVIGATION_TAB_HEIGHT)

const ZoomSlider = ({ mapRef }) => {
	const [value, setValue] = useState(0)
  const pan = useState(new Animated.ValueXY())[0]

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.getCamera().then((camera) => {
				const { center, zoom } = camera
				mapRef.current.animateCamera({ center, zoom: value }, { duration: 100 })
			})
		}
	}, [value])

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
			const yPositionOfCircleInSlider = gesture.moveY - Y_POSITION_OF_SLIDER
			const restrictedYPosition = Math.min(Math.max(yPositionOfCircleInSlider, 0), SLIDER_HEIGHT - 25)
      pan.setValue({ x: 0, y: restrictedYPosition })
      const newValue = (restrictedYPosition / SLIDER_HEIGHT) * 20
      setValue(newValue)
    },
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: pan.y,
            width: SLIDER_CIRCLE_SIZE,
            height: SLIDER_CIRCLE_SIZE,
            borderRadius: SLIDER_CIRCLE_SIZE / 2,
            backgroundColor: 'skyblue',
          },
          pan.getLayout(),
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SLIDER_BOTTOM,
    right: 10,
    height: SLIDER_HEIGHT,
    width: SLIDER_CIRCLE_SIZE,
    backgroundColor: 'rgba(255,255,255,.4)',
    borderRadius: SLIDER_CIRCLE_SIZE,
  },
})

export default ZoomSlider
