import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import instance from '../../../config/axios';
import ILLeftArrow from '../../assets/images/left-arrow.svg';
import ILSearch from '../../assets/images/search.svg';

const List = ({ navigation }) => {

	const [search, setSearch] = useState('');
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (search.length > 0) {
			const filterData = data.filter(el => el.ticker.includes(search));
			setData(filterData);
		} else {
			fetchData();
		}
	}, [search]);

	const fetchData = async () => {
		const getData = await instance.get('/list');

		if (getData.data?.status == 'ok') {
			setData(getData.data?.data);
		}
	};

	return (
		<LinearGradient colors={ ['#152A53', '#000000', '#000000'] } style={ styles.container }>
			<View
				style={ {
					flexDirection: 'row',
					alignItems: 'center',
				} }
			>
				<TouchableOpacity>
					<ILLeftArrow />
				</TouchableOpacity>
				<View style={ { width: 20 } } />
				<View
					style={ {
						flexDirection: 'row',
						alignItems: 'center',
						backgroundColor: '#223965',
						height: 40,
						padding: 20,
						flex: 1,
						borderRadius: 10,
					} }
				>
					<ILSearch />
					<View style={ { width: 10 } } />
					<TextInput
						style={ {
							color: '#EEEE',
							width: '100%',
							height: 40,
						} }
						placeholder='Search'
						placeholderTextColor='#EEEE'
						onChangeText={ val => setSearch(val) }
					/>
				</View>
			</View>

			<View style={ { height: 20 } } />

			<ScrollView
				showsVerticalScrollIndicator={ false }
			>
				{ data && data?.map((el, i) => {
					let amount = '';
					const arrAmount = el?.amount?.split('.');
					if (el?.amount?.length < 10) {
						let str = '';
						for (let i = 0; i < 8 - arrAmount[1].length; i++) {
							str += '0';
						}
						amount = `${ arrAmount[0] }.${ str }${ arrAmount[1] }`;
					} else if (el?.amount?.length > 10) {
						let str = '';
						for (let i = 0; i < 8; i++) {
							str += arrAmount[1][i];
						}
						amount = `${ arrAmount[0] }.${ str }`;
					} else {
						amount = el?.amount;
					}

					return (
						<View
							key={ i }
							style={ {
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								paddingTop: 20,
								paddingBottom: 20,
								borderBottomColor: 'rgba(255, 255, 255, .15)',
								borderBottomWidth: 1,
							} }
						>
							<View
								style={ {
									flexDirection: 'row',
									alignItems: 'center',
								} }
							>
								{ el?.image && <Image source={ { uri: el.image } } style={ { width: 16, height: 16 } } /> }
								<View style={ { width: 8 } } />
								<Text>{ el?.ticker }</Text>
							</View>
							<Text>{ amount }</Text>
						</View>
					);
				}) }
			</ScrollView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 40,
	},
	space: {
		height: 14
	},
});

export default List;