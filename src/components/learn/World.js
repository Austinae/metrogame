import { useState, useRef } from 'react'
import { Dimensions, View, Text, StyleSheet, Image } from 'react-native'
import CustomMarker from 'components/home/play/gamemodes/common/CustomMarker'
import { useTranslation } from 'react-i18next'
import { kmeans } from 'ml-kmeans'
import { LinearGradient } from 'expo-linear-gradient'

import Back from 'components/basics/Back'
import subways from 'data/explore/subways'
import initialRegions from 'data/initialRegions'
import Map from 'components/home/play/gamemodes/common/Map'

const { width, height } = Dimensions.get('window')
const PIN_IMAGE_HEIGHT = height * .05
const TITLE_FONT_SIZE = height * .05

const kMeansMarkerPoints = (desiredClusterSize) => {
  let points = subways.map(item => [item.latitude, item.longitude])
  // Choose number of clusters based on desired size
  let numClusters = Math.ceil(points.length / desiredClusterSize)
  let result = kmeans(points, numClusters)

  return result.centroids.map((centroid, i) => ({
    latitude: centroid[0],
    longitude: centroid[1],
  }))
}

const clustersOf10 = kMeansMarkerPoints(10)
const clustersOf5 = kMeansMarkerPoints(5)
const clustersOf2 = kMeansMarkerPoints(2)

const World = ({ navigation }) => {
  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  } = initialRegions['default']
	const { t } = useTranslation()
  const [clusterPoints, setClusterPoints] = useState(clustersOf10)
  const mapRef = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [zoom, setZoom] = useState(null)
  const [clusterSize, setClusterSize] = useState(10)
  const [mapBounds, setMapBounds] = useState({
    minLat: latitude - latitudeDelta / 2,
    maxLat: latitude + latitudeDelta / 2,
    minLong: longitude - longitudeDelta / 2,
    maxLong: longitude + longitudeDelta / 2,
  })

  const onRegionChangeComplete = (region) => {
    setMapBounds({
      minLat: region.latitude - region.latitudeDelta / 2,
      maxLat: region.latitude + region.latitudeDelta / 2,
      minLong: region.longitude - region.longitudeDelta / 2,
      maxLong: region.longitude + region.longitudeDelta / 2,
    })

    mapRef.current.getCamera().then((camera) => {
      const { zoom } = camera
      if (0 < zoom && zoom <= 3.2) {
        if (clusterSize == 10) return
        setClusterPoints(clustersOf10)
        setClusterSize(10)
        return
      }
      if (3.2 < zoom && zoom <= 4.6) {
        if (clusterSize == 5) return
        setClusterPoints(clustersOf5)
        setClusterSize(5)
        return
      }
      if (4.6 < zoom && zoom <= 6) {
        if (clusterSize == 2) return
        setClusterPoints(clustersOf2)
        setClusterSize(2)
        return
      }
      if (6 < zoom && zoom <= 8) {
        if (clusterSize == 1) return
        if (clusterSize != .5) setClusterPoints(subways)
        setClusterSize(1)
        return
      }
      if (clusterSize == .5) return
      if (clusterSize != 1) setClusterPoints(subways)
      setClusterSize(.5)
      return
    })
  }

  const getText = (item) => {
    if (clusterSize == 1) return item.city
    if (clusterSize == .5) return `${item.city} [${item.name}]`
    return `≤ ${clusterSize}`
  }

  return (
    <>
      <Map rotateEnabled={false} mapRef={mapRef} setIsMapLoaded={setIsMapLoaded} onRegionChangeComplete={onRegionChangeComplete}>
        {clusterPoints.filter(point =>
            point.latitude >= mapBounds.minLat &&
            point.latitude <= mapBounds.maxLat &&
            point.longitude >= mapBounds.minLong &&
            point.longitude <= mapBounds.maxLong
          ).map((item, key) => 
            <CustomMarker
              key={key}
              coords={{ latitude: item.latitude, longitude: item.longitude }}
              pinImageHeight={PIN_IMAGE_HEIGHT}
              text={getText(item)}
              tintColor={'skyblue'}
            />
          )
        }
      </Map>
      <LinearGradient colors={['lightblue', 'rgba(255,255,255,.1)']} style={styles.titleContainer}>
        <View style={styles.earthContainer}>
          <Image style={styles.earthImage} source={{uri: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Rotating_earth_%28large%29_transparent.gif"}} />
        </View>
        <Text style={styles.titleText}>{t('exploreTitle')}</Text>
      </LinearGradient>
      <Back onPress={() => navigation.navigate('Learn')} color={'white'} customStyle={{
        position: 'absolute',
        top: 60,
        left: 10,
        zIndex: 1,
      }} />
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    width,
  },
  titleText: {
    fontFamily: 'Raleway',
    fontSize: TITLE_FONT_SIZE,
    opacity: .8,
  },
  earthContainer: {
    width: TITLE_FONT_SIZE,
    height: TITLE_FONT_SIZE,
  },
  earthImage: {
    width: '100%',
    height: '100%',
  }
})

export default World

// import { useRef } from 'react'
// import { Dimensions, View, Text } from 'react-native'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
// import useGameContext from 'contexts/Game'
// import initialRegions from 'data/initialRegions'

// import mapStyles from 'data/customization/mapStyles'

// const { width, height } = Dimensions.get('window')
// const NAVIGATION_TAB_HEIGHT = width * .12
// const MAP_AVAILABLE_HEIGHT = height - NAVIGATION_TAB_HEIGHT

// const Map = ({ region }) => {
//   const { mapStyle } = useGameContext()
//   const mapRef = useRef(null)

//   return (
//     <View style={{ width, height }}>
//       <MapView
//         style={{ height: MAP_AVAILABLE_HEIGHT, width }}
//         provider={PROVIDER_GOOGLE}
//         customMapStyle={mapStyles[mapStyle]}
//         initialRegion={initialRegions[region ? region : 'default']}
//         userInterfaceStyle="dark"
//         mapType={mapStyle == "satellite" ? "satellite" : "standard"}
//       />
//       <View style={{ position: 'absolute', top: 0, left: 0 }}>
//         <Text>{mapStyle}</Text>
//       </View>
//     </View>
//   )
// }

// export default Map