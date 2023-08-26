import { Marker } from 'react-native-maps'
import { Image, Dimensions, Text, View, } from 'react-native'

import useGameContext from 'contexts/Game'
import markers from 'data/customization/markers'

const { width, height } = Dimensions.get('window')
const PIN_IMAGE_ASPECT_RATIO = 50/70
const PIN_IMAGE_HEIGHT = height * .15
const PIN_IMAGE_WIDTH = PIN_IMAGE_HEIGHT * PIN_IMAGE_ASPECT_RATIO

const CustomMarker = ({ coords, tintColor, pinImageHeight, text }) => {
	const { markerStyle } = useGameContext()
	const pinImage = markers.find(item => item.key === markerStyle).image
	const pinWidth = pinImageHeight ? pinImageHeight * PIN_IMAGE_ASPECT_RATIO : PIN_IMAGE_WIDTH
	const pinHeight = pinImageHeight ? pinImageHeight : PIN_IMAGE_HEIGHT

	return (
		<Marker
			coordinate={{
				latitude: Number(coords.latitude),
				longitude: Number(coords.longitude),
			}}
			showCallout={true}
			tappable={false}
		>
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<Text>{text}</Text>
				<Image
					source={pinImage}
					style={{ width: pinWidth, height: pinHeight }}
					resizeMode="contain"
					tintColor={tintColor}
				/>
			</View>
		</Marker>
	)
}

export default CustomMarker

// Keeping this here in case I find a solution that works with android for linear gradients applied on images
// import { LinearGradient } from 'expo-linear-gradient'
// import MaskedView from '@react-native-masked-view/masked-view'
// const StyledMarker = () => {
// 	return (
// 		<View style={{ width: PIN_IMAGE_WIDTH, height: PIN_IMAGE_HEIGHT }}>
// 			<MaskedView
// 				style={{width: PIN_IMAGE_WIDTH, height: PIN_IMAGE_HEIGHT}}
// 				maskElement={
// 					<View
// 						style={{
// 							backgroundColor: 'transparent',
// 							justifyContent: 'center',
// 							alignItems: 'center',
// 						}}>
// 						<Image
// 							source={pinImage}
// 							style={{ width: PIN_IMAGE_WIDTH, height: PIN_IMAGE_HEIGHT }}
// 							resizeMode="contain"
// 							height={height}
// 							width={width}
// 							tintColor={'red'}
// 						/>
// 					</View>
// 				}>
// 				<LinearGradient
// 					colors={['#ec008c', '#fc6767']}
// 					style={{ flex: 1 }}
// 				/>
// 			</MaskedView>
// 		</View>
// 	)
// }