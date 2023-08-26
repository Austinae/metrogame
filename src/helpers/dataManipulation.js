/**
 * This function is used to group an array of objects by a certain key.
 * It iterates over the array and for each object in the array,
 * it uses the value of the provided key to group the data.
 *
 * @param {Array} data - The data to be grouped.
 * @param {string} key - The key to group the data by.
 * @returns {Object} - An object with keys representing the 'key' values from the data,
 * and values being arrays of objects that share the same 'key' value.
 */
const groupBy = (data, key) => {
	return data.reduce((result, obj) => {
		(result[obj[key]] = result[obj[key]] || []).push(obj)
		return result
	}, {})
}

export {
	groupBy
}