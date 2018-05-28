import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
