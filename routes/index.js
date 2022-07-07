import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from '../src/screens/Login';
import Dashboard from '../src/screens/Dashboard';
import List from '../src/screens/List';
import { BottomNavigator } from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
	return (
		<Tab.Navigator initialRouteName='Dashboard' tabBar={ props => <BottomNavigator { ...props } /> } screenOptions={ { headerShown: false } } >
			<Tab.Screen name='List' component={ List } />
			<Tab.Screen name='Dashboard' component={ Dashboard } />
		</Tab.Navigator>
	);
};

const Router = () => {

	return (
		<Stack.Navigator
			screenOptions={ { headerShown: false } }
			initialRouteName='LogIn'
		>
			<Stack.Screen name='LogIn' component={ LogIn } />
			<Stack.Screen name='MainApp' component={ MainApp } />
		</Stack.Navigator>);
};

export default Router;
