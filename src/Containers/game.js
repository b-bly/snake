import React, { Component, Fragment } from 'react';
import Board from '../Game/board'
import SnakeHead from '../Game/snake-head'
import SnakeBody from '../Game/snake-body'
import Square from '../Game/square'

export default class Game extends Component {
  constructor() {
    super()
    this.state = {
      playerPosition: {
        top: 0,
        left: 0
      }
    }
  }


  render() {
   
    return (
      <div>
        <SnakeHead 
          {...this.state.playerPosition}
        />
        <Board />
       
      </div>
    )
  }
}