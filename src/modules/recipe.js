import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { request } from "../helpers/http";
import {
  SET_VIDEO,
  SET_BRAND_INFO,
  SET_TEMPLATE,
  UPLOAD_VIDEO,
  SUBMIT_VIDEO
} from "./actions";
import { fulfilled } from "../helpers";

// ==================================
// Selectors
// ==================================
export const videoSelector = createSelector(
  state => state.recipe,
  recipe => recipe
);

// ==================================
// Actions
// ==================================
export const setVideo = createAction(SET_VIDEO);

export const uploadVideo = createAction(
  UPLOAD_VIDEO,
  (file, onUploadProgress) => (_, getState) => {
    const uid = getState().auth.uid;
    const formData = new FormData();
    formData.append("user", uid);
    formData.append("video", file);
    return request({
      url: `/api/v1/draftvideo/`,
      method: "post",
      formData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }
);

export const setBrand = createAction(SET_BRAND_INFO);

export const setTemplate = createAction(SET_TEMPLATE);

export const submitVideo = createAction(
  SUBMIT_VIDEO,
  campaignVideo => (_, getState) => {
    const {
      by,
      videoId,
      campaignId,
      logoPlacement,
      logoType,
      templateId,
      livereadId,
      useCampaignLiveread
    } = campaignVideo;
    const uid = getState().auth.uid;

    return request({
      url: "/api/v1/publishablevideo/",
      method: "post",
      body: {
        user: uid,
        by,
        draft_video: videoId,
        campaign: campaignId,
        logo_placement: logoPlacement,
        logo_type: logoType,
        template: templateId,
        live_read: livereadId,
        use_campaign_live_read: useCampaignLiveread
      }
    });
  }
);

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [setVideo]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [setBrand]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [setTemplate]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [fulfilled(uploadVideo)]: (state, action) => {
    const { id, video, aspect_ratio: aspectRatio } = action.payload.data;
    const path = `${process.env.REACT_APP_API_BASE_URL}/media/videos/`;

    return {
      ...state,
      videoId: id,
      videoUrl: video,
      videoName: video.replace(path, ""),
      aspectRatio
    };
  }
};

// ==================================
// Reducer
// ==================================

const initialState = {};

export default handleActions(ACTION_HANDLERS, initialState);
