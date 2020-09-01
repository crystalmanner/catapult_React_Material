import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { GET_LIVEREADS } from './actions';
import { fulfilled } from '../helpers';

// ==================================
// Selectors
// ==================================
export const livereadListSelector = createSelector(
  state => state.liveread,
  liveread => liveread.list
);

// ==================================
// Actions
// ==================================
export const getLivereads = createAction(GET_LIVEREADS, () => {
  return request({
    url: `/api/v1/liveread/`,
    method: 'get'
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(getLivereads)]: (state, action) => {
    return {
      ...state,
      list: action.payload.data.results
    };
  }
};

// ==================================
// Reducer
// ==================================

const initialState = {
  list: []
};

export default handleActions(ACTION_HANDLERS, initialState);
