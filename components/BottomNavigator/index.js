import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabItem from '../TabItem/index';

const BottomNavigator = ({ state, descriptors, navigation }) => {
	return (
		<View style={ styles.container }>
			{ state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TabItem
						title={ label }
						isFocused={ isFocused }
						options={ options }
						onPress={ onPress }
						onLongPress={ onLongPress }
						style={ { flex: 1 } }
						key={ index }
					/>
				);
			}) }
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 40,
		justifyContent: 'space-evenly',
		gap: 20,
		paddingVertical: 17,
		backgroundColor: '#000000',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,

		elevation: 12,
	}
});

export default BottomNavigator;
