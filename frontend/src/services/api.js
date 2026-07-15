import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export const getScoreBySbd = (sbd) => api.get(`/api/scores/${sbd}`);
export const getReportStats = () => api.get('/api/reports/stats');
export const getTop10GroupA = () => api.get('/api/reports/top10-group-a');
