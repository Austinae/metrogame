import { Animated, useWindowDimensions, Easing, StyleSheet, TouchableOpacity } from 'react-native'
import { useRef, useEffect } from 'react'

import EntypoIcon from 'react-native-vector-icons/Entypo'

const Achievements = () => {
	const achievementAnim = useRef(new Animated.Value(-5)).current
	const { width } = useWindowDimensions()
	const ICON_SIZE = width * .15
  
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(achievementAnim, {
          toValue: 5,
          duration: 2000,
          easing: Easing.bezier(.38, .56, 1, 1.01),
          useNativeDriver: true,
        }),
        Animated.timing(achievementAnim, {
          toValue: -5,
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
  }, [achievementAnim, width])
  const interpolatedRotation = achievementAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  })
	return (
		<TouchableOpacity
			onPress={() => console.log("hey")}
			style={
				[styles.trophy,
					{
						borderRadius: ICON_SIZE,
						borderWidth: ICON_SIZE,
						height: ICON_SIZE,
						width: ICON_SIZE,
						transform: [{ rotate: interpolatedRotation }]
					}
				]
			}
		>
			<Animated.View style={{ width: ICON_SIZE, height: ICON_SIZE}}>
				<EntypoIcon color={'#FFD700'} size={ICON_SIZE} name={'trophy'} />
			</Animated.View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	trophy: {
		position: 'absolute',
		right: 20,
		top: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'grey',
	}
})

export default Achievements