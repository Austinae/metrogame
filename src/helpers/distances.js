const degToRad = (deg) => deg * (Math.PI / 180)

const calculateDistance = (coord1, coord2) => {
  const earthRadius = 6371000 // meters
  const dLat = degToRad(coord2.latitude - coord1.latitude)
  const dLon = degToRad(coord2.longitude - coord1.longitude)
  const lat1 = degToRad(coord1.latitude)
  const lat2 = degToRad(coord2.latitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = earthRadius * c

  return Math.round(distance)
}

const findNearestStation = ({ latitude, longitude }, stationsData) => {
  let nearestStation = null
  let minDistance = Number.MAX_VALUE

  for (const station of stationsData) {
    const distance = calculateDistance({ latitude, longitude }, { latitude: Number(station.latitude), longitude: Number(station.longitude) } )
    if (distance < minDistance) {
      minDistance = distance
      nearestStation = station
    }
  }

  return nearestStation
}

/**
 * Calculates the geographical midpoint and delta between two points.
 *
 * @param {Object} point1 - The first point with properties { latitude, longitude }.
 * @param {Object} point2 - The second point with properties { latitude, longitude }.
 * @returns {Object} - The center point and deltas { latitude, longitude, latitudeDelta, longitudeDelta }.
 */
const coordsCenterTwoPoints = (point1, point2) => ({
  latitude: (point1.latitude + point2.latitude) / 2,
  longitude: (point1.longitude + point2.longitude) / 2,
  latitudeDelta: Math.abs(point1.latitude - point2.latitude) * 1.7,
  longitudeDelta: Math.abs(point1.longitude - point2.longitude) * 1.7,
})

/**
 * Converts an integer into a readable format.
 * - Numbers less than 10,000 will be returned as is.
 * - Numbers from 10,000 onwards will have a "k" appended to represent thousands and one decimal for the hundreds.
 *
 * @param {number} num - The number to be converted.
 * @returns {string} - The converted, readable string format of the number.
 */
const convertNumToDistance = num => {
  if (num < 10_000) return '' + num
  return (num / 1_000).toFixed(1) + 'k'
}

export {
  calculateDistance,
  findNearestStation,
  coordsCenterTwoPoints,
  convertNumToDistance
}