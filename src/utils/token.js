import Cookies from 'js-cookie';

export function parsePayload(jwt) {
  if (!jwt) {
    return {};
  }

  return JSON.parse(window.atob(jwt.split('.')[1]));
}

export function saveToken(token) {
  if (token) {
    const payload = parsePayload(token);

    Cookies.set('jwt', token, { expires: new Date(payload.exp * 1000) });
  }
}

export function loadToken() {
  return Cookies.set('jwt');
}
