import axios from 'axios';

export default {
  init({ user: { data: { accessToken } } }) {
    this.axios = axios.create({
      baseURL: 'https://graph.facebook.com',
      headers: {
        ...(!!accessToken && {
          Authorization: `OAuth ${accessToken}`,
        }),
      },
    });
  },

  request() {
    return this.axios;
  },
};
