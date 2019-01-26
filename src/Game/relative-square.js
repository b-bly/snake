import React from 'react'
import { BORDERWIDTH, CELLHEIGHT, CELLWIDTH } from '../helpers/constants'

const RelativeSquare = (props) => {

  const style = {
    backgroundColor: props.backgroundColor,
    border: props.border ? BORDERWIDTH + 'px solid gray' : '',
    width: CELLWIDTH - BORDERWIDTH*2,
    height: CELLHEIGHT -BORDERWIDTH*2,
  }
  return (
    <div
      style={style}>
    </div>
  )
}

export default RelativeSquare