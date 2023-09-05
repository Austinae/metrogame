import { View, ImageBackground, StyleSheet, useWindowDimensions, Dimensions } from 'react-native'
import React from 'react'

import regions from 'data/regions'
import Play from 'components/home/Play'
// import Achievements from 'components/home/Achievements'
import TrainAnimation from 'components/home/TrainAnimation'
import Coins from 'components/common/Coins'
import StoreButton from 'components/home/StoreButton'
import LearnButton from 'components/home/LearnButton'
import SettingsButton from 'components/home/SettingsButton'
import RecentlyPlayed from 'components/home/RecentlyPlayed'

const { width, height } = Dimensions.get('window')
const SCORE_TOP = width > 700 ? 40 : 50

const Home = ({ navigation }) => {
	// randomize this?
  const { map } = regions.find(item => item.key === 'paris')

	return (
		<ImageBackground
			source={{uri: map}}
			imageStyle={{opacity: .3}}
			style={styles.imageBackground}
		>
			<TrainAnimation />
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
				<Coins containerStyle={styles.scoreContainer}/>
				<StoreButton navigation={navigation} />
				<SettingsButton navigation={navigation} />
				<Play navigation={navigation} />
				<LearnButton navigation={navigation} />
				<RecentlyPlayed navigation={navigation} />
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	imageBackground: {
    width: '100%',
		height,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
	scoreContainer: {
		position: 'absolute',
		top: SCORE_TOP,
		left: 10,
	}
})

export default Home