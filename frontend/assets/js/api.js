import { getToken, clearToken } from './state.js';

const API_BASE = '/api/v1';

export async function callApi(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: 'include'
  });

  let data = {};
  try {
    data = await response.json();
  } catch (_err) {
    data = { message: 'No JSON body' };
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
    }

    throw {
      ...data,
      status: response.status
    };
  }

  return data;
}
