import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native'
import { useEffect, useState, useRef } from 'react'

import { convertNumToDistance } from 'helpers/distances'

const { width, height } = Dimensions.get('window')
const SCORE_CONTAINER_HEIGHT = height * .1
const SCORE_CONTAINER_WIDTH = width * .4
const SCORE_FONT_SIZE_LARGE = SCORE_CONTAINER_HEIGHT * .7
const SCORE_FONT_SIZE_MEDIUM = SCORE_CONTAINER_HEIGHT * .6
const SCORE_FONT_SIZE_SMALL = SCORE_CONTAINER_HEIGHT * .5
const SCORE_FONT_SIZE_VERY_SMALL = SCORE_CONTAINER_HEIGHT * .3

const FadeOutView = ({ value, onComplete, theFontSize }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current
  const positionAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        positionAnim,
        {
          toValue: -50,
          duration: 2000,
          useNativeDriver: true,
        }
      )
    ]).start(onComplete)
  }, [])

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: positionAnim }] }}>
      <Text style={{ fontSize: theFontSize }}>{`+${value}`}</Text>
    </Animated.View>
  )
}

const Score = ({ score, type }) => {
	const [prevScore, setPrevScore] = useState(0)
  const [animations, setAnimations] = useState([])

  const removeAnimation = key => {
    setAnimations(a => a.filter(item => item.key !== key))
  }

	useEffect(() => {
		if (score > prevScore) {
			setAnimations(a => [...a, { scoreIncrement: score - prevScore, key: Date.now() }])
		}
		setPrevScore(score)
	}, [score])

  let newFontSize = SCORE_FONT_SIZE_LARGE
  if (score > 99999) newFontSize = SCORE_FONT_SIZE_MEDIUM
  if (score > 999999) newFontSize = SCORE_FONT_SIZE_SMALL
  if (score > 9999999) newFontSize = SCORE_FONT_SIZE_VERY_SMALL

  return (
    <View style={styles.scoreContainer}>
			<Text style={[styles.scoreText, { fontSize: newFontSize }]}>{type == 'distance' ? convertNumToDistance(score) : score}</Text>
			{animations.map(({ scoreIncrement, key }) =>
				<FadeOutView
					key={key}
					value={scoreIncrement}
					onComplete={() => removeAnimation(key)}
          theFontSize={newFontSize}
				/>
			)}
    </View>
	)
}

const styles = StyleSheet.create({
	scoreContainer: {
    width: SCORE_CONTAINER_WIDTH,
    height: SCORE_CONTAINER_HEIGHT,
    backgroundColor: 'skyblue',
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'flex-end',
    borderBottomLeftRadius: SCORE_CONTAINER_HEIGHT / 4,
    opacity: .7
  },
  scoreText: {
    position:'absolute',
  },
})

export default Score