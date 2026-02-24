class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getAppInfo() {
    return this.getInitialCards();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatarInfo({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          return Promise.reject(`Error: ${res.status} - ${errorData.message}`);
        });
      }
    });
  }
  deletecard({ id}) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          return Promise.reject(`Error: ${res.status} - ${errorData.message}`);
        });
      }
    });
  }
    addLike({ id, isLiked }) {
      const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          return Promise.reject(`Error: ${res.status} - ${errorData.message}`);
        });
      }
    });
  }
   removeLike({ id}) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          return Promise.reject(`Error: ${res.status} - ${errorData.message}`);
        });
      }
    });
  }
}

export default Api;
