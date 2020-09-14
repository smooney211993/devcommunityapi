import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];
// initial state
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    // if set_alert type set the state with the payload sent
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
    // if remove_alert  remove the alert object
  }
}
