/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import compose from 'recompose/compose';

import Button from 'components/Button';
import * as authPredicates from 'modules/auth/predicates';
import { userSelector } from 'modules/auth/selectors';

import { liveSelector } from '../../selectors';
import styles from './styles';
import { withLiveState, withActions } from '../../decorators';
import LivePreview from '../../components/LivePreview';

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
    <LivePreview
      style={styles.livePreview}
    />
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
  withActions(),
  withLiveState(),
)(Live);
