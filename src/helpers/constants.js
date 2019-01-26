
export const FPS = 8
export const INTERVAL = 1000 / FPS // how often game is updated in ms
export const WINDOWWIDTH = 640
export const WINDOWHEIGHT = 640 // pixels
export const CELLSIZE = 20  // number squares on board.  Should be called board size?
export const CELLSIZE100 = CELLSIZE * 100
export const CELLWIDTH = parseInt(WINDOWWIDTH / CELLSIZE) // width in pixels of board cell
export const CELLHEIGHT = parseInt(WINDOWHEIGHT / CELLSIZE)
export const BORDERWIDTH = 2
export const TOTAL_CELL_HEIGHT = CELLHEIGHT + BORDERWIDTH * 2;
export const TOTAL_CELL_WIDTH = CELLWIDTH + BORDERWIDTH * 2;
export const Y_OFFSET = 100 // distance from top of window to top of board
export const X_OFFSET = 0
export const X_VALUES_INSIDE = Array(CELLSIZE).fill('').map((el, i, arr) => {
  return i * CELLWIDTH + X_OFFSET + BORDERWIDTH;
});
export const Y_VALUES_INSIDE = Array(CELLSIZE).fill('').map((el, i, arr) => {
  return i * CELLHEIGHT + Y_OFFSET + BORDERWIDTH;
});
export const X_VALUES_OUTSIDE = Array(CELLSIZE).fill('').map((el, i, arr) => {
  return i * CELLWIDTH + X_OFFSET;
});
export const Y_VALUES_OUTSIDE = Array(CELLSIZE).fill('').map((el, i, arr) => {
  return i * CELLHEIGHT + Y_OFFSET;
});
export const INDICES = Array(CELLSIZE).fill('').map((_, i) => {
  return i
})
export const INDICES100 = Array(CELLSIZE).fill('').map((_, i) => {
  return i*100
})

export const INFO_PANEL_MARGIN = CELLSIZE * CELLWIDTH + X_OFFSET + 'px'

export const WHITE = 'rgb(255, 255, 255)'

export const BLACK = 'rgb(  0,   0,   0)'

export const RED = 'rgb(255,   0,   0)'

export const GREEN = 'rgb(  0, 255,   0)'

export const DARKGREEN = 'rgb(  0, 155,   0)'

export const DARKGRAY = 'rgb( 40,  40,  40)'

export const BGCOLOR = BLACK

export const UP = 'UP'

export const DOWN = 'DOWN'

export const LEFT = 'LEFT'

export const RIGHT = 'RIGHT'

export const HEAD = 0

export const OPPOSITE_DIRECTIONS = {
  UP: DOWN,
  DOWN: UP,
  LEFT: RIGHT,
  RIGHT: LEFT,
}

export const NEXT_LEVEL_THRESHOLD = 2