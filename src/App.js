import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import RoutesComponent from './_components/RoutesComponent';
import SessionExpired from './components/SessionExpiredComponent';
import AdminVerification from './_components/AdminVerification/AdminVerificationContainer';

import './App.css';

import store from './_store';

const history = createBrowserHistory();

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router history={history}>
        <React.Fragment>
          <Switch>
            <Route path="/" component={RoutesComponent} />
          </Switch>
          <AdminVerification history={history} />
          <SessionExpired history={history} />
        </React.Fragment>
      </Router>
    </Provider>
  </div>
);

export default App;
