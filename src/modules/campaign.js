import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { request } from '../helpers/http';
import { GET_CAMPAIGNS, CREATE_CAMPAIGN, UPDATE_CAMPAIGN, UPDATE_CAMPAIGN_LOGO, SET_CAMPAIGN, GET_CAMPAIGN_BY_ID } from './actions';
import { fulfilled } from '../helpers';

// ==================================
// Selectors
// ==================================
export const campaignListSelector = createSelector(
  state => state.campaign,
  campaign => campaign.list
);
export const campaignIdSelector = createSelector(
  state => state.campaign,
  campaign => campaign.campaignId
);
export const campaignSelector = createSelector(
  state => state.campaign,
  campaign => campaign.selectedCampaign
);
// ==================================
// Actions
// ==================================
export const setCampaign = createAction(SET_CAMPAIGN, campaignId => (_, getState) => {
  return campaignId;
});

export const getCampaignById = createAction(GET_CAMPAIGN_BY_ID, campaignId => (_, getState) => {
  return request({
    url: `/api/v1/campaign/${campaignId}`,
    method: 'get'
  }).then(res => res.data);
});

export const getCampaigns = createAction(GET_CAMPAIGNS, () => (_, getState) => {
  const uid = parseInt(getState().auth.uid);
  return request({
    url: `/api/v1/campaign/`,
    method: 'get'
  }).then(res => res.data.results.filter(result => result.user === uid));
});

export const createCampaign = createAction(
  CREATE_CAMPAIGN,
  campaign => (_, getState) => {
    const formData = new FormData();
    const uid = getState().auth.uid;
    formData.append('user', uid);
    formData.append('name', campaign.name);
    formData.append('url', campaign.url);
    if (campaign.darkLogo) {
      formData.append('dark_logo', campaign.darkLogo);
    }
    if (campaign.lightLogo) {
      formData.append('light_logo', campaign.lightLogo);
    }
    formData.append('on_screen_offer', campaign.onScreenOffer);
    formData.append('live_read_text', campaign.campaignLiveRead);
    const cur = new Date()
    formData.append('date_created', cur.getFullYear()+"-"+(cur.getMonth()+1)+"-"+cur.getDate()+"T00:00");
    return request({
      url: `/api/v1/campaign/`,
      method: 'post',
      formData
    });
  }
);

export const updateCampaign = createAction(
  UPDATE_CAMPAIGN,
  (id, campaign) => (_, getState) => {
    console.log(campaign, id);
    const formData = new FormData();
    const uid = getState().auth.uid;
    formData.append('user', uid);
    formData.append('name', campaign.name);
    formData.append('url', campaign.url);
    if (campaign.darkLogo) {
      formData.append('dark_logo', campaign.darkLogo);
    }
    if (campaign.lightLogo) {
      formData.append('light_logo', campaign.lightLogo);
    }
    formData.append('on_screen_offer', campaign.onScreenOffer);
    formData.append('live_read_text', campaign.campaignLiveRead);
    formData.append('flight_start', campaign.flightStart);
    formData.append('flight_end', campaign.flightEnd);
    formData.append('impressions_required', campaign.impressionsRequired);
    formData.append('cpm', campaign.cpm);
    const cur = new Date()
    formData.append('date_created', cur.getFullYear()+"-"+(cur.getMonth()+1)+"-"+cur.getDate()+"T00:00");
    return request({
      url: `/api/v1/campaign/${id}/`,
      method: 'put',
      formData
    });
  }
);

export const updateCampaignLogo = createAction(
  UPDATE_CAMPAIGN_LOGO,
  (id, type, file) => {
    const formData = new FormData();
    formData.append(`${type}_logo`, file);
    return request({
      url: `/api/v1/campaign/${id}`,
      method: 'patch',
      formData
    });
  }
);

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(getCampaigns)]: (state, action) => {
    return {
      ...state,
      list: action.payload,
      campaignId: (state.campaignId === -1 && action.payload?action.payload[0].id:state.campaignId)
    };
  },
  [SET_CAMPAIGN]: (state, action) => {
    return {
      ...state,
      campaignId: action.payload
    }
  },
  [fulfilled(createCampaign)]: (state, action) => ({
    ...state,
    list: [action.payload.data, ...state.list]
  }),
  [fulfilled(updateCampaign)]: (state, action) => ({
    ...state,
    list: [action.payload.data, ...state.list.filter(res => res.id !== action.payload.data.id)]
  }),
  [fulfilled(getCampaignById)]: (state, action) => ({
    ...state,
    selectedCampaign: action.payload
  }),
  [fulfilled(updateCampaignLogo)]: (state, action) => ({
    ...state,
    list: state.list.map(campaign =>
      campaign.id === action.payload.data.id ? action.payload.data : campaign
    )
  })
};

// ==================================
// Reducer
// ==================================

const initialState = {
  list: [],
  campaignId: -1,
  selectedCampaign: {}
};

export default handleActions(ACTION_HANDLERS, initialState);
