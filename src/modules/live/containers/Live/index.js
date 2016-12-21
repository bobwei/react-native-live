/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Text, View, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import R from 'ramda';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import Button from 'components/Button';
import * as authPredicates from 'modules/auth/predicates';
import { userSelector } from 'modules/auth/selectors';
import * as liveActions from '../../actions';
import { liveSelector } from '../../selectors';
import styles from './styles';

const { LiveModule } = NativeModules;

const Live = ({ isAuthenticated, isLive, toggleLive, login }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Live
    </Text>
    {!isAuthenticated &&
      <Button onPress={login} style={styles.button}>
        Login
      </Button>
    }
    {isAuthenticated &&
      <Button onPress={toggleLive} style={styles.button}>
        {(!isLive) ? 'Go Live' : 'Stop'}
      </Button>
    }
  </View>
);

Live.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  isLive: React.PropTypes.bool,
  toggleLive: React.PropTypes.func,
  login: React.PropTypes.func,
};

export default compose(
  connect(state => ({
    live: liveSelector()(state),
    isAuthenticated: R.pipe(
      userSelector(),
      authPredicates.isAuthenticated,
    )(state),
  })),
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
  })),
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
  lifecycle({
    componentDidMount() {
      LiveModule.requestPermissions();
    },
  }),
)(Live);
