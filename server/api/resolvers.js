const fetch = require("node-fetch");
// const loaders = require("./loaders");
// const resolverHelpers = require("./resources/jsonResources/jsonServer");

module.exports = ({
  firebaseResource: { getUser, getUsers },
  pgResource: {
    getTags,
    getSharedItems,
    getAllTags,
    createItem,
    updateItemBorrower
  }
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
      },
      tag(root, { id }, context) {
        return context.loaders.getItemTags.load(id);
      },
      tags() {
        return getAllTags();
      }
    },
    Mutation: {
      createNewItem(root, { newItem }) {
        return createItem(newItem);
      },
      updateItem(root, { updatedItem: { id, borrower } }) {
        return updateItemBorrower(id, borrower);
      }
    },
    Item: {
      itemowner({ itemowner }, args, context) {
        return context.loaders.getUserById.load(itemowner);
      },
      borrower({ borrower }, args, context) {
        if (borrower) {
          return context.loaders.getUserById.load(borrower);
        }
      },
      tags({ id }, args, context) {
        return context.loaders.getItemTags.load(id);
      }
    },
    User: {
      shareditems(user) {
        return getSharedItems(user.id);
      }
    }
  };
};
