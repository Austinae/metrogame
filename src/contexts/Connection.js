import { createContext, useContext, useState, useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo'

const Context = createContext({
	isConnected: null,
	setIsConnected: () => null,
})

const Provider = ({ ...props }) => {
	const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(({ isConnected }) => {
      setIsConnected(isConnected)
    })

    return () => unsubscribe()
  }, [])

	// To simulate
	// useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setIsConnected(prevIsConnected => !prevIsConnected)
  //   }, 7000)

  //   return () => clearInterval(intervalId)
  // }, [])

	const providedValues = { isConnected, setIsConnected }

  return (
    <Context.Provider
      value={providedValues}
      {...props}
    />
  )
}

const useConnectionContext = () => useContext(Context)

export default useConnectionContext
export { Provider }