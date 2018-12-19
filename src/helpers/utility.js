
import * as constants from './constants'
export const getDefaultState = () => {
  return {
    playerState: [
      { // first item is the head
        top: constants.INDICES100[0],
        left: constants.INDICES100[5],
        direction: constants.RIGHT,
        bodyIndex: 0,
        turning: [] // direction, threshold
      },
      // 2nd body piece for testing
      { // second piece (body)

        top: constants.INDICES100[0],
        left: constants.INDICES100[4],
        direction: constants.RIGHT,
        bodyIndex: 1,
        turning: []
      },
      {
        top: constants.INDICES100[0],
        left: constants.INDICES100[3],
        direction: constants.RIGHT,
        bodyIndex: 2,
        turning: []
      }
    ],
    fruit: [{
      top: constants.INDICES100[1],
      left: constants.INDICES100[1],
      timeStamp: 0,
    }],
    playerSpeed: 30,
    paused: false,
    score: 0,
  }
}