const fetch = require("node-fetch");
const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

const resolverHelpers = {
  fetchItems() {
    return fetch(ITEMS_URL).then(r => r.json());
  },
  fetchUsers() {
    return fetch(`${USERS_URL}`).then(r => r.json());
  },
  fetchItem(id) {
    return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
  },
  fetchUser(id) {
    return fetch(`${USERS_URL}/${id}`).then(r => r.json());
  }
  // fetchItemByOwner(id) {
  //   return fetch(`${ITEMS_URL}/?itemowner=${id}`).then(r => r.json());
  // }
};

module.exports = resolverHelpers;
