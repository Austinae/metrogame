
import { useRef } from 'react'
import { StatusBar, View, StyleSheet, FlatList, Image, Dimensions, Animated, Platform, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')
const SPACING = width * .02
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = height * 0.65
const NAVIGATION_DOT_SIZE = width * .02

const Navigation = ({ scrollX, data }) => {
  return (
    <View style={styles.navigation}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * ITEM_SIZE, i * ITEM_SIZE, (i + 1) * ITEM_SIZE]
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        })
        return <Animated.View key={`nav-dot-${i}`} style={[styles.navigationDot, { opacity, transform: [{scale}]}]}/>
      })}
    </View>
  )
}

const Backdrop = ({ data, scrollX, backgroundColor }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <FlatList
        data={data.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.image) { return null }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            extrapolate:'clamp'
          })

          return (
            <Animated.View removeClippedSubviews={false} style={[styles.backdrop, {width: translateX}]}>
              <Image source={typeof(item.image) == 'string' ? { uri: item.image } : item.image} style={styles.backdropImage} />
            </Animated.View>
          )
        }}
      />
      <LinearGradient colors={['rgba(0, 0, 0, 0)', backgroundColor]} style={styles.backdropGradient} />
    </View>
  )
}

const Carousel = ({ data, onCardPress, CardComponent, backgroundColor }) => {
  const scrollX = useRef(new Animated.Value(0)).current
	const usableData = [{ key: 'empty-left' }, ...data,	{ key: 'empty-right' }]

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Backdrop data={usableData} scrollX={scrollX} backgroundColor={backgroundColor} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={usableData}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.image) return <View style={{ width: EMPTY_ITEM_SIZE }} />

          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE]
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          })
          
          return (
            <TouchableOpacity onPress={() => onCardPress(item.key)} activeOpacity={1}>
              <View style={{ width: ITEM_SIZE }}>
                <Animated.View style={[styles.card, {backgroundColor, opacity: .9, transform: [{ translateY }]}]}>
                  <CardComponent item={item} />
                </Animated.View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <Navigation data={data} scrollX={scrollX}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#FBCCFA',
  },
  card: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    borderRadius: 34,
  },
  backdropGradient: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
    bottom: 0,
  },
  backdropImage: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
  },
  backdrop: {
    position: 'absolute',
    height,
    overflow: 'hidden',
  },
  navigation: {
    bottom: 20,
    flexDirection: 'row',
    width,
    justifyContent: 'center',
  },
  navigationDot: {
    height: NAVIGATION_DOT_SIZE,
    width: NAVIGATION_DOT_SIZE,
    borderRadius: NAVIGATION_DOT_SIZE/2,
    backgroundColor: '#333',
    margin: NAVIGATION_DOT_SIZE,
  }
})

export default Carousel