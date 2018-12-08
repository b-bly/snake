import React, { Component, Fragment } from 'react'
import { RED, UP, DOWN, LEFT, RIGHT, X_OFFSET, Y_OFFSET, BORDERWIDTH } from '../helpers/constants'

import Square from './square'

// playerPosition: {
//   top: middleY,
//   left: middleX,
// },

class SnakeHead extends Component {

  handleKeyDown = (e) => {
    let newDirection;
    switch (e.keyCode) {
      case 37:
        newDirection = LEFT;
        break;
      case 38:
        newDirection = UP
        break;
      case 39:
        newDirection = RIGHT;
        break;
      case 40:
        newDirection = DOWN;
        break;
      default:
        return;
    }
    
    this.props.handlePlayerMovement(newDirection, this.props.playerPosition.bodyIndex);
  }
  render() {
    const { playerPosition: { top, left } } = this.props
  
    return (
      <Fragment>
        <Square
          backgroundColor={RED}
          zIndex={'2'}
          top={top }
          left={left }
          border={false}
        />
      </Fragment>
    )
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }
}

export default SnakeHead