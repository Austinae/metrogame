import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (error) {
    console.log(error)
  }
}

const retrieveData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.log(error)
  }
}

const removeMulti = async (keyArr) => {
  try {
    await AsyncStorage.multiRemove(keyArr)
    return true
  } catch (error) {
    console.log(error)
  }
}

const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  }
  catch (error) {
    console.log(error)
  }
}

export {
  storeData,
  retrieveData,
  removeMulti,
  removeItemValue
}