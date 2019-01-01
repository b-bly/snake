import React from 'react'

const style = {
  color: 'white',
  height: '30px',
}

const Message = (props) => 
  <div style={style}>
    {props.message}
  </div>

export default Message