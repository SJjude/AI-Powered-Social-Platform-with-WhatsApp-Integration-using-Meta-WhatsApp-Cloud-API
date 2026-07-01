import axios from 'axios';

import { appConfig } from '@/shared/config/appConfig';

export const httpClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});
