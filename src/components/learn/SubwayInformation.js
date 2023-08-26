import { useState, useRef } from 'react'
import { ImageBackground, StyleSheet, View, TouchableOpacity, Dimensions, Text, Image, FlatList, Animated, ScrollView } from 'react-native'
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { ImageZoom } from '@likashefqet/react-native-image-zoom'
import { useTranslation } from 'react-i18next'

import regions from 'data/regions'
import stockData from 'data/information/stock'
import Back from 'components/basics/Back'

const { width, height } = Dimensions.get('window')
const HEAD_CONTAINER_HEIGHT = height * .2
const BASICS_ICON_SIZE = height * .04
const BASIC_INFO_CONTAINER_WIDTH = width * .4
const BASIC_INFO_BIG_CONTAINER_WIDTH = BASIC_INFO_CONTAINER_WIDTH * 1.22
const BASIC_INFO_CONTAINER_HEIGHT = width * .4
const BASIC_INFO_FONT_SIZE = BASIC_INFO_CONTAINER_WIDTH * .06
const BASIC_INFO_CONTAINER_PADDING = BASIC_INFO_CONTAINER_WIDTH * .1
const BASIC_INFO_CONTAINER_GAP = BASIC_INFO_CONTAINER_WIDTH * .1
const BASIC_INFO_CONTAINER_MARGIN = BASIC_INFO_CONTAINER_WIDTH * .1
const BASIC_INFO_CONTAINER_BG_COLOR = 'lightskyblue'
const ARROW_ICON_SIZE = BASIC_INFO_CONTAINER_HEIGHT * .3
const EXIT_ICON_SIZE = height * .07
const EXIT_ICON_COLOR = 'white'
const NAVIGATION_DOT_SIZE = width * .012


const Navigation = ({ scrollX, data }) => {
  return (
    <View style={styles.navigation}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * BASIC_INFO_BIG_CONTAINER_WIDTH, i * BASIC_INFO_BIG_CONTAINER_WIDTH, (i + 1) * BASIC_INFO_BIG_CONTAINER_WIDTH]
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

const InfoSection = ({ icon: Icon, iconName, infoTitle, infoValue }) => {
  return (
    <View style={styles.basicInfoRow}>
      <Icon name={iconName} size={BASICS_ICON_SIZE}/>
      <View style={{ flexDirection: 'column', gap: 2}}>
        <Text style={styles.basicInfoRowTitle}>{infoTitle}: </Text>
        <Text style={styles.basicInfoRowInfo}>{infoValue}</Text>
      </View>
    </View>
  )
}

const InfoSectionTitle = ({ text, hasMarginTop }) => {
  return (
    <View style={{ marginLeft: BASIC_INFO_CONTAINER_MARGIN, marginTop: hasMarginTop ? BASIC_INFO_CONTAINER_MARGIN : 0 }}>
      <Text style={{ fontSize: BASIC_INFO_FONT_SIZE * 1.3, fontFamily: 'Raleway-bold', textDecorationLine: 'underline' }}>{text}</Text>
    </View>
  )
}

const SubwayInformation = ({ navigation, route }) => {
  const { t } = useTranslation()
  const scrollX = useRef(new Animated.Value(0)).current
  const { region } = route.params
  const { key, title, image, opened, length, yearlyRidership, map, stock, ticket } = regions.find(item => item.key === region)
  Image.prefetch(map)
  const [imageForModal, setImageForModal] = useState(null)
  const [imageVisibility, setImageVisibility] = useState(false)

  const ClickableImage = ({ uri, hasSmallWidth }) => {
    return (
      <TouchableOpacity
        style={[styles.basicsInfoContainer, { width: BASIC_INFO_CONTAINER_WIDTH, padding: 0, backgroundColor: null}]}
        onPress={() => { setImageForModal(uri); setImageVisibility(true)}}
      >
        <ImageBackground source={{uri}} style={[styles.basicsInfoContainer, { height: BASIC_INFO_CONTAINER_HEIGHT, width: hasSmallWidth ? BASIC_INFO_CONTAINER_WIDTH : BASIC_INFO_BIG_CONTAINER_WIDTH}]}/>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1}}>
		  <ImageBackground
        source={{uri: image}}
        imageStyle={{opacity: .5}}
        style={styles.header}
      >
        <View style={{ borderTopLeftRadius:height * .02, borderTopRightRadius:height * .02, position: 'absolute', left: 10, bottom: 0, paddingHorizontal: height * .02, backgroundColor: 'white'}}>
          <Text style={{ fontFamily: 'Raleway-bold', fontSize: height * .06 }}>{t(`cities.${key}`)}</Text>
        </View>
      </ImageBackground>
      <Back onPress={() => navigation.navigate('Learn')} />
      <ScrollView persistentScrollbar={true} style={{ flexGrow: 1, backgroundColor: 'white' }}>
        <InfoSectionTitle text={t("informationPage.general")} hasMarginTop={true} />
        <View style={styles.rowContainers}>
          <View style={styles.basicsInfoContainer}>
            <InfoSection icon={EntypoIcon} iconName={"back-in-time"} infoTitle={t("informationPage.opened")} infoValue={opened}/>
            <InfoSection icon={MaterialCommunityIconsIcon} iconName={"diameter-outline"} infoTitle={t("informationPage.length")} infoValue={length}/>
            <InfoSection icon={MaterialCommunityIconsIcon} iconName={"account-group-outline"} infoTitle={t("informationPage.yearlyRidership")} infoValue={yearlyRidership}/>
          </View>
          <ClickableImage uri={map} hasSmallWidth={true} />
        </View>
        {ticket && 
          <View style={[styles.rowContainers, { marginTop: 0}]}>
            <ClickableImage uri={ticket} hasSmallWidth={false} />
          </View>
        }
        <InfoSectionTitle text={t("informationPage.subwayStock")} hasMarginTop={false} />
        <View style={styles.rowContainers}>
          {stock && <ClickableImage uri={stock} hasSmallWidth={false} />}
          <ImageBackground imageStyle={{opacity: .3}} source={{uri: 'https://static.wikia.nocookie.net/mind-the-gap-rblx/images/8/84/Bentley_metcam_stock.jpg'}} style={[styles.basicsInfoContainer, { width: BASIC_INFO_BIG_CONTAINER_WIDTH, padding: 0, backgroundColor: null, overflow: 'hidden'}]}>
            <View style={styles.rightArrowContainer}>
              <MaterialIconsIcon name={'arrow-right'} size={ARROW_ICON_SIZE} />
            </View>
            <View style={{ position: 'absolute', right: 10, top: 25, transform: [{rotate: '30deg'}]}}>
              <Text style={{fontSize: BASIC_INFO_BIG_CONTAINER_WIDTH*.06}}>({t('informationPage.swipe')} {'\n'}& {t('informationPage.click')})</Text>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={stockData[region]}
              keyExtractor={(item) => item.name}
              horizontal
              bounces={false}
              decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
              renderToHardwareTextureAndroid
              contentContainerStyle={{ alignItems: 'center' }}
              snapToInterval={BASIC_INFO_BIG_CONTAINER_WIDTH}
              snapToAlignment='start'
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {setImageForModal(item.image); setImageVisibility(true)}}
                    activeOpacity={1}
                    style={{
                      width: BASIC_INFO_BIG_CONTAINER_WIDTH,
                      height: BASIC_INFO_CONTAINER_HEIGHT,
                      transform: [{translateY: BASIC_INFO_FONT_SIZE / 1.2}],
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    >
                    <Text style={{ fontFamily: 'Parisine', fontSize: BASIC_INFO_CONTAINER_HEIGHT * .18}}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }}
            />
            <Navigation data={stockData[region]} scrollX={scrollX} />
          </ImageBackground>
        </View>
      </ScrollView>
      {imageVisibility &&
				<>
					<ImageZoom
						uri={imageForModal}
						containerStyle={styles.mapModalContainer}
					/>
					<TouchableOpacity style={styles.mapModalExitContainer} onPress={() => setImageVisibility(false)}>
						<AntDesignIcon name={'closecircle'} size={EXIT_ICON_SIZE} color={EXIT_ICON_COLOR} />
					</TouchableOpacity>
				</>
			}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: HEAD_CONTAINER_HEIGHT,
    width,
    overflow: 'hidden',
  },
  basicsInfoContainer: {
    width: BASIC_INFO_BIG_CONTAINER_WIDTH,
    flexDirection: 'column',
    padding: BASIC_INFO_CONTAINER_PADDING,
    gap: BASIC_INFO_CONTAINER_GAP,
    backgroundColor: BASIC_INFO_CONTAINER_BG_COLOR,
    borderRadius: BASIC_INFO_CONTAINER_PADDING * 2,
    overflow: 'hidden',
  },
  basicInfoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  basicInfoRowTitle: {
    fontSize: BASIC_INFO_FONT_SIZE,
    fontFamily: 'Raleway-bold',
  },
  basicInfoRowInfo: {
    fontSize: BASIC_INFO_FONT_SIZE,
    fontFamily: 'Raleway',
  },
  mapModalContainer: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'black',
		zIndex: 2,
		top: 0,
  },
  mapModalExitContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
		zIndex: 2,
  },
  navigation: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: BASIC_INFO_BIG_CONTAINER_WIDTH,
    justifyContent: 'center',
  },
  navigationDot: {
    height: NAVIGATION_DOT_SIZE,
    width: NAVIGATION_DOT_SIZE,
    borderRadius: NAVIGATION_DOT_SIZE/2,
    backgroundColor: '#333',
    margin: NAVIGATION_DOT_SIZE,
  },
  rowContainers: {
    flexDirection: 'row',
    margin: BASIC_INFO_CONTAINER_MARGIN,
    justifyContent: 'space-between',
    gap: 10 
  },
  rightArrowContainer: {
    position: 'absolute',
    right: 0,
    top: (BASIC_INFO_CONTAINER_HEIGHT/2) - (ARROW_ICON_SIZE/2),
  },
})

export default SubwayInformation