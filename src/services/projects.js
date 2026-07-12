import api from './api';

export const createProject   = (d)   => api.post('/projects', d);
export const myProjects      = ()    => api.get('/projects/my');
export const getProject      = (id)  => api.get(`/projects/${id}`);
export const uploadFiles     = (id, fd) => api.post(`/projects/${id}/upload`, fd, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

// Admin
export const adminAllProjects = (p)  => api.get('/projects', { params: p });
export const adminStats       = ()   => api.get('/projects/stats/overview');
export const adminUpdateProject = (id, d) => api.put(`/projects/${id}`, d);
export const adminUploadOutput  = (id, fd) => api.post(`/projects/${id}/output`, fd, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const adminDeleteProject = (id) => api.delete(`/projects/${id}`);
