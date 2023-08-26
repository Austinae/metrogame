import { Text, View, StyleSheet, Image, Dimensions, Platform } from 'react-native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Carousel from 'components/basics/Carousel'
import useGameContext from 'contexts/Game'
import useMusicContext from 'contexts/Music'
import data from 'data/regions'

import RibbonProgressBar from 'components/basics/RibbonProgressBar'
import buttonSound from 'assets/sounds/button2.mp3'
import Back from 'components/basics/Back'
import CountrySelection from 'components/common/CountrySelection'

const { width, height } = Dimensions.get('window')
const SPACING = width * .02
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const TITLE_FONT_SIZE = width * 0.07
const REGION_TAGS_SIZE = width * .14
const REGION_TAGS_SIZE_HEIGHT = REGION_TAGS_SIZE * 3 / 5

const RegionSelection = ({ navigation }) => {
  const { t } = useTranslation()
  const { setRegion } = useGameContext()
  const { playAudioAsync } = useMusicContext()
  const [country, setCountry] = useState('fr')

  const menuItems = [t('gameSetupStepRegion')]

  const onPressEvent = async(regionName) => {
    await playAudioAsync(buttonSound)
    setRegion(regionName)
    navigation.navigate('GamemodeSelection')
  } 

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

  return (
    <>
      <Carousel data={data.filter((region, index) => region.countryKey == country)} onCardPress={onPressEvent} CardComponent={Card} backgroundColor={'#c1c6fc'} />
      <RibbonProgressBar menuItems={menuItems} />
      <Back onPress={() => navigation.navigate('Home')} customStyle={{ position: 'absolute', top: 10, right: 10 }} />
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

export default RegionSelection