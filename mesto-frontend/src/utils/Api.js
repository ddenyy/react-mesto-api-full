
class Api {
  constructor(options) {
    // тело конструктора
    this._headers = options.headers;
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  };


  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  };


  renderUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  updateUserInfo(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then(this._checkResponse)
  };

  updateUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  };

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse)
  };

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  setLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  };

  deleteLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }


};

// класс для работы в api сервера
const api = new Api({
  baseUrl: 'https://api.mesto-frontend.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  }
});


export default api;