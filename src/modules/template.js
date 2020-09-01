import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { GET_TEMPLATES } from './actions';
import { fulfilled } from '../helpers';

// ==================================
// Selectors
// ==================================
export const templateListSelector = createSelector(
  state => state.template,
  template => template.list
);

// ==================================
// Actions
// ==================================
export const getTemplates = createAction(GET_TEMPLATES, () => {
  return request({
    url: `/api/v1/template/`,
    method: 'get'
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(getTemplates)]: (state, action) => {
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
