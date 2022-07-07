import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { Dimensions, Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import instance from '../../../config/axios';
import Logo from '../../assets/images/logo.png';
import See from '../../assets/images/see.png';
import Unsee from '../../assets/images/unsee.svg';

const Button = ({ title, type, onPress }) => {
	return (
		<TouchableOpacity disabled={ type == 'disabled' ? true : false } onPress={ onPress } style={ styles.btn(type) }>
			<Text style={ styles.btnTitle(type) } >{ title }</Text>
		</TouchableOpacity>
	);
};

const LogIn = ({ navigation }) => {

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [boolean, setBoolean] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				navigation.replace('MainApp');
			}
		})();
	}, []);

	const onPress = async () => {
		Keyboard.dismiss();
		setLoading(true);
		try {
			if (form.email && form.password) {
				const login = await instance.post('/login', {
					email: form.email,
					password: form.password
				});
				if (login.data?.status == 'ok' && login.data?.token) {
					showMessage({
						message: 'Login Success!!',
						type: 'success',
					});
					await AsyncStorage.setItem('token', login.data.token);
					navigation.replace('MainApp');
				}
			} else {
				throw { message: 'Form required' };
			}
		} catch (error) {
			showMessage({
				message: 'Oops! something wrong',
				description: error?.message,
				type: 'danger',
			});
		}
		setLoading(false);
	};

	return (
		<LinearGradient colors={ ['#152A53', '#000000', '#000000'] } style={ styles.container }>
			<View style={ { flex: 1, alignItems: 'center' } } >
				<Image source={ Logo } />
				<View style={ { height: 40 } } />
				<View style={ { width: '100%' } }>
					<Text>E-mail Address</Text>
					<View style={ { height: 13 } } />
					<TextInput
						placeholder='Enter E-mail Address'
						placeholderTextColor='#EAEAEA'
						style={ styles.textInput }
						value={ form.email }
						onChangeText={ value => setForm({ ...form, email: value }) }
						autoCompleteType='email'
					/>
					<View style={ { height: 8 } } />
					{ !form.email ? (
						<Text style={ { color: '#F6BC45', fontStyle: 'italic' } }>Invalid E-mail Address</Text>
					) : (
						<View style={ { height: 20 } } />
					) }
				</View>
				<View style={ styles.space }></View>
				<View style={ { width: '100%' } }>
					<Text>E-mail Address</Text>
					<View style={ { height: 13 } } />
					<View style={ { flexDirection: 'row' } } >
						<TextInput
							placeholder='Enter Password'
							placeholderTextColor='#EAEAEA'
							style={ {
								flex: 1,
								height: 60,
								borderColor: '#11203C',
								borderWidth: 1,
								backgroundColor: '#11203C',
								marginLeft: -1,
								color: '#EAEAEA',
								borderRadius: 10,
								textAlign: 'center',
								position: 'relative',
							} }
							value={ form.password }
							onChangeText={ value => setForm({ ...form, password: value }) }
							autoCompleteType='password'
							secureTextEntry={ boolean }
						/>
						<View style={ {
							height: 60,
							width: 60,
							justifyContent: 'center',
							alignItems: 'center',
							borderTopRightRadius: 10,
							borderBottomRightRadius: 10,
							backgroundColor: '#11203C',
							position: 'absolute',
							top: 0,
							right: 0,
							zIndex: 100,
						} } >
							<TouchableOpacity
								onPress={ boolean ? () => setBoolean(false) : () => setBoolean(true) }
								style={ {
									height: 50,
									width: 50,
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center'
								} }
							>
								{ boolean ?
									<Unsee />
									:
									<Image source={ See } style={ { width: 20, height: 20 } } />
								}
							</TouchableOpacity>
						</View>
					</View>
					<View style={ { height: 8 } } />
					{ !form.password ? (
						<Text style={ { color: '#F6BC45', fontStyle: 'italic' } }>Invalid Password</Text>
					) : (
						<View style={ { height: 20 } } />
					) }
				</View>
			</View>

			<View>
				<View>
					<Button type={ loading ? 'disabled' : '' } title='Login' onPress={ loading ? () => { } : onPress } />
				</View>
			</View>
			<View />
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
	title: {
		fontSize: 20
	},
	textInput: {
		height: 60,
		borderColor: '#11203C',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#11203C',
		color: '#EAEAEA',
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'center',
	},
	btn: (type) => ({
		backgroundColor: type == 'disabled' ? '#eeee' : '#0d46fb',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		borderRadius: 10
	}),
	btnTitle: (type) => ({
		fontFamily: 'DMSans-Bold',
		color: type == 'disabled' ? 'black' : '#FFFF'
	})
});

export default LogIn;
