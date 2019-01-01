import React, { Component } from 'react';
import './App.css';
// import Game from './game'
import Game from './Containers/game'
import Message from './Components/Message'

class App extends Component {
  constructor() {
    super()
    this.state = {
      message: null,
    }
  }
  showMessage = (message) => {
    this.setState({
      message: message
    })
  }
  clearMessage = () => {
    this.setState({
      message: null
    })
  }
  render() {
    return (
      <div className="App" style={{ backgroundColor: 'black', height: '100vh' }}>
        <h1 style={{ color: 'white', margin: '0' }}>Snake</h1>
        <Message 
          message={this.state.message}/>
        <Game
          showMessage={this.showMessage.bind(this)}
          clearMessage={this.clearMessage.bind(this)} />
      </div>
    );
  }
}

export default App;
