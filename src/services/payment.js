import api from './api';

export const createStripeIntent = (projectId) =>
  api.post('/payments/stripe/intent', { projectId });

export const confirmStripe = (projectId, intentId) =>
  api.post('/payments/stripe/confirm', { projectId, intentId });
