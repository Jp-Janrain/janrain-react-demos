
import decode from 'jwt-decode';
import formurlencoded from 'form-urlencoded';
import { APP_DOMAIN, CAPTURE_CLIENT_ID, MIAA_AUTH_DOMAIN } from '../Config';

export const ID_TOKEN_KEY = '_id_token';
export const ACCESS_TOKEN_KEY = '_access_token';

export const currentUserUUID = () => (
  decode(getIdToken()).sub
)

export const isCurrentUser = (uuid) => (
  decode(getIdToken()).sub === uuid
)

export const getToken = (audience, scope) => {
  const authPath = MIAA_AUTH_DOMAIN + '/auth?' + formurlencoded({
    response_type: 'id_token token',
    client_id: CAPTURE_CLIENT_ID,
    redirect_uri: APP_DOMAIN + '/auth/' + audience + '/callback',
    nonce: nonce(12),
    audience: audience,
    scope: scope,
  })
  window.location.replace(authPath)

}

export function login () {
  const authPath = MIAA_AUTH_DOMAIN + '/auth?' + formurlencoded({
    response_type: 'id_token token',
    client_id: CAPTURE_CLIENT_ID,
    redirect_uri: APP_DOMAIN + '/auth/callback',
    nonce: nonce(12),
    scope: 'openid profile manage_family read_family manage_companies read_companies',
  })
  window.location.replace(authPath)
}

export function logout () {
  fetch(MIAA_AUTH_DOMAIN + '/session/end?'  + formurlencoded({
    id_token_hint: getIdToken(),
    post_logout_redirect_uri: APP_DOMAIN }),
    {mode: 'no-cors'}
  )
  window.localStorage.clear()
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
}

export function getIdToken() {
  return localStorage.getItem('_id_token');
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const nonce = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Helper function that will allow us to extract the access_token and id_token
export const getParameterByName = (name) => {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAuthParam(paramName, keyName) {
  let accessToken = getParameterByName(paramName);
  localStorage.setItem(keyName, accessToken);
}

export function isLoggedIn(returnValue) {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

export function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
