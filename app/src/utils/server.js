import axios from 'axios';
import Cookies from 'js-cookie';

export const http = axios.create({
	//baseURL: `${process.env.API_URL}:${process.env.API_PORT}`
	baseURL: 'http://localhost:3000'
});

export const getHeaders = () => {
	const headers = {
        Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token}`
	};
	return { headers };
};
