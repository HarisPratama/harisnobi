import axios from 'axios';

// 'https://k365.permataindonesia.com'

const instance = axios.create({
	baseURL: 'http://backend.test.usenobi.com:8000'
});

export default instance;
