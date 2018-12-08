import React, { Component, Fragment } from 'react';
import Board from '../Game/board'
import SnakeHead from '../Game/snake-head'
import SnakeBody from '../Game/snake-body'
import Square from '../Game/square'

export default class Game extends Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {
   
    return (
      <div>
        <Board />
       
      </div>
    )
  }
}