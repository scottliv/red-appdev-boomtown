const DataLoader = require("dataloader");
const resolverHelpers = require("./jsonServer");
function createLoaders() {
  return {
    getAllItems: new DataLoader(ids =>
      Promise.all(ids.map(id => resolverHelpers.fetchItems()))
    ),
    getAllUsers: new DataLoader(ids =>
      Promise.all(ids.map(id => resolverHelpers.fetchUsers()))
    ),
    getItemById: new DataLoader(ids =>
      Promise.all(ids.map(id => resolverHelpers.fetchItem(id)))
    ),
    getUserById: new DataLoader(ids =>
      Promise.all(ids.map(id => resolverHelpers.fetchUser(id)))
    )
    // getItemByOwner: new DataLoader(ids =>
    //   Promise.all(ids.map(id => resolverHelpers.fetchItemByOwner(id)))
    // )
  };
}

module.exports = createLoaders;
