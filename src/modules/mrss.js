import { handleActions, createAction } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { fulfilled } from '../helpers';
import { LOAD_MRSS, LOAD_MRSSES, LOAD_MORE_MRSSES } from './actions';
import { getUnique } from '../helpers/util';

// ==================================
// Selectors
// ==================================
export const mrssesSelector = createSelector(
  state => state.mrsses,
  mrsses => mrsses.list
);

export const moreMrssesApiSelector = createSelector(
  state => state.mrsses,
  mrsses => mrsses.brand
);

// ==================================
// Actions
// ==================================
export const loadMrss = createAction(LOAD_MRSS, url =>
  request({
    fullUrl: url
  })
);

export const loadMrsses = createAction(LOAD_MRSSES, params => {
  return request({
    fullUrl: params.url,
    hasContentType: false
  });
});

export const loadMoreMrsses = createAction(LOAD_MORE_MRSSES, params => {
  return request({
    fullUrl: params.links.next,
    hasContentType: false
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(loadMrss)]: (state, { payload: { data } }) => ({
    ...state,
    list: state.list.find(({ id }) => data.id === id)
      ? state.list.map(e => (e.id === data.id ? data : e))
      : [...state.list, data].sort((a, b) => a.id - b.id)
  }),
  [fulfilled(loadMrsses)]: (state, { payload: { data } }) => ({
    ...state,
    brand: data,
    list: data.playlist // getUnique(data.playlist, "mrss_video_url")
  }),
  [fulfilled(loadMoreMrsses)]: (state, { payload: { data } }) => ({
    ...state,
    brand: data,
    list: [...state.list, ...data.playlist]
  })
};

// ==================================
// Reducer
// ==================================
const initialState = {
  brand: {},
  list: [],
  brands: []
};

export default handleActions(ACTION_HANDLERS, initialState);
