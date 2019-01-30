import * as constants from './constants'

export const score = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: '0 1 auto',
  marginLeft: '10px',
  padding: '5px',
  marginTop: constants.Y_OFFSET,
  border: '4px solid white',
  borderRadius: '4px',
}


export const row = {
  display: 'flex',
  justifyContent: 'flex-start',
  flexFlow: 'row reverse-wrap',
  width: '100%',
}

export const scoreRow = {
  ...row,
  alignItems: 'center'
}

export const board = {
  marginLeft: '50px',
  position: 'relative',
  width: constants.WINDOWWIDTH,
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