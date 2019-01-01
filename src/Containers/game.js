import React, { Component } from 'react';
import Board from '../Game/board'
import SnakePiece from '../Game/snake-piece'
import Fruit from '../Game/fruit'
// import SnakeBody from '../Game/snake-body'
// import Square from '../Game/square'
import * as constants from '../helpers/constants'
import { getDefaultState } from '../helpers/utility'

export default class Game extends Component {
  constructor() {
    super()
    this.state = getDefaultState();
  }

  componentDidMount() {
    this.start()
    window.onkeydown = this.handleKeyDown
  }

  start = () => {
    this.playerInterval = setInterval(() => {
      this.updatePlayerPosition();
    }, constants.INTERVAL);

    // place fruit
    this.placeFruit()
  }

  placeFruit = () => {
    // place new fruit in random location--push to array
    // Can't be in same location as other fruit or player
    // buffer around player?

    // loop through player locations and fruit and reassign if fruit top / left equal to these
    const newFruit = this.checkOccupiedSquares();
    const date = new Date()
    newFruit.timeStamp = Date.UTC()
    this.setState({
      fruit: [...this.state.fruit, newFruit]
    })

    // fruit disappears after random seconds between 10 and 20 sec
  }
  checkOccupiedSquares = () => {
    const top = constants.INDICES100[Math.floor(Math.random() * constants.INDICES100.length)]
    const left = constants.INDICES100[Math.floor(Math.random() * constants.INDICES100.length)]
    const occupiedSquares = [...this.state.playerState, ...this.state.fruit]
    for (let i = 0; i < occupiedSquares.length; i++) {
      const occupiedTop = occupiedSquares[i]
      const occupiedLeft = occupiedSquares[i]
      if (top === occupiedTop && left === occupiedLeft) return this.checkOccupiedSquares()
    }
    return { top: top, left: left }
  }

  updatePlayerPosition = () => {
    let { playerSpeed } = this.state
    // if player is turning, map playerState, checking each body piece and 
    // only updating if past the turning threshold.
    let turning = false;

    let playerState = [...this.state.playerState].map((piece, i) => {
      if (piece.turning.length > 0) {
        console.log('turning');

        let { direction: currentDirection } = piece
        const { threshold, direction: turningDirection } = piece.turning[0]
        const { top, left } = piece
        switch (currentDirection) {
          case constants.UP:
            // passed turning threshold?
            //threshold = 0
            // top = 10
            // speed = 20
            // next move top = -10
            if (top - playerSpeed <= threshold) {
              console.log('up');
              // if threshold exceeded,
              // reassign currentDirection
              piece.direction = turningDirection
              const overshotDistance = (threshold + playerSpeed) - top
              // *** TO DO  ***
              // write a function to update top/left with overshotDistance + or - left (switch depending on turning direction)
              piece = this.movePlayer(piece, overshotDistance)
              // make sure player is turning in the row or column coords by setting the head to the threshold
              piece.top = threshold
              piece.turning.shift()
            } else {
              piece = this.movePlayer(piece, playerSpeed)
            }
            break
          case constants.RIGHT:
            if (left >= threshold - playerSpeed) {
              console.log('right');
              piece.direction = turningDirection
              const overshotDistance = left - (threshold - playerSpeed)
              piece.left = threshold
              piece = this.movePlayer(piece, overshotDistance)
              piece.turning.shift()
            } else {
              piece = this.movePlayer(piece, playerSpeed)
            }
            break

          case constants.DOWN:
            if (top + playerSpeed >= threshold) {
              console.log('down');

              piece.direction = turningDirection
              const overshotDistance = top - (threshold - playerSpeed)
              piece.top = threshold;
              piece = this.movePlayer(piece, overshotDistance)
              piece.turning.shift()
            } else {
              piece = this.movePlayer(piece, playerSpeed)
            }
            break;
          case constants.LEFT:
            // left = 110
            // threshold = 100
            // next move left = 90
            // is left - speed <= threshold
            if (left - playerSpeed <= threshold) {
              console.log('left');

              piece.direction = turningDirection
              const overshotDistance = (threshold + playerSpeed) - left
              piece.left = threshold;
              piece = this.movePlayer(piece, overshotDistance)
              piece.turning.shift()
            } else {
              piece = this.movePlayer(piece, playerSpeed)
            }
            break;
          default:
            break
        }
      } else {
        piece = this.movePlayer(piece, playerSpeed)
      }
      return piece
    })
    const updatedPlayerState = playerState.map((bodyPiece) => {
      const { direction: playerDirection } = bodyPiece
      // bodyPiece = this.movePlayer(bodyPiece, playerSpeed)
      return bodyPiece
    })
    this.checkForFruit(playerState);
    // Check if level is clear
    if (this.state.fruitEatenThisLevel >= constants.NEXT_LEVEL_THRESHOLD) {
      this.advanceLevel()
    } else {
      this.setState({
        playerState: playerState
      })
    }
  }

  movePlayer = (bodyPiece, playerSpeed) => {
    const { direction: playerDirection } = bodyPiece
    const { top, left } = bodyPiece
    // check walls
    switch (playerDirection) {
      case constants.UP:
        // top - playerSpeed is where the player will be after moving
        if (top - playerSpeed < 0) {
          bodyPiece.top = 0;
          this.endGame()
          // exit function and don't move player
          return bodyPiece
        }
        break
      case constants.DOWN:
        // - 100 because the position (top, left) is zero-indexed, but cell size is squares * 100
        if (top + playerSpeed > constants.CELLSIZE100 - 100) {
          bodyPiece.top = constants.CELLSIZE100 - 100;
          this.endGame()
          return bodyPiece
        }
        break
      case constants.LEFT:
        if (left - playerSpeed < 0) {
          bodyPiece.left = 0;
          this.endGame()
          return bodyPiece
        }
        break
      case constants.RIGHT:
        if (left + playerSpeed > constants.CELLSIZE100 - 100) {
          bodyPiece.left = constants.CELLSIZE100 - 100;
          this.endGame()
          return bodyPiece
        }
        break
      default:
        break
    }

    switch (playerDirection) {

      case constants.UP:
        // wait until next column.  Worm can only go in the columns/rows
        bodyPiece.top -= playerSpeed
        break
      case constants.RIGHT:
        bodyPiece.left += playerSpeed
        break
      case constants.DOWN:
        bodyPiece.top += playerSpeed
        break
      case constants.LEFT:
        bodyPiece.left -= playerSpeed
        break
      default:
        break
    }

    return bodyPiece
  }

  advanceLevel = () => {
    // check if enough fruit eaten to get to next level
    // add body piece
    let nextPlayerState = []
    const { snakeLength, playerSpeed } = this.state

    for (let i = 0; i <= this.state.snakeLength; i++) {
      const bodyPiece = {
        top: constants.INDICES100[0],
        left: constants.INDICES100[i],
        direction: constants.RIGHT,
        bodyIndex: 2,
        turning: []
      }
      // snake head = higher value of i, at position 0
      nextPlayerState.unshift(bodyPiece)
    }
    this.pause()
    this.setState({
      playerState: nextPlayerState,
      message: true,
      paused: false,
      snakeLength: snakeLength + 1,
      playerSpeed: playerSpeed + 10,
      fruitEatenThisLevel: 0,
    })

    // Show next level message in App.js
    this.props.showMessage("Ready, go!")
    setTimeout(() => {
      // clear message
      this.props.clearMessage()
      this.start()
    }, 1000);
  }

  endGame = () => {
    window.clearInterval(this.playerInterval)
  }

  checkForFruit = (playerState) => {
    let scoreIncrease = 0
    let updatedFruitEatenThisLevel = this.state.fruitEatenThisLevel
    const updatedFruit = this.state.fruit.filter((fruitPiece, i) => {
      const playerTop = Math.floor(playerState[0].top / 100)
      const playerLeft = Math.floor(playerState[0].left / 100)
      const fruitTop = fruitPiece.top / 100
      const fruitLeft = fruitPiece.left / 100
      if (playerTop === fruitTop &&
        playerLeft === fruitLeft) {
        // increment score, fruitEatenThisLevel
        scoreIncrease = 1
        updatedFruitEatenThisLevel++
        // ate fruit (disappears)
        return false
      }
      // didn't eat the fruit
      return true
    })
    this.setState({
      score: this.state.score + scoreIncrease,
      fruit: updatedFruit,
      fruitEatenThisLevel: updatedFruitEatenThisLevel,
    })
  }

  handlePlayerMovement = (newDirection) => {
    const { playerState } = this.state
    const turnObjectInHeadBool = playerState[0].turning.length > 0
    const updatedPlayerState = [...this.state.playerState].map((piece, i) => {
      // player changed their mind, replace turn direction
      if (turnObjectInHeadBool) {
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
        // example:
        // 247 - 47 = 200
        threshold = (playerPosition.top - playerPosition.top % 100)
        break;
      case constants.DOWN:
        threshold = (playerPosition.top - playerPosition.top % 100) + 100
        break;
      case constants.LEFT:
        // highest x that is lower than position.left
        // left = 110
        // threshold = 100
        threshold = (playerPosition.left - playerPosition.left % 100)
        break;
      case constants.RIGHT:
        threshold = (playerPosition.left - playerPosition.left % 100) + 100
        break;
      default:
        break;
    }
    return threshold
  }

  pause = () => {
    if (this.state.paused === true) {
      this.start()
      this.setState({ paused: false })
    } else {
      window.clearInterval(this.playerInterval)
      this.setState({ paused: true })
    }
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
        top={piece.top}
        left={piece.left}
      />
    )
    const fruit = this.state.fruit.map((fruit, i) =>
      <Fruit key={i.toString()}
        top={fruit.top}
        left={fruit.left}

      />
    )

    return (
      <div>
        <div>
          <h1 style={{ color: "white", marginLeft: constants.INFO_PANEL_MARGIN }}>Score: {this.state.score}</h1>
        </div>
        {snake}
        {fruit}
        <Board />

      </div>
    )
  }
}