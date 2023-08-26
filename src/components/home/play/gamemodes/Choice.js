import React, { useState, useRef, useEffect } from 'react'
import _ from 'lodash'

import useGameContext from 'contexts/Game'
import useMusicContext from 'contexts/Music'
import { animateMapToRegion, stationToRegion } from 'helpers/map'
import { delay } from 'helpers/time'

import CountdownTimer from 'components/home/play/gamemodes/common/CountdownTimer'
import DrawingLines from 'components/home/play/gamemodes/common/DrawingLines'
import DrawingStationsCircles from 'components/home/play/gamemodes/common/DrawingStationsCircles'
import LifeTracker from 'components/home/play/gamemodes/common/LifeTracker'
import FullScreenCountdown from 'components/home/play/gamemodes/common/FullScreenCountdown'
import GameEndModal from 'components/home/play/gamemodes/common/GameEndModal'
import Score from 'components/home/play/gamemodes/common/Score'
import Round from 'components/home/play/gamemodes/common/Round'
import Map from 'components/home/play/gamemodes/common/Map'
import CustomMarker from 'components/home/play/gamemodes/common/CustomMarker'
import PickLinesModal from 'components/home/play/gamemodes/common/PickLinesModal'
import DoorsAnimation from 'components/home/play/gamemodes/common/DoorsAnimation'
import FourChoiceForm from 'components/home/play/gamemodes/quiz/FourChoiceForm'
import Abandon from 'components/home/play/gamemodes/common/Abandon'

import heartLossAudio from 'assets/sounds/heartLoss.mp3'
import bellAudio from 'assets/sounds/bell.mp3'

const NUMBER_LIVES = 3
const PIN_TINT_COLOR = 'skyblue'

// In seconds
const GAME_LENGTH = 60

/*
  Event cycle of gamemode:

  1. Pick random station
  2. Create an array of length 4 containing the station from step 1 and 3 other random stations
  3. Display station and options to screen
  4. FourChoiceForm deals with validity, here the callback deals with increasing round and score
*/
const Choice = () => {
  const mapRef = useRef(null)
  const { region, stationsCoords, stationsGroupedByLine, lines, drawLines, setDrawLines } = useGameContext()
  const { playAudioAsync } = useMusicContext()

  const [isOptionSelected, setIsOptionSelected] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [lives, setLives] = useState(NUMBER_LIVES)
  const [timerKey, setTimerKey] =  useState(0)
  const [isCountdownShowing, setIsCountdownShowing] = useState(false)
  const [isTimeRunning, setIsTimmingRunning] = useState(false)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [pickedStation, setPickedStation] = useState(null)
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [isGameEndModalVisible, setIsGameEndModalVisible] = useState(false)
  const [abandoned, setAbandoned] = useState(false)
 
  const getRandomOptions = (answer) => {
    const options = _.sampleSize(stationsCoords.filter(station => station.name !== answer), 3).map(station => station.name)
    return _.shuffle([...options, answer])
  }

  useEffect(() => {
    if (!isMapLoaded) return
    resetGameAfterDelay()
  }, [isMapLoaded])

  if (stationsCoords==null || stationsGroupedByLine == null) return null

  const setRandomStationAndOptions = () => {
    const newPickedStation = _.sample(stationsCoords)
    setPickedStation(newPickedStation)
    setOptions(getRandomOptions(newPickedStation.name))
    animateMapToRegion(mapRef, stationToRegion(newPickedStation, 'station'), 1000)
    setRound(round + 1)
  }

  const resetGame = () => {
    setIsGameEndModalVisible(false)
    setScore(0)
    setLives(NUMBER_LIVES)
    setTimerKey(timerKey + 1) // as per documentation https://github.com/vydimitrov/react-countdown-circle-timer/tree/master/packages/web#react-countdown-circle-timer
    setRandomStationAndOptions()
    setRound(1)
    setAbandoned(false)
    setIsTimmingRunning(true)
    setSelectedOption(null)
    setIsOptionSelected(false)
  }

  const resetGameAfterDelay =  async () => {
    setIsCountdownShowing(true)
    delay(4000).then(() => {
      resetGame()
      setIsCountdownShowing(false)
    })
  }

  const onSelectionPress = async(option) => {
    const booleanIsSelectionCorrect = option === pickedStation.name ? 1 : 0
    const livesLeft = lives - (1 - booleanIsSelectionCorrect)
    setScore(score + booleanIsSelectionCorrect)
    setLives(livesLeft)
    if(!booleanIsSelectionCorrect) {
      if (livesLeft > 0) await playAudioAsync(heartLossAudio)
      else {
        setIsTimmingRunning(false)
        setIsGameEndModalVisible(true)
      }
    } else {
      await playAudioAsync(bellAudio)
    }
  }

  return (
    <>
      <Map mapRef={mapRef} setIsMapLoaded={setIsMapLoaded} region={region}>
        <DrawingStationsCircles region={region} stationsGroupedByLine={stationsGroupedByLine} />
        <DrawingLines stationsGroupedByLine={stationsGroupedByLine} region={region} />
        { pickedStation && <CustomMarker coords={pickedStation} tintColor={PIN_TINT_COLOR} />}
      </Map>
      <Score score={score} />
      <LifeTracker totalLives={NUMBER_LIVES} livesLeft={lives} />
      <PickLinesModal lines={lines} drawLines={drawLines} setDrawLines={setDrawLines} region={region} />
      <CountdownTimer isTimeRunning={isTimeRunning} onComplete={() => setIsGameEndModalVisible(true)} timerKey={timerKey} gameLength={GAME_LENGTH} />
      <Round round={round} />
      <Abandon setIsGameEndModalVisible={setIsGameEndModalVisible} setAbandoned={setAbandoned} setIsTimmingRunning={setIsTimmingRunning} />
      {pickedStation && <FourChoiceForm options={options} answer={pickedStation.name} onNext={setRandomStationAndOptions} onSelectionPress={onSelectionPress} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isOptionSelected={isOptionSelected} setIsOptionSelected={setIsOptionSelected} />}
      {isGameEndModalVisible && <GameEndModal isGameEndModalVisible={isGameEndModalVisible} setIsGameEndModalVisible={setIsGameEndModalVisible} score={score} restart={resetGameAfterDelay} lives={lives} abandoned={abandoned} answer={pickedStation.name} type={'choice'} />}
      {isCountdownShowing && <FullScreenCountdown />}
      <DoorsAnimation />
    </>
  )
}

export default Choice