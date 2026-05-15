const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('portfolio_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  getProjects: () => request('/projects'),
  createProject: (payload) =>
    request('/projects', { method: 'POST', body: JSON.stringify(payload) }),
  updateProject: (id, payload) =>
    request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
  sendContact: (payload) =>
    request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  getMessages: () => request('/contact'),
  login: (payload) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(payload) })
};
