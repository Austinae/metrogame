import { useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions, Platform } from 'react-native'
import Carousel from 'components/basics/Carousel'
import { useTranslation } from 'react-i18next'

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

const Learn = ({ navigation }) => {
  const { t } = useTranslation()
  const { playAudioAsync } = useMusicContext()
  const [country, setCountry] = useState('fr')

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
    navigation.navigate('SubwayInformation', { region: regionName })
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

export default Learn