import { useState } from 'react'
import { ImageBackground, View, Dimensions, Text, StyleSheet } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import ReactNativeModal from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import useLanguageContext from 'contexts/Language'
import { SelectList } from 'react-native-dropdown-select-list'

import { delay } from 'helpers/time'
import turningOnSound from 'assets/sounds/turningOn.mp3'
import turningOffSound from 'assets/sounds/turningOff.mp3'
import grr from 'assets/sounds/button2.mp3'
import useMusicContext from 'contexts/Music'
import Button from 'components/basics/Button'
import cabineImg from 'assets/images/miscellaneous/cabine.jpeg'
import VolumeSlider from 'components/settings/VolumeSlider'
import Back from 'components/basics/Back'

const { width, height } = Dimensions.get('window')
const ICON_SIZE = width * .7 * .2
const IMAGE_HEIGHT = height * 0.6
const BUTTON_BOTTOM = height * .1
const FONT_SIZE = height * .04
const SELECT_WIDTH = width * .5
const SELECT_HEIGHT = height * .06
const INPUT_FONT_SIZE = height * .025
const SELECT_LIST_CHEVRON_SIZE = height * .04
const SELECT_LIST_ICON_SIZE = height * .03

const Settings = ({ navigation }) => {
	const { isMusicOn, setIsMusicOn, isSoundFXOn, setIsSoundFXOn, playAudioAsync } = useMusicContext()
	const [isMusicButtonVisible, setIsMusicButtonVisible] = useState(true)
	const { t } = useTranslation()
	const { languagePickerData, language, setLanguage } = useLanguageContext()
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false)

	const onLanguagePress = async() => {
		setIsLanguageModalVisible(true)
	}
	const onMusicPress = async() => {
		if(!isMusicButtonVisible) return
		await playAudioAsync(isMusicOn ? turningOffSound : turningOnSound)
		setIsMusicOn(!isMusicOn)
		setIsMusicButtonVisible(false)
    delay(300).then(() => {
      setIsMusicButtonVisible(true)
    })
	}
	const onSoundFXPress = async() => {
		await playAudioAsync(isSoundFXOn ? turningOffSound : turningOnSound)
		setIsSoundFXOn(!isSoundFXOn)
	}

	return (
		<ImageBackground
			source={cabineImg}
			imageStyle={{opacity: .7}}
			style={[styles.imageBackground, { height }]}
		>
			<Back onPress={() => navigation.navigate('Home')} color={'white'} />
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2}}>
				<Button text={t('language')} onPress={onLanguagePress}>
					<MaterialIcon color={'#8080FF'} size={ICON_SIZE} name={'language'} />
				</Button>
				<Button text={t('soundFx')} onPress={onSoundFXPress}>
					<MaterialCommunityIcon color={isSoundFXOn ? '#0f52ba' : '#CCCCCC'} size={ICON_SIZE} name={isSoundFXOn ? 'music' : 'music-off'}/>
				</Button>
				<Button text={t('music')} onPress={onMusicPress} customStyle={{opacity: isMusicButtonVisible ? 1 : .4}}>
					<MaterialCommunityIcon color={isMusicOn ? '#0f52ba' : '#CCCCCC'} size={ICON_SIZE} name={isMusicOn ? 'music-note-eighth' : 'music-note-off'}/>
				</Button>
				<VolumeSlider />
			</View>
			<ReactNativeModal
				isVisible={isLanguageModalVisible}
				onBackdropPress={() => setIsLanguageModalVisible(!isLanguageModalVisible)} 
				style={styles.modalContainer}
			>
				<View style={{ backgroundColor: 'rgba(255,255,255,.7)', borderRadius: 20, width: width * .7, height: height * .5, justifyContent: 'center', alignItems: 'center'}}>
					<SelectList 
						setSelected={(val) => setLanguage(val)} 
						data={languagePickerData}
						search={false}
						save="key"
						fontFamily='Raleway'
						boxStyles={{ width: SELECT_WIDTH, height: SELECT_HEIGHT }}
						inputStyles={{ fontSize: INPUT_FONT_SIZE, height: SELECT_HEIGHT, alignSelf: 'center',marginTop: INPUT_FONT_SIZE }}
						dropdownTextStyles={{ fontSize: INPUT_FONT_SIZE }}
						dropdownStyles={{ backgroundColor: 'rgba(255,255,255,.9)' }}
						arrowicon={<FeatherIcon name={"chevron-down"} size={SELECT_LIST_CHEVRON_SIZE} />} 
						searchicon={<FeatherIcon name={"search"} size={SELECT_LIST_ICON_SIZE} />}
						defaultOption={languagePickerData.find((item) => language == item.key)}
					/>
				</View>
			</ReactNativeModal>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	imageBackground: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		backgroundColor: 'white',
		padding: 22,
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#FFF',
	},
})

export default Settings