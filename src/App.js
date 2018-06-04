import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import './App.css';

import RoutesComponent from './_components/RoutesComponent';

import store from './_store';

const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`/`} component={RoutesComponent} />
          </Switch>
        </Router>
      </Provider>
    </div>
    );
  }
}

export default App;
