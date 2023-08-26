import { createContext, useContext, useState, useEffect } from 'react'
import { Audio } from 'expo-av'

import { storeData, retrieveData } from 'helpers/localStorage'
import bgMusic1 from 'assets/music/track-1.mp3'
import bgMusic2 from 'assets/music/track-2.mp3'
import bgMusic3 from 'assets/music/track-3.mp3'
import bgMusic4 from 'assets/music/track-4.mp3'
import bgMusic5 from 'assets/music/track-5.mp3'
import bgMusic6 from 'assets/music/track-6.mp3'
import bgMusic7 from 'assets/music/track-7.mp3'
import bgMusic8 from 'assets/music/track-8.mp3'
import bgMusic9 from 'assets/music/track-9.mp3'

const BACKGROUND_MUSIC_LOCAL_KEY = 'isMusicOn'
const BACKGROUND_MUSIC_VOLUME_LOCAL_KEY = 'musicVolume'
const BACKGROUND_SOUND_FX_LOCAL_KEY = 'isSoundFXOn'
const BACKGROUND_MUSIC = [bgMusic1, bgMusic2, bgMusic3, bgMusic4, bgMusic5, bgMusic6, bgMusic7, bgMusic8, bgMusic9]

const Context = createContext({
	isMusicOn: false,
	setIsMusicOn: () => null,
	isSoundFXOn: false,
	setIsSoundFXOn: () => null,
	playAudioAsync: () => null,
	volume: false,
	setVolume: () => null,
})

const Provider = ({ ...props }) => {
	const [isMusicOn, setIsMusicOn] = useState(null)
	const [isSoundFXOn, setIsSoundFXOn] = useState(null)
	const [volume, setVolume] = useState(null)
	const [soundObject, setSoundObject] = useState(null)
	const [isVolumeLoaded, setIsVolumeLoaded] = useState(false)

	const playAudioAsync = async (file) => {
		if (isSoundFXOn) {
			const soundObject = new Audio.Sound()
			try {
				await soundObject.loadAsync(file)
				await soundObject.setPositionAsync(0)
				await soundObject.setVolumeAsync(volume)
				await soundObject.playAsync()
			} catch (error) {
				console.log('Error playing audio', error)
			}
		}
	}

	useEffect(() => {
			const checkMusicLocalStorage =  async () => {
				const isMusicOnLocalValue = await retrieveData(BACKGROUND_MUSIC_LOCAL_KEY)
				if (isMusicOnLocalValue == null) {setIsMusicOn(true)}
				else {setIsMusicOn(isMusicOnLocalValue)}
			}
			checkMusicLocalStorage()
			const checkSoundFXLocalStorage =  async () => {
				const isSoundFXOnLocalValue = await retrieveData(BACKGROUND_SOUND_FX_LOCAL_KEY)
				if (isSoundFXOnLocalValue == null) {setIsSoundFXOn(true)}
				else {setIsSoundFXOn(isSoundFXOnLocalValue)}
			}
			checkSoundFXLocalStorage()
			const checkMusicVolumeLocalStorage =  async () => {
				const volumeLocalValue = await retrieveData(BACKGROUND_MUSIC_VOLUME_LOCAL_KEY)
				if (volumeLocalValue == null) {setVolume(0.09)}
				else {setVolume(parseFloat(volumeLocalValue))}
				setIsVolumeLoaded(true)
			}
			checkMusicVolumeLocalStorage()
		}, []
	)

	useEffect(() => {
		if (!isVolumeLoaded) return

		const changeLocalStorage = async () => storeData(BACKGROUND_MUSIC_LOCAL_KEY, isMusicOn)

		const loadBackgroundMusic = async () => {
			changeLocalStorage()
			
			if (soundObject) {
				await soundObject.unloadAsync()
				setSoundObject(null)
			}
			if (isMusicOn) {
				const randomTrack = BACKGROUND_MUSIC[Math.floor(Math.random() * BACKGROUND_MUSIC.length)]
				const onPlaybackStatusUpdate = (status) => { if (status.didJustFinish) loadBackgroundMusic()}
				const { sound } = await Audio.Sound.createAsync(
					randomTrack,
					{ isLooping: false, isMuted: false, volume: volume },
					onPlaybackStatusUpdate
				)
					
				setSoundObject(sound)
				await sound.playAsync()
			}
		}
		
		loadBackgroundMusic()
		
		// Unload sound when component unmounts
		return async() => {
			if (soundObject) {
				await soundObject.unloadAsync()
				setSoundObject(null)
			}
		}
	}, [isMusicOn, isVolumeLoaded])
	
	useEffect(() => {
		const changeLocalStorage = async () => storeData(BACKGROUND_MUSIC_VOLUME_LOCAL_KEY, volume)
		changeLocalStorage()
		if (soundObject) {
			soundObject.setVolumeAsync(volume)
		}
	}, [volume])


	useEffect(() => {const changeLocalStorage = async () => storeData(BACKGROUND_SOUND_FX_LOCAL_KEY, isSoundFXOn); changeLocalStorage()}, [isSoundFXOn])


	const providedValues = { isMusicOn, setIsMusicOn, isSoundFXOn, setIsSoundFXOn, playAudioAsync, volume, setVolume }

  return (
    <Context.Provider
      value={providedValues}
      {...props}
    />
  )
}

const useMusicContext = () => useContext(Context)

export default useMusicContext
export { Provider }