import { Easing, Animated, useWindowDimensions } from 'react-native'
import { useEffect, useRef } from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

const ExcitedStar = ({ delay }) => {
  const upAnim = useRef(new Animated.Value(0)).current
  const { width } = useWindowDimensions()
	const JUMP_HEIGHT = width * .035
	const ICON_SIZE = width * .07

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(upAnim, {
          toValue: JUMP_HEIGHT,
          duration: 1000,
          easing: Easing.bezier(0.18, 0.55, 0.98, 0.57),
          useNativeDriver: true,
        }),
        Animated.timing(upAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bezier(0.18, 0.55, 0.98, 0.57),
          useNativeDriver: true,
        }),
      ]),
    )

    animation.start()

    return () => {
      animation.stop()
    }
  }, [upAnim, delay])

  return (
    <Animated.View style={{ transform: [{ translateY: upAnim }] }}>
      <AntDesignIcon color={'#D5AB55'} size={ICON_SIZE} name={'star'} />
    </Animated.View>
  )
}

export default ExcitedStar