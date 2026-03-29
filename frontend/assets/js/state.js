const TOKEN_KEY = 'token_v2';
localStorage.removeItem('token');
let authToken = localStorage.getItem(TOKEN_KEY) || '';

export function getToken() {
  return authToken;
}

export function setToken(token) {
  authToken = token || '';
  if (authToken) {
    localStorage.setItem(TOKEN_KEY, authToken);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearToken() {
  setToken('');
}
