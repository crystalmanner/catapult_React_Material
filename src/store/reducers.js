import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from '../modules/app';
import authReducer from '../modules/auth';
import loadingReducer from '../modules/loading';
import mrssesReducer from '../modules/mrss';
import recipeReducer from '../modules/recipe';
import campaignReducer from '../modules/campaign';
import livereadReducer from '../modules/liveread';
import templateReducer from '../modules/template';
import pubVideosReducer from '../modules/pubVideos';

export const makeRootReducer = asyncReducers => {
  const reducers = {
    router: routerReducer,
    app: appReducer,
    auth: authReducer,
    loading: loadingReducer,
    mrsses: mrssesReducer,
    recipe: recipeReducer,
    campaign: campaignReducer,
    liveread: livereadReducer,
    template: templateReducer,
    pubVideos: pubVideosReducer,
    
    ...asyncReducers
  };
  return combineReducers(reducers);
};

export default makeRootReducer;
