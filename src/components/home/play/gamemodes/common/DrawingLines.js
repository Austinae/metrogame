import React from 'react'
import { Polyline } from 'react-native-maps'

import linesColors from 'data/draw-stations-coordinates/linesColors'

const DrawingLines = ({ stationsGroupedByLine, region  }) => {
	return Object.entries(stationsGroupedByLine).map(([key, value]) => {
		return (
			<Polyline
				key={key}
				coordinates={value.map(({latitude, longitude}) => ({latitude, longitude}))}
				strokeColor={linesColors[region][value[0].line]}
				strokeWidth={5}
				lineJoin={'miter'}
				miterLimit={.2}
				lineCap='bevel'
			/>
		)
	})
}

export default React.memo(DrawingLines)