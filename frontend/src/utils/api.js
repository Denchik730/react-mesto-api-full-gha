class Api {
  constructor({baseUrl}) {
    this._url = baseUrl;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkRes);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  setProfileUserInfo(dataUser) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about
      })
    });
  }

  addNewUserCard(dataCard) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  likeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  dislikeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  changeUserAvatar(dataAvatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: dataAvatar.avatar
      })
    });
  }

  getAllNeededData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: 'https://api.mestogab.nomoredomains.monster',
});

export default api;
