import React from 'react'
// CSS
import './Message.css'
// Style
const modalFixed = {
  position: 'fixed',

  zIndex: '10',
  left: '0',
  top: '0',
  width: '100%',
  height: '100vh',

  backgroundColor: 'rgba(0, 0, 0, 0.4)'
}

const modalContainer = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '100%',
  width: '100%'
}

const modalContent = {
  zIndex: '1',
  display: 'flex',
  flexFlow: 'column nowrap',
  textAlign: 'center',

  border: '7px solid #448EE4',
  borderRadius: '20px', // 20 padding + 47 button height
  boxShadow: 'inset 0 -80px black, 0px 0px 20px rgb(112, 112, 112)',
  backgroundColor: 'black',
  color: 'white',

  padding: '20px', // max-width: 750px;
  maxWidth: '750px',
  fontSize: '30px'
}
// Component

const Message = (props) =>
  <div style={modalFixed}>
    <div style={modalContainer}>
      <div style={modalContent}>
        <div>
          {props.message}
        </div>
        <div>
          {props.playAgainButton === true && (
            <button className="btn btn-success message-margin"
              onClick={props.playAgain}
            >Play Again</button>
          )}
        </div>
      </div>
    </div>
  </div>

export default Message