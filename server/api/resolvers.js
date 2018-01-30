const fetch = require("node-fetch");
// const loaders = require("./loaders");
// const resolverHelpers = require("./resources/jsonResources/jsonServer");

module.exports = ({
  jsonResources: { fetchItem, fetchUser, fetchItemByOwner }
}) => {
  return {
    Query: {
      items(root, args, context) {
        return context.loaders.getAllItems.load(args);
      },
      user(root, { id }, context) {
        return context.loaders.getUserById.load(id);
      },
      item(root, { id }, context) {
        return context.loaders.getItemById.load(id);
      },
      users(root, args, context) {
        return context.loaders.getAllUsers.load(args);
      }
    },
    Mutation: {
      addItem(root, { newItem: { title } }) {
        // TODO: save this new item to the database
        return { title };
      },
      updateItem(root, { updatedItem: { id } }) {
        return { id };
      }
    },
    Item: {
      itemowner(item) {
        return fetchUser(item.itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return fetchUser(item.borrower);
        }
      },
      async tags(item) {
        return (await fetchItem(item.id)).tags;
      }
    },
    User: {
      async shareditems(user) {
        return fetchItemByOwner(user.id);
      }
    }
  };
};
