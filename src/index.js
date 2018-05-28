import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import getToken from './_utils/getToken';


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common['Authorization'] = getToken();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
