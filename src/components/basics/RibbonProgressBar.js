import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Triangle from 'react-native-triangle'

const { width, height } = Dimensions.get('window')
const BAR_MARGIN_TOP = height * .04
const BAR_ITEM_WIDTH = width * .2
const BAR_ITEM_HEIGHT = BAR_ITEM_WIDTH * .26
const BAR_ITEM_FONT_SIZE = BAR_ITEM_HEIGHT * .7
const MARGIN_HORIZONTAL = width * .01

const RibbonProgressBar = ({ menuItems }) => {
  const lastMenuItemIndex = menuItems.length - 1

  return (
    <View style={styles.menu}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={item}
          onPress={() => handlePress(index)}
          style={[
            styles.menuItem,
            {backgroundColor: index === lastMenuItemIndex ? 'tomato' : 'orange'}
          ]}
        >
          <Text style={styles.menuText}>{item}</Text>
          <Triangle
            style={styles.rightTriangle}
            width={BAR_ITEM_HEIGHT/2}
            height={BAR_ITEM_HEIGHT}
            color={index === lastMenuItemIndex ? 'tomato' : 'orange'}
            direction={'right'}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    flexDirection: 'row',
    top: BAR_MARGIN_TOP,
    width
  },
  menuItem: {
    height: BAR_ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: BAR_ITEM_WIDTH * .1,
  },
  rightTriangle: {
    position: 'absolute',
    right: -(BAR_ITEM_HEIGHT / 2)+.09,
  },
  menuText: {
    fontSize: BAR_ITEM_FONT_SIZE,
    fontFamily: 'Raleway',
    textAlign: 'center',
    marginHorizontal: MARGIN_HORIZONTAL,
  },
})

export default RibbonProgressBar