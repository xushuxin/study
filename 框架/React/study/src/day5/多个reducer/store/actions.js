import { CHNANGECOLOR, CHNANGECOUNT } from './type'
export function changeColor(col) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch({ type: CHNANGECOLOR, col: col })
    }, 1000);
  }
}

export function changeCount(num) {
  return { type: CHNANGECOUNT, num: num }
}


export function changeA(params) {
  return function () {
    // getA()
  }
}