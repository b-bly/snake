import React, { Fragment } from 'react'
import { RED, X_VALUES_INSIDE, Y_VALUES_INSIDE } from '../helpers/constants'
import Square from './square'


const SnakeHead = (props) => {

    const { top, left } = props
    const topPixels = Y_VALUES_INSIDE[top]
    const leftPixels = X_VALUES_INSIDE[left]

    return (
      <Fragment>
        <Square
          backgroundColor={RED}
          zIndex={'2'}
          top={topPixels}
          left={leftPixels}
          border={false}
        />
      </Fragment>
    )
  
}

export default SnakeHead