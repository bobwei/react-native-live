import { combineReducers } from 'redux';

import authReducer from 'modules/auth/reducers';
import liveReducer from 'modules/live/reducers';

export default combineReducers({
  user: authReducer,
  live: liveReducer,
});
