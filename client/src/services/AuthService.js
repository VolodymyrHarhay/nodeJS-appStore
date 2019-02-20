import decode from 'jwt-decode';

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://localhost:3000';
  }

  async login(email, password) {
      const res = await this.fetch(`${this.domain}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });
    this.setToken(res.token);
    return Promise.resolve(res);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  getProfile() {
    return decode(this.getToken());
  }


  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
        headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
        headers,
        ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}