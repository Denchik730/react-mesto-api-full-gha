class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers
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
      headers: this._headers
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    });
  }

  setProfileUserInfo(dataUser) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about
      })
    });
  }

  addNewUserCard(dataCard) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  likeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  dislikeCard(id) {
    return this._request(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  changeUserAvatar(dataAvatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '85aaf06b-bad2-4dd5-8526-2a71ddd32563',
    'Content-Type': 'application/json'
  }
});

export default api;
