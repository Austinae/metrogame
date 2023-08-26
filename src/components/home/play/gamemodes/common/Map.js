import { Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import useGameContext from 'contexts/Game'
import mapStyles from 'data/customization/mapStyles'
import initialRegions from 'data/initialRegions'

const { width, height } = Dimensions.get('window')

const NAVIGATION_TAB_HEIGHT = width * .12
const MAP_AVAILABLE_HEIGHT = height - NAVIGATION_TAB_HEIGHT

const Map = ({ mapRef, onMapPress, children, setIsMapLoaded, onRegionChangeComplete, rotateEnabled, region }) => {
  const { mapStyle } = useGameContext()

  return (
    <MapView
      ref={mapRef}
      style={{ height: MAP_AVAILABLE_HEIGHT, width }}
      initialRegion={initialRegions[region ? region : 'default']}
      onPress={onMapPress}
      userInterfaceStyle="dark"
      mapType={mapStyle == "satellite" ? "satellite" : "standard"}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyles[mapStyle]}
      showsCompass
      loadingEnabled
      loadingIndicatorColor={'#AAAAAA'}
      loadingBackgroundColor={'#47948D'}
      onMapLoaded={() => setIsMapLoaded(true)}
      onRegionChangeComplete={onRegionChangeComplete}
      rotateEnabled={rotateEnabled ? rotateEnabled : true}
    >
      {children}
    </MapView>
  )
}


export default Map
