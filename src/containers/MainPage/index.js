import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from './styles';

const MainPage = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit index.ios.js
    </Text>
    <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
    </Text>
  </View>
);

export default MainPage;
