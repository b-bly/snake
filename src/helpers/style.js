import * as constants from './constants'

export const score = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: '0 1 auto',
  marginLeft: '10px',
  padding: '5px',
  margin: 'auto 5px',
  border: '4px solid white',
  borderRadius: '4px',
  minWidth: '135px'
}


export const row = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row reverse-wrap',
  width: '100%',
}

export const scoreRow = {
  ...row,
  alignItems: 'center'
}

export const board = {
  marginTop: '50px',
  position: 'relative',
  width: constants.WINDOWWIDTH + 'px',
  height: constants.WINDOWHEIGHT + 'px',
  border: '2px solid gray'
}

export const scoreText = {
  color: "white",
  fontSize: "20px",
  margin: '5px 0'
}

export const fruitText = {
  ...scoreText,
  marginLeft: '10px'
}