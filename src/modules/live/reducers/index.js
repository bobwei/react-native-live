import { handleActions } from 'redux-actions';

import { put, reset } from '../actions';

export const initialState = {
  composer: {
    privacy: { value: 'SELF' },
  },
  detail: {},
};

export default handleActions({
  [put]: (state, action) => ({
    ...state,
    detail: {
      ...state.detail,
      ...action.payload,
    },
  }),
  [reset]: () => ({
    ...initialState,
  }),
}, { ...initialState });
