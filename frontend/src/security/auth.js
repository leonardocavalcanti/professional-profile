import { checkResponseStatus } from './../handlers/responseHandlers';
import headers from './../security/headers';
import 'whatwg-fetch';
import qs from 'qs';

export default {
  logIn(auth) {
    localStorage.auth = JSON.stringify(auth);
  },

  logOut() {
    delete localStorage.auth;
  },

  refreshToken() {
    return fetch(`/api/uaa/oauth/token`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic YnJvd3Nlcjo='
        },
        body: qs.stringify({
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.auth).refresh_token
        })
      })
      .then(response => checkResponseStatus(response, true))
      .then((a) => localStorage.auth = JSON.stringify(a))
      .catch(() => { throw new Error("Unable to refresh!") })
  },

  loggedIn() {
    return localStorage.auth &&
      fetch(`/api/uaa/users/current/`,
        { headers: headers() })
        .then(response => checkResponseStatus(response, true))
        .then(() => { return true })
        .catch(this.refreshToken)
        .catch(() => {
          this.logOut();
          return false;
        });
  }
};