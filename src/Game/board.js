import React from 'react'
import * as constants from '../helpers/constants'
import Square from './square'

const Board = () => {
  const board = Array(constants.CELLSIZE).fill('').map((el, i, arr) => {
    return (
      // <div key={i.toString()} style={{
      //   display: 'inline-block',
      //   position: 'relative'
      // }}>
      arr.map((el, j) => {
        return (
          <Square key={j.toString()}
            // placeholder until props pass the correct color
            backgroundColor={constants.BLACK}
            top={i * constants.CELLHEIGHT + constants.Y_OFFSET}
            left={j * constants.CELLWIDTH + constants.X_OFFSET}
            zIndex='0'
            border={false}
          />
        )
      })
      // </div>
    )
  });

  return (
    <div>
        {board}
    </div>
  )
}

export default Board