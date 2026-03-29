import dom from './dom.js';
import { getToken } from './state.js';

export function updateSessionUI() {
  const isLoggedIn = Boolean(getToken());
  dom.sessionBadge.className = `badge ${isLoggedIn ? 'ok' : 'warn'}`;
  dom.sessionBadge.textContent = isLoggedIn ? 'Logged in (JWT active)' : 'Logged out';

  if (!isLoggedIn) {
    dom.profileCard.textContent = 'Login and click Fetch Profile to load dashboard data.';
  }
}

export function renderProfile(user) {
  if (!user) {
    dom.profileCard.textContent = 'No profile data available.';
    return;
  }

  const userId = user.id || user._id || 'N/A';
  dom.profileCard.innerHTML = `
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Role:</strong> ${user.role}</p>
    <p><strong>User ID:</strong> ${userId}</p>
  `;
}

export function printResult(title, payload, isError = false) {
  dom.output.className = isError ? 'err' : 'ok';
  dom.output.textContent = `${title}\n${JSON.stringify(payload, null, 2)}`;
}
