import React, { Fragment } from 'react'
import { RED, X_VALUES_INSIDE, Y_VALUES_INSIDE, Y_OFFSET, TOTAL_CELL_HEIGHT, TOTAL_CELL_WIDTH, BORDERWIDTH} from '../helpers/constants'
import Square from './square'


const SnakeHead = (props) => {

    const { top, left } = props
    const topPixels = Y_VALUES_INSIDE[Math.floor(top/100)] + ((TOTAL_CELL_HEIGHT) * (top%100)/100)
    const leftPixels = X_VALUES_INSIDE[Math.floor(left/100)] + ((TOTAL_CELL_WIDTH) * (left%100)/100)
  console.log(left + '  ' + leftPixels);
  
    if (leftPixels < Y_OFFSET) console.log('$$$ less than y offset @@@');
    
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