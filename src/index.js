import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { refreshUserToken } from '../src/firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

refreshUserToken();
const AUTH_TOKEN = localStorage.getItem('art-prod-web-token');
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common.Authorization = `Token ${AUTH_TOKEN}`;
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
