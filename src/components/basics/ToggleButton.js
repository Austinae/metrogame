import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ToggleButton = ({ isOn, onPress, toggleHeight, text, gap, customStyle }) => {
  return (
    <TouchableOpacity activeOpacity={.8} onPress={onPress} style={[styles.button, { ...customStyle, gap: text ? gap : 0 }]}>
      { text && <Text style={[styles.toggleText, { fontSize: toggleHeight / 2 }]}>{text}</Text>}
			<Icon name={isOn ? 'toggle-on' : 'toggle-off'} size={toggleHeight + 10} color={isOn ? 'green' : 'red'} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
		flexDirection: 'row',
  },
	toggleText: {
		color: '#DDDDDD',
		fontFamily: 'Raleway',
	}
})

export default ToggleButton
