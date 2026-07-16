import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

const slowApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000,
});

export const getScoreBySbd  = (sbd) => api.get(`/api/scores/${sbd}`);
export const getReportStats = ()    => slowApi.get('/api/reports/stats');
export const getTop10GroupA = ()    => slowApi.get('/api/reports/top10-group-a');
