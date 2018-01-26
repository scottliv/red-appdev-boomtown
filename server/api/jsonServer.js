const fetch = require("node-fetch");
// const resolverHelpers = {
async function fetchItems(url) {
  return await fetch(url).then(r => r.json());
}

//  fetchUsers(url, id){return fetch(`${USERS_URL}/${id}`).then(r => r.json());}
// }

//   item(root, { id }) {
//     return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
//   },
//   users() {
//     return fetch(USERS_URL).then(r => r.json());
//   }
// // },
// Mutation: {
//   addItem(root, { newItem: { title } }) {
//     // TODO: save this new item to the database
//     return { title };
//   },
//   updateItem(root, { updatedItem: { id } }) {
//     return { id };
//   }
// },
// Item: {
//   itemowner(item) {
//     return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
//   },
//   borrower(item) {
//     if (item.borrower) {
//       return fetch(`${USERS_URL}/${item.borrower}`).then(r => r.json());
//     }
//   },
//   async tags(item) {
//     return (await fetch(`${ITEMS_URL}/${item.id}`).then(r => r.json())).tags;
//   }
// },
// User: {
//   async shareditems(user) {
//     return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
//   }
// }

module.exports = fetchItems;
