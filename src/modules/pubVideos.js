import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { GET_VIDEOS_BY_CAMP_ID } from './actions';
import { request } from '../helpers/http';
import { campaignIdSelector } from './campaign';
import { fulfilled } from '../helpers';

// ==================================
// Selectors
// ==================================
export const videoListSelector = createSelector(
  state => state.pubVideos,
  pubVideos => pubVideos.list
);

// ==================================
// Actions
// ==================================
export const getVideosByCampaignId = createAction(
  GET_VIDEOS_BY_CAMP_ID, 
  campaignId => (_, getState) => {
    return request({
      url: `/api/v1/publishablevideo/`,
      method: 'get',
      params: {campaign: campaignId}
    }).then(res => res.data.results.filter(result => result.campaign === campaignId));
  }
);

// ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [fulfilled(getVideosByCampaignId)]: (state, action) => {
    return {
      ...state,
      list: action.payload,
    }
  }
};

// ==================================
// Reducer
// ==================================

const initialState = {
  list: []
};

export default handleActions(ACTION_HANDLERS, initialState);