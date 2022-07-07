import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import ILDashboard from '../../src/assets/images/home-dashboard.svg';
import ILDashboardActive from '../../src/assets/images/home-dashboard-active.svg';
import ILListDashboard from '../../src/assets/images/list-dashboard.svg';
import ILListDashboardActive from '../../src/assets/images/list-dashboard-active.svg';

const TabItem = ({ title, isFocused, options, onPress, onLongPress }) => {

	useEffect(() => {
		console.log(title, isFocused);
	}, []);

	const Icon = () => {
		if (isFocused) {
			if (title === 'List') {
				return <ILListDashboardActive />;
			}
			if (title === 'Dashboard') {
				return <ILDashboardActive />;
			}
			return null;
		} else {
			if (title === 'List') {
				return <ILListDashboard />;
			}
			if (title === 'Dashboard') {
				return <ILDashboard />;
			}
			return null;
		}
	};

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={ isFocused ? { selected: true } : {} }
			accessibilityLabel={ options.tabBarAccessibilityLabel }
			testID={ options.tabBarTestID }
			onPress={ onPress }
			onLongPress={ onLongPress }
		>
			<Icon />
		</TouchableOpacity>
	);
};

export default TabItem;
