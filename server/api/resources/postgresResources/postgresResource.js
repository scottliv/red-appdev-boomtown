const fetch = require("node-fetch");
module.exports = app => {
  const ITEMS_URL = `http://localhost:4000/items`;
  const USERS_URL = `http://localhost:4000/users`;

  const resolverHelpers = {
    fetchItems(url) {
      console.log(url);
      return fetch(url).then(r => r.json());
    },
    fetchUsers(url) {
      return fetch(url).then(r => r.json());
    },
    fetchItem(id, url) {
      return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
    },
    fetchUser(id, url) {
      return fetch(`${USERS_URL}/${id}`).then(r => r.json());
    }
    // fetchItemByOwner(id) {
    //   return fetch(`${ITEMS_URL}/?itemowner=${id}`).then(r => r.json());
    // }
  };

  module.exports = resolverHelpers;
};
