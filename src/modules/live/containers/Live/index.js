import React from 'react';
import { Text, View, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';

import Button from 'components/Button';
import { createData } from 'modules/live/actions';
import styles from './styles';

const { LiveModule } = NativeModules;

const Live = ({ isLive, toggleLive }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Live
    </Text>
    <Button onPress={toggleLive} style={styles.liveButton}>
      {(!isLive) ? 'Live' : 'Stop'}
    </Button>
  </View>
);

Live.propTypes = {
  isLive: React.PropTypes.bool,
  toggleLive: React.PropTypes.func,
};

export default compose(
  connect(({ live }) => ({ live })),
  withProps(({ dispatch, live: { composer: { privacy } } }) => ({
    startLive() {
      dispatch(createData({ privacy }))
        .then(R.pipe(
          R.prop('payload'),
          R.values,
          ([value]) => ({ ...value }),
          R.prop('stream_url'),
        ))
        .then(LiveModule.startLive);
    },
    stopLive() {
      LiveModule.stopLive();
    },
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
