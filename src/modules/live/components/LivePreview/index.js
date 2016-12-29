/* eslint-disable class-methods-use-this, no-unused-vars, react/prefer-stateless-function */
import React from 'react';
import { requireNativeComponent, NativeModules } from 'react-native';

import styles from './styles';

export const { LivePreviewManager } = NativeModules;

class LivePreview extends React.PureComponent {
  componentDidMount() {
    LivePreviewManager.requestPermissions();
  }

  render() {
    const { style, ...rest } = this.props;
    return (
      <RCTLivePreview
        style={[styles.livePreview, style]}
        {...rest}
      />
    );
  }
}

LivePreview.propTypes = {};

export default LivePreview;

const RCTLivePreview = requireNativeComponent('LivePreview', null);
