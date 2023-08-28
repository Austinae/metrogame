import React, { useState, useRef, useEffect } from 'react'
import useGameContext from 'contexts/Game'
import Back from 'components/basics/Back'

import PickLinesModal from 'components/home/play/gamemodes/common/PickLinesModal'
import Map from 'components/home/play/gamemodes/common/Map'
import DoorsAnimation from 'components/home/play/gamemodes/common/DoorsAnimation'
import DrawingLines from 'components/home/play/gamemodes/common/DrawingLines'
import DrawingStationsCircles from 'components/home/play/gamemodes/common/DrawingStationsCircles'

const ExploreMap = ({ navigation }) => {
  const mapRef = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
	const { linesExplore, drawLinesExplore, setDrawLinesExplore, regionExplore, stationsGroupedByLineExplore } = useGameContext()

	useEffect(() => {
    if (!isMapLoaded) return
  }, [isMapLoaded])

  return (
    <>
      <Map mapRef={mapRef} setIsMapLoaded={setIsMapLoaded} region={regionExplore}>
				<DrawingStationsCircles stationsGroupedByLine={stationsGroupedByLineExplore} region={regionExplore} isNameShown={true} />
        <DrawingLines stationsGroupedByLine={stationsGroupedByLineExplore} region={regionExplore} />
			</Map>
			<Back onPress={() => navigation.navigate('ExploreRegionPick')} />
			<PickLinesModal lines={linesExplore} drawLines={drawLinesExplore} setDrawLines={setDrawLinesExplore} region={regionExplore} linesShownCapped={true} />
      <DoorsAnimation />
    </>
  )
}

export default ExploreMap