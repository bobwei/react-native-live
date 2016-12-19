import { createAction } from 'redux-actions';
import R from 'ramda';

import API from '../api';

export const modulePrefix = 'modules/live';

export const put = createAction(`${modulePrefix}:put`);
export const reset = createAction(`${modulePrefix}:reset`);

export const createData = data => dispatch => (
  API
    .request()
    .post('/me/live_videos', data)
    .then(R.pipe(
      R.path(['data']),
      obj => ({ [obj.id]: obj }),
      R.compose(
        dispatch,
        put,
      ),
    ))
);
