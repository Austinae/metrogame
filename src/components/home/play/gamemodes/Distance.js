import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'
import _ from 'lodash'

import useGameContext from 'contexts/Game'

import { animateMapToRegion } from 'helpers/map'
import { calculateDistance, coordsCenterTwoPoints } from 'helpers/distances'
import { delay } from 'helpers/time'
import initialRegions from 'data/initialRegions'

import CountdownTimer from 'components/home/play/gamemodes/common/CountdownTimer'
import FullScreenCountdown from 'components/home/play/gamemodes/common/FullScreenCountdown'
import GameEndModal from 'components/home/play/gamemodes/common/GameEndModal'
import Score from 'components/home/play/gamemodes/common/Score'
import Round from 'components/home/play/gamemodes/common/Round'
import Map from 'components/home/play/gamemodes/common/Map'
import CustomMarker from 'components/home/play/gamemodes/common/CustomMarker'
import NextButton from 'components/home/play/gamemodes/common/NextButton'
import Station from 'components/home/play/gamemodes/common/Station'
import DoorsAnimation from 'components/home/play/gamemodes/common/DoorsAnimation'
import DashedLineAndText from 'components/home/play/gamemodes/distance/DashedLineAndText'
import Abandon from 'components/home/play/gamemodes/common/Abandon'

const PIN_TINT_COLOR = 'skyblue'
// It would be cool to have the tint go towards a certain color the closer the user is
// or custom and you buy it in the store with your coins
const USER_PIN_TINT_COLOR = 'white'
const { width, height } = Dimensions.get('window')
const NEXT_BUTTON_SIZE = height * .1
const NEXT_BUTTON_BOTTOM = height * .2
const GAME_LENGTH = 10
const GAME_LENGTH_SECONDS = 180

/*
  Event cycle of gamemode:

  1. Set initial region to that of the region
  2. Pick random station and set step to 'waitingUserClick' which invites the user to click the map
  4. User clicks on map, event is triggered
  5. Distance is calculated, step is set to 'showAnswer' displaying how far the user guess was,
     a next button appears to invite the user to move on to the next round
  6. Next button is pressed which picks a random station and sets step back to 'waitingUserClick'
*/
const Distance = () => {
  const mapRef = useRef(null)
  const { region, stationsCoords } = useGameContext()
  const initialRegion = initialRegions[region]

  const [timerKey, setTimerKey] =  useState(0)
  const [isCountdownShowing, setIsCountdownShowing] = useState(false)
  const [isTimeRunning, setIsTimmingRunning] = useState(false)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [isGameEndModalVisible, setIsGameEndModalVisible] = useState(false)
  const [step, setStep] = useState(null)
  const [pickedStation, setPickedStation] = useState(null)
  const [userClickCoords, setUserClickCoords] = useState(null)
  const [abandoned, setAbandoned] = useState(false)

  const setRandomStation = () => {
    const newPickedStation = _.sample(stationsCoords)
    setPickedStation(newPickedStation)
    animateMapToRegion(mapRef, initialRegion, 1000)
  }

  const resetGame = () => {
    setIsGameEndModalVisible(false)
    setScore(0)
    setRound(1)
    setTimerKey(timerKey + 1) // as per documentation https://github.com/vydimitrov/react-countdown-circle-timer/tree/master/packages/web#react-countdown-circle-timer
    setRandomStation()
    setIsTimmingRunning(true)
    setAbandoned(false)
    setStep('waitingUserClick')
  }

  const resetGameAfterDelay =  async () => {
    setIsCountdownShowing(true)
    delay(4000).then(() => {
      resetGame()
      setIsCountdownShowing(false)
    })
  }

  const handleNextPress = () => {
    setRandomStation()
    setUserClickCoords(null)
    setStep('waitingUserClick')
    if (round+1 > GAME_LENGTH) { setIsGameEndModalVisible(true); return }
    setRound(round+1)
  }

  const onMapPress = async(event) => {
    if (step != 'waitingUserClick') return
    const userClickCoords = event.nativeEvent.coordinate
    setUserClickCoords(event.nativeEvent.coordinate)
    const distance = calculateDistance(userClickCoords, pickedStation)
    setScore(score + distance)
    const centerPoint = coordsCenterTwoPoints(userClickCoords, pickedStation)
    animateMapToRegion(mapRef, centerPoint, 1000)
    setStep('showAnswer')
  }

  useEffect(() => {
    if (!isMapLoaded) return
    resetGameAfterDelay()
  }, [isMapLoaded])

  return (
    <>
      <Map mapRef={mapRef} setIsMapLoaded={setIsMapLoaded} onMapPress={onMapPress} region={region}>
        { pickedStation && step == 'showAnswer' && <>
          <CustomMarker coords={userClickCoords} tintColor={USER_PIN_TINT_COLOR} />
          <CustomMarker coords={pickedStation} tintColor={PIN_TINT_COLOR} />
          <DashedLineAndText point1={userClickCoords} point2={pickedStation} />
        </>}
      </Map>
      <Station station={pickedStation} />
      <Score score={score} type={'distance'} />
      <Round round={round} roundLimit={GAME_LENGTH} />
      <CountdownTimer isTimeRunning={isTimeRunning} onComplete={() => setIsGameEndModalVisible(true)} timerKey={timerKey} gameLength={GAME_LENGTH_SECONDS} />
      <Abandon setIsGameEndModalVisible={setIsGameEndModalVisible} setAbandoned={setAbandoned} setIsTimmingRunning={setIsTimmingRunning} />
      {isGameEndModalVisible && <GameEndModal isGameEndModalVisible={isGameEndModalVisible} setIsGameEndModalVisible={setIsGameEndModalVisible} score={score} restart={resetGameAfterDelay} type={'distance'} abandoned={abandoned} endByRound={round+1 > GAME_LENGTH} />}
      {step == 'showAnswer' && <NextButton onPress={handleNextPress} containerStyle={styles.nextButton} />}
      {isCountdownShowing && <FullScreenCountdown />}
      <DoorsAnimation />
    </>
  )
}

const styles = StyleSheet.create({
  nextButton: {
    borderRadius: 10,
    width: NEXT_BUTTON_SIZE,
    height: NEXT_BUTTON_SIZE,
    position: 'absolute',
    bottom: NEXT_BUTTON_BOTTOM,
    left: '50%',
    transform: [{ translateX: -NEXT_BUTTON_SIZE/2 }],
  },
})

export default Distance


//   if (gameParameters.gameMode == "classic") {
//     const { latitude: nearingStationLatitude, longitude: nearingStationLongitude, name: nearingStationName } = findNearestStation(inputCoordinates, filteredStations)
//     const nearingStationCoordinates = { latitude: +nearingStationLatitude, longitude: +nearingStationLongitude }
//     setMarkerCoordinates(nearingStationCoordinates)
//     var diffLat = Math.abs(stationCoordinates.latitude - nearingStationCoordinates.latitude)
//     var diffLong = Math.abs(stationCoordinates.longitude - nearingStationCoordinates.longitude)
//     if (mapRef.current) {
//       if (nearingStationName == station.name) {
//         setStationImage("gold")
//         mapRef.current.animateToRegion({
//           latitude: stationCoordinates.latitude,
//           longitude: stationCoordinates.longitude,
//           latitudeDelta: 0.1,
//           longitudeDelta: 0.1,
//         }, 1500)
//       } else {
//         setStationImage("red")
//         mapRef.current.animateToRegion({
//           latitude: (stationCoordinates.latitude + nearingStationCoordinates.latitude) / 2,
//           longitude: (stationCoordinates.longitude + nearingStationCoordinates.longitude) / 2,
//           latitudeDelta: diffLat*1.7,
//           longitudeDelta: diffLong*1.7,
//         }, 1500)
//       }
//     }
//     setScore(score + ((nearingStationName == station.name) ? 1 : 0))
//   }