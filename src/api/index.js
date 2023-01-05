import axios from 'axios';

export default {
  new() {
    const req = axios.create({
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'content-type': 'application/json',
      },
      baseURL: process.env.VUE_APP_URL_API,
    });
    return req;
  },
  get(url, params) {
    return this.new()
      .get(url, params)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  post(url, params, settings = {}) {
    return this.new()
      .post(url, params, settings)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  put(url, params) {
    return this.new()
      .put(url, params)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  delete(url, params) {
    return this.new()
      .delete(url, params)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  onError(err) {
    const { response } = err;
    console.log('setError');
    // if (response?.status === 401) {
    //   window.$store.dispatch('setError', { type: 'Unauthorized' });
    // } else if (response?.status === 403) {
    //   window.$store.dispatch('setError', response?.data?.message);
    // } else if (
    //   typeof response?.status === 'undefined' ||
    //   response.message === 'Network Error'
    // ) {
    //   const method = err?.config?.method;
    //
    //   window.$store.dispatch('setError', {
    //     type: 'Network',
    //     method
    //   });
    // } else if (response?.status < 400 || response?.status >= 500) {
    //   const errMsg = this.getErrorMessage(err);
    //   window.$store.dispatch('setError', errMsg);
    // }
    return err;
  },
};
