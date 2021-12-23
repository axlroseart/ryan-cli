import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

axios.interceptors.request.use((config: AxiosRequestConfig) => config);

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    // res
    const { data } = res;
    if (data.success) {
      return data;
    }
    return res;
  },
  (err) => {
    throw new Error(err.message || 'error');
  },
);
