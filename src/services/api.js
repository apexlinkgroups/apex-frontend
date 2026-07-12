import axios from 'axios';

const api = axios.create({ baseURL: 'https://apex-link-backend.up.railway.app/api', withCredentials: true });

// Attach JWT
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('apex_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Auto-refresh on 401
api.interceptors.response.use(
  r => r,
  async err => {
    const orig = err.config;
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const refresh = localStorage.getItem('apex_refresh');
        const { data } = await axios.post('/api/auth/refresh', { refreshToken: refresh });
        localStorage.setItem('apex_token', data.token);
        orig.headers.Authorization = `Bearer ${data.token}`;
        return api(orig);
      } catch {
        localStorage.removeItem('apex_token');
        localStorage.removeItem('apex_refresh');
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
