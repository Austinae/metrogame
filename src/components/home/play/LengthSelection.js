import { useEffect, useRef, useState } from 'react';
import { TextInput, SafeAreaView, Animated, Image, Dimensions, StyleSheet, View } from 'react-native'

import subwayGif from 'assets/images/miscellaneous/subway.gif'
import useGameContext from 'contexts/Game'

const { width, height } = Dimensions.get('screen')
const minAge = 5
const segmentsLength = 39
const segmentWidth = 2
const segmentSpacing = 20
const snapSegment = segmentWidth + segmentSpacing
const spacerWidth = (width - segmentWidth) / 2
const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment
const indicatorWidth = 100
const indicatorHeight = height * .15
const segmentHeightUnit = height * .05
const segmentHeightTenth = segmentHeightUnit * 2
const data = [...Array(segmentsLength).keys()].map(i => i + minAge)

const Ruler = () => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {data.map(i => {
        const tenth = i % 10 === 0
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: tenth ? '#333' : '#999',
                height: tenth ? segmentHeightTenth : segmentHeightUnit,
                marginRight: i === data.length - 1 ? 0 : segmentSpacing
              }
            ]}
          />
        )
      })}
      <View style={styles.spacer} />
    </View>
  )
}

const LengthSelection = ({}) => {
	const scrollX = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef(null)
  const textInputRef = useRef(null)
	const [initialAge] = useState(5)
	const {region, gamemode} = useGameContext()

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      if (textInputRef && textInputRef.current) {
        textInputRef.current.setNativeProps({
          text: `${Math.round(value / snapSegment) + minAge}`
        })
      }
    })

    setTimeout(() => {
      if (scrollViewRef && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (initialAge - minAge) * snapSegment,
          y: 0,
          animated: true
        })
      }
    }, 1000)

    return () => {
      // Remove the listener when the component is unmounted
      scrollX.removeListener(listenerId);
    }
  }, [scrollX, initialAge])

	return (
		<SafeAreaView style={styles.container}>
			<Image source={subwayGif} style={styles.cake} />

			<Animated.ScrollView
				ref={scrollViewRef}
				horizontal
				contentContainerStyle={styles.scrollViewContainerStyle}
				bounces={false}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				snapToInterval={snapSegment}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x: scrollX }
							}
						}
					],
					{ useNativeDriver: true }
				)}
			>
				<Ruler />
			</Animated.ScrollView>
			<View style={styles.indicatorWrapper}>
				<TextInput
					ref={textInputRef}
					style={styles.ageTextStyle}
					defaultValue={minAge.toString()}
				/>
				<View style={[styles.segment, styles.segmentIndicator]} />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    position: 'absolute',
    left: (width - indicatorWidth) / 2,
    bottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWidth
  },
  segmentIndicator: {
    height: indicatorHeight,
    backgroundColor: 'turquoise'
  },
  container: {
    flex: 1,
    backgroundColor: '#FBCCFA',
    position: 'relative'
  },
  cake: {
    width,
    height: width * .4,
		marginTop: height * .2,
    resizeMode: 'cover'
  },
  ruler: {
    width: rulerWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  segment: {
    width: segmentWidth
  },
  scrollViewContainerStyle: {
    justifyContent: 'flex-end'
  },
  ageTextStyle: {
    fontSize: 42,
    fontFamily: 'Raleway-bold'
  },
  spacer: {
    width: spacerWidth,
    backgroundColor: 'red'
  }
})

export default LengthSelection