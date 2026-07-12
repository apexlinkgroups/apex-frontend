import api from './api';

export const register = (data)     => api.post('/auth/register', data);
export const login    = (data)     => api.post('/auth/login', data);
export const getMe    = ()         => api.get('/auth/me');
export const updateProfile = (d)   => api.put('/auth/update-profile', d);
export const changePassword = (d)  => api.put('/auth/change-password', d);
export const forgotPassword = (e)  => api.post('/auth/forgot-password', { email: e });
export const resetPassword  = (t, p) => api.put(`/auth/reset-password/${t}`, { password: p });
