import { useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, Platform } from 'react-native'
import Carousel from 'components/basics/Carousel'
import { useTranslation } from 'react-i18next'

import linesImagesData from 'data/linesImages'
import useGameContext from 'contexts/Game'
import useMusicContext from 'contexts/Music'
import CountrySelection from 'components/common/CountrySelection'

import buttonSound from 'assets/sounds/button2.mp3'
import data from 'data/regions'

const { width, height } = Dimensions.get('window')
const SPACING = width * .02
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const TITLE_FONT_SIZE = width * 0.07
const REGION_TAGS_SIZE = width * .14
const REGION_TAGS_SIZE_HEIGHT = REGION_TAGS_SIZE * 3 / 5

const Explore = ({ navigation }) => {
  const { t } = useTranslation()
  const { playAudioAsync } = useMusicContext()
  const [country, setCountry] = useState('fr')
  const { setRegionExplore, setDrawLinesExplore, setLinesExplore } = useGameContext()
  
  const Card = ({ item }) => {
    return (
      <>
        <Image source={{ uri: item.image }} style={styles.posterImage} />
        <Text style={styles.regionTitle} numberOfLines={1}>{t(`cities.${item.key}`)}</Text>
        <View style={[styles.countryTag, {width: REGION_TAGS_SIZE, height: REGION_TAGS_SIZE, top: SPACING*2 }]}>
          <item.icon width={REGION_TAGS_SIZE} height={REGION_TAGS_SIZE} />
        </View>
      </>
    )
  }

  const onPressEvent = async(regionName) => {
    await playAudioAsync(buttonSound)
    setRegionExplore(regionName)
    const data = linesImagesData[regionName]
    const lineNames = data.map(item => item.name)
    setLinesExplore(lineNames)
    setDrawLinesExplore(lineNames.slice(0, Math.min(lineNames.length, 2)))
    navigation.navigate('ExploreMap')
  } 

  return (
    <>
      <Carousel data={data.filter((region, index) => region.countryKey == country)} onCardPress={onPressEvent} CardComponent={Card} backgroundColor={'#c1c6fc'} />
      <CountrySelection country={country} setCountry={setCountry} />
    </>
  )
}

const styles = StyleSheet.create({
  regionTitle: {
    fontSize: TITLE_FONT_SIZE,
    fontFamily: 'Parisine',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  countryTag: {
    position: 'absolute',
    top: SPACING*2,
    right: SPACING*2,
    width: REGION_TAGS_SIZE,
    height: REGION_TAGS_SIZE_HEIGHT,
    borderRadius: REGION_TAGS_SIZE,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '',
    borderWidth: REGION_TAGS_SIZE / 20,
    overflow: 'hidden',
  },
})

export default Explore