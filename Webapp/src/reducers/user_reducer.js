import {FETCH_CURRENT_USER, FETCH_TOKENS} from '../actions';

const INITIAL_STATE = {
  isAuthenticated: false
}
export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action

  switch (type) {
    case FETCH_CURRENT_USER:
      return payload.data ? {...payload.data, isAuthenticated: true} : INITIAL_STATE
    case FETCH_TOKENS:
      return {...state, tokens: payload.data.tokens}
    default:
      return state
  }
}
