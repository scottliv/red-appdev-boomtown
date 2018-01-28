const fetch = require("node-fetch");
// const loaders = require("./loaders");
const resolverHelpers = require("./jsonServer");

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

const resolveFunctions = {
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
    itemowner(item, context) {
      console.log(item);
      return resolverHelpers.fetchUser(item.itemowner);
      // return context.loaders.getUserById.load(item.itemowner);
    },
    borrower(item) {
      if (item.borrower) {
        return resolverHelpers.fetchUser(item.borrower);
      }
    },
    async tags(item) {
      return (await resolverHelpers.fetchItem(item.id)).tags;
    }
  },
  User: {
    async shareditems(user) {
      return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
    }
  }
};
module.exports = resolveFunctions;
