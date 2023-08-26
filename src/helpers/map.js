/**
 * Animates the map to a specified region.
 *
 * @param {React.RefObject<MapView>} mapRef - Reference to the MapView component.
 * @param {Object} regionToAnimateTo - The region object to animate to.
 *   @property {Number} latitude - The latitude of the target location.
 *   @property {Number} longitude - The longitude of the target location.
 *   @property {Number} latitudeDelta - The latitude delta for the map viewport.
 *   @property {Number} longitudeDelta - The longitude delta for the map viewport.
 * @param {Number} animationSpeedMs - The duration of the animation in milliseconds.
 */
const animateMapToRegion = (mapRef, regionToAnimateTo, animationSpeedMs) => {
	if (mapRef.current) {
		mapRef.current.animateToRegion(regionToAnimateTo, animationSpeedMs)
	}
}

/**
 * Converts station to object which can be used with animateMapToRegion.
 * 
 * @param {Object} station - The station object to convert.
 *   @property {Number} name - The name of the station.
 *   @property {Number} latitude - The latitude of the station location.
 *   @property {Number} longitude - The longitude of the station location.
 *   @property {Array<String>} lines - The lines which pass through this station.
 * @param {String} type - The type 
 */
const stationToRegion = (station, type) => {
	switch (type){
		case 'station':
			return {
				'latitude': station.latitude,
				'longitude': station.longitude,
				'latitudeDelta': .07,
				'longitudeDelta': .07,
			}
		default:
			return {
				'latitude': station.latitude,
				'longitude': station.longitude,
				'latitudeDelta': .1,
				'longitudeDelta': .1,
			}
	}
}

export {
	animateMapToRegion,
	stationToRegion
}