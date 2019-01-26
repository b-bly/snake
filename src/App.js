import React, { Component } from 'react';
import './App.css';
// import Game from './game'
import Game from './Containers/game'

class App extends Component {
  constructor() {
    super()

  }
 
  render() {
    return (
      <div className="App" style={{ backgroundColor: 'black', height: '100vh' }}>
        <h1 style={{ color: 'white', margin: '0' }}>Snake</h1>
        <Game/>
      </div>
    );
  }
}

export default App;
