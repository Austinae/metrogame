import { createContext, useContext, useState, useEffect } from 'react'
import { storeData, retrieveData } from 'helpers/localStorage'
import { groupBy } from 'helpers/dataManipulation'

const COLLECTED_MAP_STYLE_LOCAL_KEY = 'mapStyles'
const SELECTED_MAP_STYLE_LOCAL_KEY = 'mapStyle'
const COLLECTED_MARKER_STYLE_LOCAL_KEY = 'markers'
const SELECTED_MARKER_STYLE_LOCAL_KEY = 'marker'
const COINS_LOCAL_KEY = 'coins'
const RECENTLY_PLAYED_LOCAL_KEY = 'recentlyPlayed'

const Context = createContext({
	mapStyle: null,
	setMapStyle: () => null,
	region: null,
	setRegion: () => null,
	regionExplore: null,
	setRegionExplore: () => null,
	gamemode: null,
	setGamemode: () => null,
	lines: null,
	setLines: () => null,
	linesExplore: null,
	setLinesExplore: () => null,
	drawLines: null,
	setDrawLines: () => null,
	drawLinesExplore: null,
	setDrawLinesExplore: () => null,
	stationsCoords: null,
	setStationsCoords: () => null,
	stationsGroupedByLine: null,
	setStationsGroupedByLine: () => null,
	stationsGroupedByLineExplore: null,
	setStationsGroupedByLineExplore: () => null,
	coins: null,
	setCoins: () => null,
	collectedMapStyles: null,
	setCollectedMapStyles: () => null,
	markerStyle: null,
	setMarkerStyle: () => null,
	collectedMarkerStyle: null,
	setCollectedMarkerStyle: () => null,
	recentlyPlayed: null,
	setRecentlyPlayed: () => null,
})

const Provider = ({ ...props }) => {
	const [region, setRegion] = useState(null)
	const [regionExplore, setRegionExplore] = useState(null)
	const [gamemode, setGamemode] = useState(null)
	const [lines, setLines] = useState(null)
	const [linesExplore, setLinesExplore] = useState(null)
	const [drawLines, setDrawLines] = useState(null)
	const [drawLinesExplore, setDrawLinesExplore] = useState(null)
	const [stationsCoords, setStationsCoords] = useState(null)
	const [stationsGroupedByLine, setStationsGroupedByLine] = useState(null)
	const [stationsGroupedByLineExplore, setStationsGroupedByLineExplore] = useState(null)
	const [collectedMapStyles, setCollectedMapStyles] = useState(null)
	const [mapStyle, setMapStyle] = useState(null)
	const [markerStyle, setMarkerStyle] = useState(null)
	const [collectedMarkerStyle, setCollectedMarkerStyle] = useState(null)
	const [coins, setCoins] = useState(null)
	const [recentlyPlayed, setRecentlyPlayed] = useState(null)

	useEffect(() => {
		// map styles
		const checkCollectedMapStylesLocalStorage =  async () => {
			const collectedMapStylesLocalValue = await retrieveData(COLLECTED_MAP_STYLE_LOCAL_KEY)
			if (collectedMapStylesLocalValue == null) {setCollectedMapStyles(['standardmap'])}
			else {setCollectedMapStyles(collectedMapStylesLocalValue)}
		}
		checkCollectedMapStylesLocalStorage()
		const checkSelectedMapStyleLocalStorage =  async () => {
			const selectedMapStyleLocalValue = await retrieveData(SELECTED_MAP_STYLE_LOCAL_KEY)
			if (selectedMapStyleLocalValue == null) {setMapStyle('standardmap')}
			else {setMapStyle(selectedMapStyleLocalValue)}
		}
		checkSelectedMapStyleLocalStorage()
		// markers
		const checkCollectedMarkerStylesLocalStorage =  async () => {
			const collectedMarkerStylesLocalValue = await retrieveData(COLLECTED_MARKER_STYLE_LOCAL_KEY)
			if (collectedMarkerStylesLocalValue == null) {setCollectedMarkerStyle(['standardmarker'])}
			else {setCollectedMarkerStyle(collectedMarkerStylesLocalValue)}
		}
		checkCollectedMarkerStylesLocalStorage()
		const checkSelectedMarkerStyleLocalStorage =  async () => {
			const selectedMarkerStyleLocalValue = await retrieveData(SELECTED_MARKER_STYLE_LOCAL_KEY)
			if (selectedMarkerStyleLocalValue == null) {setMarkerStyle('standardmarker')}
			else {setMarkerStyle(selectedMarkerStyleLocalValue)}
		}
		checkSelectedMarkerStyleLocalStorage()
		// coins
		const checkCoinsLocalStorage =  async () => {
			const coinsLocalValue = await retrieveData(COINS_LOCAL_KEY)
			if (coinsLocalValue == null) {setCoins(0)}
			else {setCoins(coinsLocalValue)}
		}
		checkCoinsLocalStorage()
		// recently played
		const checkRecentlyPlayedLocalStorage =  async () => {
			const recentlyPlayedLocalValue = await retrieveData(RECENTLY_PLAYED_LOCAL_KEY)
			if (recentlyPlayedLocalValue == null) {setRecentlyPlayed(null)}
			else {setRecentlyPlayed(recentlyPlayedLocalValue)}
		}
		checkRecentlyPlayedLocalStorage()
	}, [])


	useEffect(() => {const changeLocalStorage = async () => storeData(COLLECTED_MAP_STYLE_LOCAL_KEY, collectedMapStyles); changeLocalStorage()}, [collectedMapStyles])
	
	useEffect(() => {const changeLocalStorage = async () => storeData(SELECTED_MAP_STYLE_LOCAL_KEY, mapStyle); changeLocalStorage()}, [mapStyle])
	
	useEffect(() => {const changeLocalStorage = async () => storeData(COLLECTED_MARKER_STYLE_LOCAL_KEY, collectedMarkerStyle); changeLocalStorage()}, [collectedMarkerStyle])
	
	useEffect(() => {const changeLocalStorage = async () => storeData(SELECTED_MARKER_STYLE_LOCAL_KEY, markerStyle); changeLocalStorage()}, [markerStyle])
	
	useEffect(() => {const changeLocalStorage = async () => storeData(COINS_LOCAL_KEY, coins); changeLocalStorage()}, [coins])

	useEffect(() => {const changeLocalStorage = async () => storeData(RECENTLY_PLAYED_LOCAL_KEY, recentlyPlayed); changeLocalStorage()}, [recentlyPlayed])

	// dynamic imports are not allowed in react native 
	useEffect(() => {
		if (lines == null) return
	
		const processData = (data) => {
			const filteredData = data.filter(station => station.lines.some(line => lines.includes(line)))
			setStationsCoords(filteredData)
		}
	
		switch (region) {
			case 'paris': processData(require('../data/stations-coordinates/paris').default); break
			case 'lyon': processData(require('../data/stations-coordinates/lyon').default); break
			case 'lille': processData(require('../data/stations-coordinates/lille').default); break
			case 'marseille': processData(require('../data/stations-coordinates/marseille').default); break
			case 'toulouse': processData(require('../data/stations-coordinates/toulouse').default); break
			case 'rennes': processData(require('../data/stations-coordinates/rennes').default); break
			case 'brussels': processData(require('../data/stations-coordinates/brussels').default); break
			case 'london': processData(require('../data/stations-coordinates/london').default); break
			// add cases for new regions
			default:
				console.log('Ehh... setting region stations coords failed')
		}
	}, [lines])

	useEffect(() => {
		if (drawLines == null) return
	
		const processData = (data) => {
			const filteredData = data.filter(station => drawLines.includes(station.line))
			setStationsGroupedByLine(groupBy(filteredData, 'drawLine'))
		}
	
		switch (region) {
			case 'paris': processData(require('../data/draw-stations-coordinates/paris').default); break
			case 'lyon': processData(require('../data/draw-stations-coordinates/lyon').default); break
			case 'lille': processData(require('../data/draw-stations-coordinates/lille').default); break
			case 'marseille': processData(require('../data/draw-stations-coordinates/marseille').default); break
			case 'toulouse': processData(require('../data/draw-stations-coordinates/toulouse').default); break
			case 'rennes': processData(require('../data/draw-stations-coordinates/rennes').default); break
			case 'brussels': processData(require('../data/draw-stations-coordinates/brussels').default); break
			case 'london': processData(require('../data/draw-stations-coordinates/london').default); break
			// add cases for new regions
			default:
				console.log('Ehh... setting region stations coords failed')
		}
	}, [drawLines])

	// Explore page
	useEffect(() => {
		if (drawLinesExplore == null) return
	
		const processData = (data) => {
			const filteredData = data.filter(station => drawLinesExplore.includes(station.line))
			setStationsGroupedByLineExplore(groupBy(filteredData, 'drawLine'))
		}
	
		switch (regionExplore) {
			case 'paris': processData(require('../data/draw-stations-coordinates/paris').default); break
			case 'lyon': processData(require('../data/draw-stations-coordinates/lyon').default); break
			case 'lille': processData(require('../data/draw-stations-coordinates/lille').default); break
			case 'marseille': processData(require('../data/draw-stations-coordinates/marseille').default); break
			case 'toulouse': processData(require('../data/draw-stations-coordinates/toulouse').default); break
			case 'rennes': processData(require('../data/draw-stations-coordinates/rennes').default); break
			case 'brussels': processData(require('../data/draw-stations-coordinates/brussels').default); break
			case 'london': processData(require('../data/draw-stations-coordinates/london').default); break
			// add cases for new regions
			default:
				console.log('Ehh... setting region stations coords failed')
		}
	}, [drawLinesExplore])

	const providedValues = { region, setRegion, regionExplore, setRegionExplore, gamemode, setGamemode, lines, setLines, mapStyle, setMapStyle, collectedMapStyles, setCollectedMapStyles, stationsCoords, setStationsCoords, drawLines, setDrawLines, stationsGroupedByLine, setStationsGroupedByLine, stationsGroupedByLineExplore, setStationsGroupedByLineExplore, coins, setCoins, markerStyle, setMarkerStyle, collectedMarkerStyle, setCollectedMarkerStyle, recentlyPlayed, setRecentlyPlayed, linesExplore, setLinesExplore, drawLinesExplore, setDrawLinesExplore }

  return (
    <Context.Provider
      value={providedValues}
      {...props}
    />
  )
}

const useGameContext = () => useContext(Context)

export default useGameContext
export { Provider }