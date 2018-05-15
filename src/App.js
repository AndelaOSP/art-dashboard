import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header as='h1'>Welcome to ART Dashboard, Lets build together</Header>
          To get started, edit <code>src/App.js</code> and save to reload.
      </div>
    );
  }
}

export default App;
