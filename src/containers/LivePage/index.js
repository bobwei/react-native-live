import React from 'react';
import {
  Text,
  View,
  NativeModules,
} from 'react-native';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import withState from 'recompose/withState';
import lifecycle from 'recompose/lifecycle';
import Config from 'react-native-config';

import styles from './styles';
import Button from '../../components/Button';

const { LiveModule } = NativeModules;
const { STREAM_URL } = Config;

const LivePage = ({ isLive, toggleLive }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native Live
    </Text>
    <Button onPress={toggleLive} style={styles.liveButton}>
      {(!isLive) ? 'Live' : 'Stop'}
    </Button>
  </View>
);

LivePage.propTypes = {
  isLive: React.PropTypes.bool,
  toggleLive: React.PropTypes.func,
};

export default compose(
  withProps({
    startLive() {
      LiveModule.startLive(STREAM_URL);
    },
    stopLive() {
      LiveModule.stopLive();
    },
  }),
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
)(LivePage);
