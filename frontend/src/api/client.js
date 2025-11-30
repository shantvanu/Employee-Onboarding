// src/api/client.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5600',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug: log requests and responses
api.interceptors.request.use((config) => {
  console.log('API request', config.method.toUpperCase(), config.url, config.params || '', config.data || '');
  return config;
});

api.interceptors.response.use(
  (res) => {
    console.log('API response', res.status, res.config.url);
    return res;
  },
  (err) => {
    console.error('API error', err?.response?.status, err?.config?.url, err?.message);
    return Promise.reject(err);
  }
);
