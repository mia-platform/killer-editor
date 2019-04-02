/*
* Insert in this folder your redux actions.
* If you do not use redux, you can delete this section.
*/

export const changeCopies = (from, to, newCopy) => dispatch => {
  dispatch({type: 'SET_COPY', from, to, key: newCopy.key, text: newCopy.text})
}
