/* eslint-disable global-require */
const configAPI = (__ENVS__) => {
  const LiveAPI = require('../live/api').default;
  LiveAPI.init(__ENVS__);
};

export default configAPI;
