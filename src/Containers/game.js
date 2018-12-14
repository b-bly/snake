import React, { Component } from 'react';
import Board from '../Game/board'
import SnakePiece from '../Game/snake-piece'
// import SnakeBody from '../Game/snake-body'
// import Square from '../Game/square'
import * as constants from '../helpers/constants'

export default class Game extends Component {
  constructor() {
    super()
    this.state = {
      // playerPosition: {
      //   top: 0,
      //   left: 0,
      //   direction: constants.RIGHT,
      // },
      playerState: [
        { // first item is the head

          top: constants.INDICES[0],
          left: constants.INDICES[5],
          direction: constants.RIGHT,
          bodyIndex: 0,
          turning: [] // direction, threshold
        },
        // 2nd body piece for testing
        { // second piece (body)

          top: constants.INDICES[0],
          left: constants.INDICES[4],
          direction: constants.RIGHT,
          bodyIndex: 1,
          turning: []
        },
        {
          top: constants.INDICES[0],
          left: constants.INDICES[3],
          direction: constants.RIGHT,
          bodyIndex: 2,
          turning: []
        }
      ],
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
    let { playerSpeed } = this.state
    // if player is turning, map playerState, checking each body piece and 
    // only updating if past the turning threshold.
    let turning = false;

    let playerState = [...this.state.playerState].map((piece, i) => {
      if (piece.turning.length > 0) {

        let { direction: currentDirection } = piece
        const { threshold, direction: turningDirection } = piece.turning[0]

        console.log(piece.top);
        
        const { top, left } = piece
        // passed turning threshold?
        function adjustOvershot(piece, overshotDistance) {
          switch (piece.direction) {
            case constants.UP:
              piece.top -= overshotDistance
              break
            case constants.RIGHT:
              piece.left += overshotDistance
              break
            case constants.DOWN:
              piece.top += overshotDistance
              break
            case constants.LEFT:
              piece.left -= overshotDistance
              break
            default:
              break
          }
          return piece
        }
        switch (currentDirection) {
          case constants.UP:
            if (top <= threshold + playerSpeed) {
              console.log('up');
              // if threshold exceeded,
              // reassign currentDirection
              piece.direction = turningDirection
              const overshotDistance = (threshold + playerSpeed) - top
              // *** TO DO  ***
              // write a function to update top/left with overshotDistance + or - left (switch depending on turning direction)
              piece = adjustOvershot(piece, overshotDistance) 
              // make sure player is turning in the row or column coords by setting the head to the threshold
              piece.top = threshold
              piece.turning.shift()
            }
            break
          case constants.RIGHT:

            if (left >= threshold - playerSpeed) {
              console.log('right');

              piece.direction = turningDirection
              const overshotDistance = left - (threshold - playerSpeed)
              piece.left = threshold
              piece = adjustOvershot(piece, overshotDistance) 
              piece.turning.shift()
             console.log(piece);
             console.log(piece.top);
             
             
            }
            break
          case constants.DOWN:
            if (top >= threshold - playerSpeed) {
              console.log('down');

              piece.direction = turningDirection
              const overshotDistance = top - (threshold + playerSpeed)
              piece.top = threshold;
              piece = adjustOvershot(piece, overshotDistance) 
              piece.turning.shift()
            }
            break;
          case constants.LEFT:

            if (left <= threshold + playerSpeed) {
              console.log('left');

              piece.direction = turningDirection
              const overshotDistance = (threshold + playerSpeed) - left
              piece.left = threshold;
              piece = adjustOvershot(piece, overshotDistance) 
              piece.turning.shift()
            }
            break;
          default:
            break
        }
        // function turn(overshotDistance) {
        //   playerSpeed += overshotDistance

        // }
      }
      return piece
    })
    if (playerState[0].top < 0) console.log(playerState[0].top);
    const updatedPlayerState = playerState.map((bodyPiece) => {
      const { direction: playerDirection } = bodyPiece
      let { top, left } = bodyPiece


      switch (playerDirection) {

        case constants.UP:
          // wait until next column.  Worm can only go in the columns/rows
          top -= playerSpeed
          break
        case constants.RIGHT:
          left += playerSpeed
          break
        case constants.DOWN:
          top += playerSpeed
          break
        case constants.LEFT:
          left -= playerSpeed
          break
        default:
          break
      }

      // check walls
      switch (playerDirection) {
        case constants.UP:
          if (top < 0) top = 0;
          break
        case constants.DOWN:
          if (top > constants.CELLSIZE - 1) top = constants.CELLSIZE - 1;
          break
        case constants.LEFT:
          if (left < 0) left = 0;
          break
        case constants.RIGHT:
          if (left > constants.CELLSIZE - 1) left = constants.CELLSIZE - 1;
          break
        default:
          break
      }
      bodyPiece.top = top
      bodyPiece.left = left
      return bodyPiece
    })
    this.setState({
      playerState: updatedPlayerState
    })
  }

  handlePlayerMovement = (newDirection) => {
    const { playerState } = this.state
    const updatedPlayerState = [...this.state.playerState].map((piece, i) => {
      // player changed their mind, replace turn direction
      if (playerState[0].turning.length > 0) {
        piece.turning.pop()
      }
      // Add turn to the queue
      const threshold = this.getTurnThreshold(playerState[0].direction, playerState[0])
      const turning = [...piece.turning]
      turning.push({
        direction: newDirection,
        threshold: threshold
      })
      piece.turning = turning

      return piece
    })
    this.setState({
      playerState: updatedPlayerState
    })
  }

  getTurnThreshold = (playerDirection, playerPosition) => {
    let threshold
    switch (playerDirection) {
      case constants.UP:
        // looping from small to large values of y
        threshold = playerPosition.top - 1
        break;
      case constants.DOWN:
        threshold = playerPosition.top + 1
        break;
      case constants.LEFT:
        // highest x that is lower than position.left
        threshold = playerPosition.left - 1
        break;
      case constants.RIGHT:
        threshold = playerPosition.left + 1
        break;
      default:
        break;
    }
    return threshold
  }

  pause = () => {
    window.clearInterval(this.playerInterval)
  }

  handleKeyDown = (e) => {

    if (e.keyCode === 80) { // p
      this.pause()
    } else {

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

      const direction = this.state.playerState[0].direction
      if (direction !== newDirection &&
        constants.OPPOSITE_DIRECTIONS[direction] !== newDirection) {
        this.handlePlayerMovement(newDirection)
      }
    }
  }

  render() {
    const snake = this.state.playerState.map((piece, i) =>
      <SnakePiece
        key={i.toString()}
        top={Math.floor(piece.top)}
        left={Math.floor(piece.left)}
        direction={piece.direction}
      />
    )
    return (
      <div>
        {snake}
        <Board />

      </div>
    )
  }
}