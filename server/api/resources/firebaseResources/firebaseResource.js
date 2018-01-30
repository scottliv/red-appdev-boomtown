module.exports = app => {
  return {
    fetchUsers(url) {
      return fetch(url).then(r => r.json());
    },
    fetchUser(id, url) {
      return fetch(`${USERS_URL}/${id}`).then(r => r.json());
    }
  };
};
