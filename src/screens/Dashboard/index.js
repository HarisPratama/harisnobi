import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

import instance from '../../../config/axios';
import Banner from '../../assets/images/banner.png';
import ILDownload from '../../assets/images/download.png';

const Dashboard = ({ navigation }) => {
	const [greyOut, setGreyout] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		(async () => {
			const token = await AsyncStorage.getItem('token');

			if (token) {
				const getData = await instance.post('/dashboard', {
					token
				});

				if (getData.data?.status == 'ok') {
					setData(getData.data);
				}
			}
		})();
	}, []);

	const onPress = () => {
		setGreyout(true);
		setTimeout(() => {
			setGreyout(false);
		}, 5000);
	};

	const logOut = () => {
		Alert.alert(
			"Logout Application?",
			"Are you sure?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{
					text: "OK", onPress: async () => {
						await AsyncStorage.clear();
						navigation.replace('LogIn');
						showMessage({
							message: 'LogOut Success!!',
							type: 'success',
						});
					}
				}
			]
		);
	};

	return (
		<LinearGradient colors={ ['#152A53', '#000000', '#000000'] } style={ styles.container }>
			<View>
				<Image source={ Banner } style={ { width: '100%', height: 73 } } />
				<View style={ { height: 28 } } />
				<View style={ { flexDirection: 'row', justifyContent: 'center' } }>
					<Text style={ { color: '#9D9FA0', fontWeight: '400' } } >24H Changes</Text>
					<View style={ { width: 10 } } />
					<Text style={ { color: '#05BE90', fontWeight: '700' } } >+ { data['24hourchange'] ?? '' }%</Text>
				</View>
				<View style={ { height: 28 } } />
				<Text style={ { color: '#EAEAEA', textAlign: 'center', fontSize: 44, fontWeight: '700' } } >${ data['total_asset'] ?? '' }</Text>
				<View style={ { height: 28 } } />
				<View style={ { flexDirection: 'row', justifyContent: 'center' } }>
					<TouchableOpacity
						onPress={ onPress }
					>
						<LinearGradient
							colors={ greyOut ? ['#eeee', '#c4c4c4'] : ['#00c090', '#00d7a1', '#00dca5'] }
							style={ {
								borderRadius: 10,
								backgroundColor: '#05BE90',
								width: 280,
								height: 40,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							} }
						>
							<Image source={ ILDownload } style={ { height: 20, width: 20 } } />
							<View style={ { width: 10 } } />
							<Text style={ { color: '#ffff', fontWeight: '700' } }>Deposit</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={ {
					flexDirection: 'row',
					justifyContent: 'center'
				} }
			>
				<TouchableOpacity
					onPress={ logOut }
				>
					<Text
						style={ {
							textDecorationLine: 'underline',
							fontWeight: '700',
							color: '#ffff'
						} }
					>Logout</Text>
				</TouchableOpacity>
			</View>

		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
		justifyContent: 'space-between',
	},
	space: {
		height: 14
	},
});

export default Dashboard;