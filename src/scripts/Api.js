// utils/Api.js

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
   fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "def30070-5e81-4326-a060-1e06121bc39e"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

// export the class