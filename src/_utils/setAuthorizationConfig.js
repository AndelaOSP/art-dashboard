import axios from 'axios';
import { refreshUserToken } from '../firebase';

export default () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.interceptors.request.use((config) => {
    refreshUserToken();
    const AUTH_TOKEN = localStorage.getItem('art-prod-web-token');
    config.headers.common.Authorization = `Token ${AUTH_TOKEN}`;
    return config;
  });
};
