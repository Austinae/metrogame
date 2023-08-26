import { View, Text, StyleSheet, Dimensions, TouchableOpacity as RNTouchableOpacity, Image, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useState } from 'react'

import { countryFlags } from 'data/regions'

const { width, height } = Dimensions.get('window')
const BUTTON_SIZE = width * .2
const BUTTON_HEIGHT = BUTTON_SIZE * .7

const CountrySelection = ({ country, setCountry }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
 	const CountryFlag = countryFlags[country]

	return (
		<>
			<RNTouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)} style={styles.buttonContainer}>
				<CountryFlag width={BUTTON_SIZE} height={BUTTON_SIZE} />
			</RNTouchableOpacity>
			{isModalOpen && 
				<View style={styles.scrollViewContainer}>
					<ScrollView style={styles.scrollView}>
						{Object.keys(countryFlags).map((key, index) => {
							const Flag = countryFlags[key]

							return (
								<TouchableOpacity key={key} style={styles.scrollViewItem} onPress={() => {setCountry(key); setIsModalOpen(false)}}>
									<Flag width={BUTTON_SIZE * .8} height={BUTTON_SIZE * .7} />
								</TouchableOpacity>
							)
						})}
						<View style={[styles.scrollViewItem, {height: BUTTON_SIZE * .7 }]} />
					</ScrollView>
				</View>
			}
		</>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		width: BUTTON_SIZE,
		height: BUTTON_HEIGHT,
    borderRadius: BUTTON_SIZE / 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '',
    borderWidth: BUTTON_SIZE / 20,
    overflow: 'hidden',
		zIndex: 3,
	},
	scrollViewContainer: {
		position: 'absolute',
		right: 10,
		bottom: 10 + (BUTTON_HEIGHT / 2),
		width: BUTTON_SIZE,
		height: height * .6,
		backgroundColor: 'rgba(255, 255, 255, .4)',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		overflow: 'hidden',
	},
	scrollView: {
		width: BUTTON_SIZE,
		height: height * .6,
	},
	scrollViewItem: {
		width: BUTTON_SIZE,
		alignItems: 'center',
		zIndex: 2,
	}
})

export default CountrySelection