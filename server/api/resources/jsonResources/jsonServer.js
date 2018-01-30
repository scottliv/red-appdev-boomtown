// This will be called in index.js where the app is created
const fetch = require("node-fetch");

module.exports = app => {
  const ITEMS_URL = `http://localhost:${app.get("JSON_PORT")}/items`;
  const USERS_URL = `http://localhost:${app.get("JSON_PORT")}/users`;
  return {
    fetchItems() {
      return fetch(ITEMS_URL).then(r => r.json());
    },
    fetchItem(id) {
      return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
    },
    fetchUsers() {
      return fetch(USERS_URL).then(r => r.json());
    },
    fetchUser(id) {
      return fetch(`${USERS_URL}/${id}`).then(r => r.json());
    },
    fetchItemByOwner(id) {
      return fetch(`${ITEMS_URL}/?itemowner=${id}`).then(r => r.json());
    }
  };
};
