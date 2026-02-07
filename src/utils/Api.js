// utils/Api.js

class Api{
  constructor( baseUrl, headers ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
   return fetch(`${this._baseUrl}/cards`, {
  headers: {
    authorization: "def30070-5e81-4326-a060-1e06121bc39e"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

export default Api;