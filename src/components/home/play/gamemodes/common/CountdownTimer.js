import { View, Text, StyleSheet, Dimensions } from 'react-native'

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { secondsToString } from 'helpers/time'

const { height } = Dimensions.get('window')
const TIMER_SIZE = height * .2
const TIMER_FONT_SIZE = TIMER_SIZE * .2

const CountdownTimer = ({ isTimeRunning, onComplete, timerKey, gameLength }) => {
	return (
		<View style={styles.container}>
			<CountdownCircleTimer
				key={timerKey}
				size={TIMER_SIZE}
				isPlaying={isTimeRunning}
				duration={gameLength}
				colors={['#DEC20B', '#00FF00', '#00008B', '#FF0000']}
				colorsTime={[60, 15, 10, 0]}
				trailColor={'skyblue'}
				onComplete={onComplete}
			>
				{({ remainingTime, color }) => (
					<View style={styles.innerContainer}>
						<Text style={[styles.timerText, { color }]}>{secondsToString(remainingTime)}</Text>
					</View>
				)}
			</CountdownCircleTimer>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
	},
  timerText: {
    fontFamily: 'Parisine',
		fontSize: TIMER_FONT_SIZE,
	},
	innerContainer: {
		backgroundColor: 'rgba(65,105,225, .5)',
		alignItems: 'center',
		justifyContent: 'center',
		width: TIMER_SIZE * .9,
		height: TIMER_SIZE * .9,
		borderRadius: TIMER_SIZE,
	}
})

export default CountdownTimer