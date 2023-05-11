export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

const request = (baseUrl, endpoint, options) => {
  return fetch(`${baseUrl}/${endpoint}`, options).then(checkResponse);
};

export const register = (password, email) => {
  return request(BASE_URL, 'signup',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then((response) => {
    return response;
  })
};

export const login = (password, email) => {
  return request(BASE_URL, 'signin', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then((response) => {
    if (response.token) {
      localStorage.setItem('token', response.token);
      return response;
    }
  })
};

export const checkToken = (token) => {
  return request(BASE_URL, 'users/me', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(data => data)
};
