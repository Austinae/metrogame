import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image, Dimensions } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import ReactNativeModal from 'react-native-modal'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import linesImagesData from 'data/linesImages'

const { width, height } = Dimensions.get('window')
const TITLE_FONT_SIZE = height * .03
const ICON_SIZE = height * .06
const ICON_COLOR = 'skyblue'
const ICON_TOP = height * .16 + 20
const SHADOW_OFFSET = { width: width * .01, height: height * .01 }
const SHADOW_OPACITY = .25
const SHADOW_RADIUS = 3.8
const ELEVATION = 5
const GRID_MARGIN_HORIZONTAL = width * .01
const GRID_MARGIN_TOP = height * .05
const GRID_ITEM_SIZE = width * .11
const GRID_ITEM_BORDER_WIDTH = GRID_ITEM_SIZE * .1
// showing all stations with names causes performance issues
const LIMIT_CAP = 2

const PickLinesModal = ({ region, lines, drawLines, setDrawLines, linesShownCapped }) => {
	const { t } = useTranslation()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const linesImages = linesImagesData[region]

	const onLinePressEvent = (lineName, isSelected) => {
    if (isSelected) {
        setDrawLines(drawLines.filter(item => item !== lineName));
    } else if (drawLines.length < LIMIT_CAP) {
        setDrawLines([...drawLines, lineName]);
    }
}


	const renderLine = (lineName, index) => {
		const isSelected = drawLines.includes(lineName)
		const source = linesImages.find(item => item.name === lineName).source
		return (
			<TouchableOpacity
				key={index}
				style={[styles.lineImage, { borderColor: isSelected ? '#1F51FF' : 'transparent' }]}
				onPress={() => onLinePressEvent(lineName, isSelected)}
			>
				<Image source={source} style={styles.gridItemImage} />
			</TouchableOpacity>
		)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => setIsModalVisible(true)}>
				<FontAwesome5Icon name={"paint-roller"} size={ICON_SIZE} color={ICON_COLOR} />
			</TouchableOpacity>
			<ReactNativeModal
				isVisible={isModalVisible}
				onBackdropPress={() => setIsModalVisible(!isModalVisible)} 
				style={styles.modalContainer}
			>
				<LinearGradient start={[.1, .2]} colors={['#8A64EB', '#87CEEB']} style={styles.card}>
					{linesShownCapped &&
						<View style={{ position: 'absolute', bottom: -80, backgroundColor: 'rgba(255,255,255,.3)', borderRadius: 5, padding: height * .01}}>
							<Text>⚠️ {t("linesCapNotice")}</Text>
						</View>
					}
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{t("pickLineVisibility")}</Text>
					</View>
					<View style={styles.grid}>{lines.map((line, index) => renderLine(line, index))}</View>
				</LinearGradient>
			</ReactNativeModal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 15,
		top: ICON_TOP,
	},
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		backgroundColor: 'white',
		padding: 22,
		borderRadius: 10,
		alignItems: 'center',
		shadowColor: '#FFF',
		shadowOffset: SHADOW_OFFSET,
		shadowOpacity: SHADOW_OPACITY,
		shadowRadius: SHADOW_RADIUS,
		elevation: ELEVATION,
	},
	titleContainer: {
		marginHorizontal: 25,
	},
	title: {
		fontSize: TITLE_FONT_SIZE,
		fontFamily: 'Raleway-bold',
	},
	grid: {
		justifyContent: 'center',
		alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
		marginTop: GRID_MARGIN_TOP,
		marginHorizontal: GRID_MARGIN_HORIZONTAL
  },
	gridItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
	lineImage: {
		width: GRID_ITEM_SIZE+GRID_ITEM_BORDER_WIDTH,
		height: GRID_ITEM_SIZE+GRID_ITEM_BORDER_WIDTH,
		margin: 8,
		borderRadius: GRID_ITEM_SIZE,
		borderWidth: GRID_ITEM_BORDER_WIDTH,
	}
})

export default PickLinesModal
