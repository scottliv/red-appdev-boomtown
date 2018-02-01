const DataLoader = require("dataloader");
// Destructure the jsonResource that was passed in index.js
module.exports = ({
  firebaseResource: { getUser, getUsers },
  pgResource: { getItems, getTags, getItem }
}) => {
  return {
    getAllItems: new DataLoader(ids => Promise.all(ids.map(id => getItems()))),
    getAllUsers: new DataLoader(ids => Promise.all(ids.map(id => getUsers()))),
    getItemById: new DataLoader(ids => Promise.all(ids.map(id => getItem(id)))),
    getUserById: new DataLoader(ids => Promise.all(ids.map(id => getUser(id)))),
    getItemTags: new DataLoader(ids => Promise.all(ids.map(id => getTags(id))))
  };
};

// module.exports = createLoaders;
