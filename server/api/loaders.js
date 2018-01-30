const DataLoader = require("dataloader");
// Destructure the jsonResource that was passed in index.js
module.exports = ({
  jsonResources: {
    fetchItems,
    fetchItem,
    fetchUsers,
    fetchUser,
    fetchItemByOwner
  },
  pgResources: { getItems }
}) => {
  return {
    getAllItems: new DataLoader(ids => Promise.all(ids.map(id => getItems()))),
    getAllUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => fetchUsers()))
    ),
    getItemById: new DataLoader(ids =>
      Promise.all(ids.map(id => fetchItem(id)))
    ),
    getUserById: new DataLoader(ids =>
      Promise.all(ids.map(id => fetchUser(id)))
    ),
    getItemByOwner: new DataLoader(ids =>
      Promise.all(ids.map(id => fetchItemByOwner(id)))
    )
  };
};

// module.exports = createLoaders;
