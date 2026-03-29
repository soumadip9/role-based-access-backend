import dom from './dom.js';
import { callApi } from './api.js';
import { setToken, clearToken } from './state.js';
import { updateSessionUI, renderProfile, printResult } from './ui.js';

export async function syncSessionOnLoad() {
  try {
    const data = await callApi('/auth/me');
    renderProfile(data.user);
    updateSessionUI();
  } catch (_error) {
    clearToken();
    renderProfile(null);
    updateSessionUI();
  }
}

export function bindAuthEvents() {
  dom.registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(dom.registerForm);

    try {
      const data = await callApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: form.get('username'),
          email: form.get('email'),
          password: form.get('password')
        })
      });

      setToken(data.token);
      updateSessionUI();
      printResult('Register success', data);
    } catch (error) {
      printResult('Register failed', error, true);
    }
  });

  dom.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(dom.loginForm);
    const identity = String(form.get('identity') || '');

    const payload = { password: form.get('password') };
    if (identity.includes('@')) {
      payload.email = identity;
    } else {
      payload.username = identity;
    }

    try {
      const data = await callApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      setToken(data.token);
      updateSessionUI();
      printResult('Login success', data);
    } catch (error) {
      printResult('Login failed', error, true);
    }
  });

  dom.meBtn.addEventListener('click', async () => {
    try {
      const data = await callApi('/auth/me');
      renderProfile(data.user);
      updateSessionUI();
      printResult('Profile', data);
    } catch (error) {
      clearToken();
      updateSessionUI();
      renderProfile(null);
      printResult('Profile fetch failed', error, true);
    }
  });

  dom.logoutBtn.addEventListener('click', async () => {
    try {
      const data = await callApi('/auth/logout', { method: 'POST' });
      clearToken();
      updateSessionUI();
      renderProfile(null);
      printResult('Logout success', data);
    } catch (error) {
      clearToken();
      updateSessionUI();
      renderProfile(null);
      printResult('Logout failed', error, true);
    }
  });
}
