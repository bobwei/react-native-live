/* eslint-disable import/prefer-default-export */
import ProfilePage from '../containers/ProfilePage';
import LivePage from '../containers/LivePage';

export const views = [{
  title: 'Explore',
}, {
  title: 'Favorite',
}, {
  title: 'Live',
  component: LivePage,
  initial: true,
}, {
  title: 'Notification',
}, {
  title: 'Me',
  component: ProfilePage,
}];
