const DataLoader = require("dataloader");
const jsonResources = require("./resources/jsonResources/jsonServer");
module.exports = ({
  jsonResources: {
    fetchItems,
    fetchItem,
    fetchUsers,
    fetchUser,
    fetchItemByOwner
  }
}) => {
  return {
    getAllItems: new DataLoader(ids =>
      Promise.all(ids.map(id => fetchItems()))
    ),
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
