import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import NavBar from '../components/NavBar';
import TabIcon from '../components/TabIcon';
import MainPage from '../containers/MainPage';
import LivePage from '../containers/LivePage';

const views = [{
  title: 'Explore',
}, {
  title: 'Favorite',
}, {
  title: 'Live',
  component: LivePage,
}, {
  title: 'Notification',
}, {
  title: 'Me',
}];

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="main" tabs tabBarStyle={{ backgroundColor: '#fff' }}>
      {views.map(({ title, component = MainPage }) => (
        <Scene
          key={title}
          title={title}
          component={component}
          navBar={NavBar}
          icon={TabIcon}
          initial={title === 'Live'}
        />
      ))}
    </Scene>
  </Scene>,
);

export default scenes;
