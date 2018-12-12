import React, { Component, Fragment } from 'react';
import Board from '../Game/board'
import SnakeHead from '../Game/snake-head'
import SnakeBody from '../Game/snake-body'
import Square from '../Game/square'
import * as constants from '../helpers/constants'

export default class Game extends Component {
  constructor() {
    super()
    this.state = {
      playerPosition: {
        top: 0,
        left: 0,
        direction: constants.RIGHT,
      },
      playerSpeed: .1,
    }
  }

  componentDidMount() {
    this.start()
    window.onkeydown = this.handleKeyDown
  }

  start = () => {
    this.playerInterval = setInterval(() => {
      this.updatePlayerPosition();
    }, constants.INTERVAL);
  }

  updatePlayerPosition = () => {
    let { top, left, direction } = this.state.playerPosition
    const { playerSpeed } = this.state
    if (direction === constants.UP) {
      top -= playerSpeed
    } else if (direction === constants.RIGHT) {
      left += playerSpeed
    } else if (direction === constants.DOWN) {
      top += playerSpeed
    } else {
      // left
      left -= playerSpeed
    }
    const updatedPlayerPosition = { ...this.state.playerPosition }
    updatedPlayerPosition.top = top
    updatedPlayerPosition.left = left
    this.setState({
      playerPosition: updatedPlayerPosition
    })
  }

  handlePlayerMovement = (newDirection) => {
    const { playerPosition: updatedPlayerPosition } = this.state
    updatedPlayerPosition.direction = newDirection
    this.setState({
      playerPosition: updatedPlayerPosition
    })
  }

  pause = () => {
    window.clearInterval(this.playerInterval)
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 80) { // p
      this.pause()
    }

    let newDirection;
    switch (e.keyCode) {
      case 37:
        newDirection = constants.LEFT;
        break;
      case 38:
        newDirection = constants.UP
        break;
      case 39:
        newDirection = constants.RIGHT;
        break;
      case 40:
        newDirection = constants.DOWN;
        break;

      default:
        return;
    }

    const direction = this.props.direction;
    if (direction !== newDirection &&
      constants.OPPOSITE_DIRECTIONS[direction] !== newDirection) {
      this.handlePlayerMovement(newDirection);
    }
  }

  render() {
    return (
      <div>
        <SnakeHead
          top={Math.floor(this.state.playerPosition.top)}
          left={Math.floor(this.state.playerPosition.left)}
          direction={this.state.playerPosition.direction}
          handlePlayerMovement={this.handlePlayerMovement.bind(this)}
        />
        <Board />

      </div>
    )
  }
}