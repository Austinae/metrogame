import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Polyline, Marker } from 'react-native-maps'
import { calculateDistance, coordsCenterTwoPoints } from 'helpers/distances'

const { width, height } = Dimensions.get('window')
const FOOT_ICON_SIZE = height * .04
const DISTANCE_FONT_SIZE = height * .04

const DashedLineAndText = ({ point1, point2, }) => {
	const center = coordsCenterTwoPoints(point1, point2)
	const distance = calculateDistance(point1, point2)

	return (
		<>
			<Polyline
				coordinates={[ point1, point2 ]}
				strokeColor="skyblue"
				strokeWidth={6}
				lineDashPattern={[3, 2]}
			/>
			<Marker coordinate={center}>
				<View style={styles.container}>
					<MaterialCommunityIcon name={'foot-print'} size={FOOT_ICON_SIZE} />
					<Text style={styles.distanceText}>{distance} m</Text>
				</View>
			</Marker>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(135,206,235,.8)',
		borderRadius: DISTANCE_FONT_SIZE,
	},
	distanceText: {
		fontSize: DISTANCE_FONT_SIZE,
		fontFamily: 'Parisine',
	}
})

export default DashedLineAndText