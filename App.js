/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routes';
import FlashMessage from "react-native-flash-message";

const App = () => {


	return (
		<>
			<NavigationContainer>
				<Router />
			</NavigationContainer>
			<FlashMessage position='top' />
		</>
	);
};

export default App;
