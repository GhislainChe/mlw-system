export function getToken() {
  return localStorage.getItem('token');
}

export function getStoredUser() {
  try {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) return null;
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function getAuthUser() {
  try {
    const token = getToken();
    if (!token) return null;

    const [, payload] = token.split('.');
    if (!payload) return null;

    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getUserRole() {
  return getStoredUser()?.role || getAuthUser()?.role || null;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}
