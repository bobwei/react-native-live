/* eslint-disable import/prefer-default-export */
import Live from 'modules/live/containers/Live';
import ProfilePage from '../containers/ProfilePage';

export const views = [{
  title: 'Explore',
}, {
  title: 'Favorite',
}, {
  title: 'Live',
  component: Live,
  initial: true,
}, {
  title: 'Notification',
}, {
  title: 'Me',
  component: ProfilePage,
}];
