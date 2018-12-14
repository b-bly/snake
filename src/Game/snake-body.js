import React, {  Fragment } from 'react'
import { RED } from '../helpers/constants'

import Square from './square'

// playerPosition: {
//   top: middleY,
//   left: middleX,
// },

const SnakeBody = (props) => {
  const { playerPosition: { top, left } } = props
  
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

export default SnakeBody