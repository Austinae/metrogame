import React, { useEffect, useRef } from 'react'
import { View, Animated, Image, StyleSheet, useWindowDimensions} from 'react-native'

import tracksImg from 'assets/images/miscellaneous/rails.png'
import trainImg from 'assets/images/miscellaneous/train.png'

const TrainAnimation = () => {
	const { width, height } = useWindowDimensions()
	const trainWidth = width > 700 ? 1230 : 600
	const trainTrackHeight = width > 700 ? 100 : 50
  	const trainAnim = useRef(new Animated.Value(-(trainWidth+200))).current
	const tracksNumberImages = Math.round(Math.min(width, 700) / (width > 700 ? 150 : 100)) + 1

	useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
				Animated.timing(
					trainAnim,
					{
						toValue: width,
						duration: 15000,
						useNativeDriver: true,
					},
				),
        Animated.delay(3000),
      ]),
    )

    animation.start()

    return () => {
      animation.stop()
    }
  }, [trainAnim])

  return (
		<View style={{ width: '100%', marginTop: 2 }}>
			<View style={{ position: 'absolute', background: "blue", width: '100%', flexDirection: 'row', left: -100, top: height - 120 }}>
				{[...Array(tracksNumberImages)].map((_, i) => <Image key={i} source={tracksImg} style={{ aspectRatio: 349/171, width: undefined, height: trainTrackHeight }} />)}
			</View>
			
			<Animated.View
				style={[
					styles.floatingView,
					{
						transform: [{
							translateX: trainAnim,
						}],
					},
				]}
			>
				<Image
					source={trainImg}
					style={{ width: trainWidth, aspectRatio: 2630/214, top: height - 120}}
				/>
			</Animated.View>
		</View>
  )
}

const styles = StyleSheet.create({
  floatingView: {
		position: 'absolute',
    flexDirection: 'row',
  },
})


export default TrainAnimation