/*
*  Insert in this folder your redux reducers.
*  You can delete this folder if you do not use redux.
*/

const COPY_INITIAL_STATE = {
  'hello': {
    description: 'hello',
    langs: {
      ITA: 'Buongiorno',
      EN: 'Hello'
    }
  },
  'hi': {
    description: 'hello',
    langs: {
      ITA: 'Ciao',
      EN: 'Hi'
    }
  }
}
const LANGUAGES_INITIAL_STATE = {
  ITA: {description: 'Italiano'},
  EN: {description: 'English'}
}

export default {
  copies: function copies (state = COPY_INITIAL_STATE, action) {
    if (action.type === 'SET_COPY') {
      const {key, to, text} = action

      return {
        ...state,
        [key]: {
          ...state[key],
          langs: {
            ...state[key].langs,
            [to]: text
          }
        }
      }
    }
    return state
  },
  languages: function languages (state = LANGUAGES_INITIAL_STATE, action) {
    return state
  }
}
