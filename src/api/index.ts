import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export default {
  new(): AxiosInstance {
    const req = axios.create({
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'content-type': 'application/json',
      },
      baseURL: process.env.VUE_APP_URL_API,
    });
    return req;
  },
  get(url: string, params?: object): Promise<any> {
    return this.new()
      .get(url, params)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  post(
    url: string,
    params: object,
    settings: object = {}
  ): Promise<AxiosResponse | AxiosError> {
    return this.new()
      .post(url, params, settings)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  put(url: string, params: object): Promise<AxiosResponse | AxiosError> {
    return this.new()
      .put(url, params)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  delete(url: string, params?: object): Promise<AxiosResponse | AxiosError> {
    return this.new()
      .delete(url, params)
      .then((res) => res.data)
      .catch((err) => {
        throw this.onError(err);
      });
  },
  onError(err: any): Promise<AxiosResponse | AxiosError> {
    const { response } = err;
    console.error('API Request Error', response);
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
