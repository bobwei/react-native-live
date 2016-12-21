/* eslint-disable import/prefer-default-export */
import { NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import R from 'ramda';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';

import * as liveActions from '../actions';

const { LiveModule } = NativeModules;

export const withActions = () => compose(
  withProps(({ dispatch, live: { composer: { privacy } } }) => ({
    startLive() {
      dispatch(liveActions.createData({ privacy }))
        .then(R.pipe(
          R.prop('payload'),
          R.prop('stream_url'),
        ))
        .then(LiveModule.startLive);
    },
    stopLive() {
      LiveModule.stopLive();
    },
    login: Actions.login,
    requestPermissions: LiveModule.requestPermissions,
  })),
);

export const withLiveState = () => compose(
  withState('isLive', 'setLive', false),
  withProps(({ isLive, setLive, startLive, stopLive }) => ({
    toggleLive() {
      if (!isLive) {
        startLive();
      } else {
        stopLive();
      }
      setLive(!isLive);
    },
  })),
);
