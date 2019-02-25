import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import RoutesComponent from './_components/RoutesComponent';
import SessionExpired from './components/SessionExpiredComponent';

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
          <SessionExpired history={history} />
        </React.Fragment>
      </Router>
    </Provider>
  </div>
);

export default App;
