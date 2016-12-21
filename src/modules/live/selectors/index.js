/* eslint-disable import/prefer-default-export */
export const liveSelector = (getState = state => state.live) =>
  state => getState(state);
