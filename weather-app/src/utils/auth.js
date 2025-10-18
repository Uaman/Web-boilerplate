import Cookies from 'js-cookie';

export function login(user) {
  Cookies.set('auth', user, { expires: 1 }); 
}

export function logout() {
  Cookies.remove('auth');
}

export function isAuthenticated() {
  return !!Cookies.get('auth');
}
