import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import setAuthorizationConfig from '../src/_utils/setAuthorizationConfig';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


if (localStorage.getItem('art-prod-web-token')) {
  setAuthorizationConfig();
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
