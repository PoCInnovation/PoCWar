import axios from 'axios';
import Cookies from 'js-cookie';

export const http = axios.create({
  baseURL: process.env.BACKEND_BASE_URL || 'http://localhost:8081/',
});

export const getHeaders = () => {
  const headers = {
    Authorization: `Bearer ${JSON.parse(Cookies.get('user')).token}`,
  };
  return { headers };
};
