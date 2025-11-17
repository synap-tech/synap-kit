import axios, { type AxiosHeaderValue } from 'axios';
import Cookies from 'js-cookie';

import { ShowToast } from '@/components/ui/toast';

import useApp from './useApp';

export const useApi = ({ contentType }: { contentType: AxiosHeaderValue }) => {
  const { apiBaseUrl } = useApp().config;

  const api = axios.create({
    baseURL: apiBaseUrl,
    headers: { 'Content-Type': contentType },
  });

  api.interceptors.request.use(
    (config) => {
      const token = Cookies?.get('auth');

      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      console.log({ error });
      ShowToast(error?.response);
      return Promise.reject(error);
    }
  );

  return api;
};
