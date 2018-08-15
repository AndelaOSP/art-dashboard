import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import SessionExpired from './components/SessionExpiredComponent';
import './App.css';

import RoutesComponent from './_components/RoutesComponent';

import store from './_store';

const history = createBrowserHistory();

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <div>
            <Router history={history}>
              <div>
                <Switch>
                  <Route path="/" component={RoutesComponent} />
                </Switch>
                <SessionExpired history={history} />
              </div>
            </Router>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
