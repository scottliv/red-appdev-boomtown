const DataLoader = require('dataloader');
const { getUserOwnedItems } = require('./jsonServer');
export default function() {
  return {
    UserOwnedItems: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserOwnedItems(id));
    ))),
    // other data loaders go here...
  }
};