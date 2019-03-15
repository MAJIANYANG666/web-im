import {SET_CURRENT_SESSION} from '../actions/actiontypes';

export default function sessionReducer(state={
  current: null,
  rosters: []
}, action) {
  switch (action.type) {
    case SET_CURRENT_SESSION:
      return Object.assign({}, state, {
        current: action.payload.session
      });
    default: 
      return state
  }
  return state;
}