/**
 * Converts a given number of seconds into a string representation of years, days, hours, minutes, and seconds.
 *
 * @param {number} seconds - The number of seconds to convert.
 * @returns {string} - The string representation of the converted time.
 */
const secondsToString = (seconds) => {
  var numyears = Math.floor(seconds / 31536000)
  var numdays = Math.floor((seconds % 31536000) / 86400)
  var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
  var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
  var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60

  var timeString = ""

  if (numyears !== 0) {
    timeString += numyears + " y "
  }
  if (numdays !== 0 && numyears === 0) {
    timeString += numdays + " d "
  }
  if (numhours !== 0 && numdays === 0 && numyears === 0) {
    timeString += numhours + " h "
  }
  if (numminutes !== 0 && numhours === 0 && numdays === 0 && numyears === 0) {
    timeString += numminutes + " m "
  }

  timeString += numseconds + " s"

  return timeString.trim()
}

/**
 * Returns a Promise that resolves after a specified delay.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A Promise that resolves after the specified delay.
 * @example
 * // Delays 2 seconds (2000 milliseconds), then logs 'Hello World!'
 * delay(2000).then(() => console.log('Hello World!'));
 */
const delay = ms => new Promise(res => setTimeout(res, ms))


export {
	secondsToString,
  delay
}