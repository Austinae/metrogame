import React, { Fragment } from 'react'
import { Circle, Marker } from 'react-native-maps'
import { Text, View } from 'react-native'

import linesColors from 'data/draw-stations-coordinates/linesColors'

const DrawingStationsCircles = ({ region, stationsGroupedByLine, isNameShown }) => {
	return Object.entries(stationsGroupedByLine).map(([key, value]) => {
		return value.map(({ latitude, longitude, name }, idx) => {
			return (
				<Fragment key={`line-${key},key-${idx}`}>
					{isNameShown &&
						<Marker
							coordinate={{latitude, longitude}}
							showCallout={true}
							tappable={false}
						>
							<View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,.7)' }}>
								<Text>{name}</Text>
							</View>
						</Marker>
					}
					{!isNameShown &&
						<Circle
							center={{latitude, longitude}}
							radius={30}
							strokeWidth={5}
							strokeColor={linesColors[region][value[0].line]}
							fillColor="white"
							zIndex={1}
						/>
					}
				</Fragment>
			)
		})
	})
}
{/* <Circle
key={`line-${key},key-${idx}`}
center={{latitude, longitude}}
radius={30}
strokeWidth={5}
strokeColor={linesColors[region][value[0].line]}
fillColor="white"
zIndex={1}
><Text>{name}</Text></Circle> */}

export default React.memo(DrawingStationsCircles)