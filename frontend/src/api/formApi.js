// src/api/formApi.js
import { api } from './client';

// ---------- FORM SCHEMA ----------
export const getFormSchema = async () => {
  const res = await api.get('/api/form-schema');
  // backend: { success: true, data: schema }
  return res.data.data;
};

// ---------- SUBMISSIONS ----------
export const createSubmission = async (payload) => {
  const res = await api.post('/api/submissions', payload);
  return res.data; // { success, id, createdAt } or { success:false, errors:{} }
};

export const getSubmissions = async ({ page, limit, sortOrder }) => {
  const res = await api.get('/api/submissions', {
    params: { page, limit, sortOrder },
  });
  return res.data; // {success,page,limit,totalPages,totalCount,items}
};

export const searchSubmissions = async (q) => {
  const res = await api.get('/api/submissions/search', {
    params: { q: q || '' },
  });
  return res.data; // { success, items }
};

export const deleteSubmission = async (id) => {
  const res = await api.delete(`/api/submissions/${id}`);
  return res.data;
};

export const updateSubmission = async (id, payload) => {
  const res = await api.put(`/api/submissions/${id}`, payload);
  return res.data;
};

export const downloadCsv = async () => {
  const res = await api.get('/api/submissions/export/csv', {
    responseType: 'blob',
  });
  return res.data; // Blob
};
