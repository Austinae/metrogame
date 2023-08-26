import { View, useWindowDimensions } from 'react-native'

import Button from 'components/basics/Button'
import ExcitedStar from 'components/home/ExcitedStar'

const DELAY = 50

const IOS_APP_ID = 6449089401
const ANDROID_APP_ID = 'com.austinae.metrowhizz'

const APP_STORE_LINK = `itms://itunes.apple.com/us/app/${IOS_APP_ID}?action=write-review`
const PLAY_STORE_LINK = `market://details?id=${ANDROID_APP_ID}&reviewId=0`

const STORE_LINK = Platform.select({
  ios: APP_STORE_LINK,
  android: PLAY_STORE_LINK,
})

const RateUs = () => {
	const { width } = useWindowDimensions()
	const GAP_SIZE = width * .01

	return (
		<Button text={"Rate us"} onPress={() => Linking.openURL(STORE_LINK)} customStyle={{ flexDirection: "column", gap: 10 }}>
			<View style={{ marginBottom: GAP_SIZE * 2, flexDirection: "row", gap: GAP_SIZE, transform: [{ translateY: -10 }] }}>
				<ExcitedStar delay={0} />
				<ExcitedStar delay={DELAY} />
				<ExcitedStar delay={DELAY * 2} />
				<ExcitedStar delay={DELAY * 3} />
				<ExcitedStar delay={DELAY * 4} />
			</View>
		</Button>
	)
}

export default RateUs