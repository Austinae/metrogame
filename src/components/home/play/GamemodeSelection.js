import { Text, StyleSheet, Image, Dimensions, Platform } from 'react-native'
import Carousel from 'components/basics/Carousel'
import { useTranslation } from 'react-i18next'

import useGameContext from 'contexts/Game'
import useMusicContext from 'contexts/Music'
import RibbonProgressBar from 'components/basics/RibbonProgressBar'
import data from 'data/gamemodes'
import buttonSound from 'assets/sounds/button2.mp3'
import Back from 'components/basics/Back'

const { width } = Dimensions.get('window')
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const TITLE_FONT_SIZE = width * 0.07

const GamemodeSelection = ({ navigation }) => {
  const { t } = useTranslation()
  const menuItems = [t('gameSetupStepRegion'), t('gameSetupStepGamemode')]
  const { setGamemode } = useGameContext()
  const { isSoundFXOn, playAudioAsync } = useMusicContext()
  
  const Card = ({ item }) => {
    return (
      <>
        <Image source={item.image} style={styles.posterImage} />
        <Text style={styles.gamemodeTitle} numberOfLines={1}>{t(`gameSelection.${item.key}`)}</Text>
      </>
    )
  }

  const onPressEvent = async (regionName) => {
    if (isSoundFXOn) await playAudioAsync(buttonSound)
    setGamemode(regionName)
    navigation.navigate('LinesSelection')
  } 

  return (
    <>
      <Carousel data={data} onCardPress={onPressEvent} CardComponent={Card} backgroundColor={'white'} />
      <RibbonProgressBar menuItems={menuItems} />
      <Back onPress={() => navigation.navigate('RegionSelection')} customStyle={{ position: 'absolute', top: 10, right: 10 }} />
    </>
  )
}

const styles = StyleSheet.create({
  gamemodeTitle: {
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
})

export default GamemodeSelection