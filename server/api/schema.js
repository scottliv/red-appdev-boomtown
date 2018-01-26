const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
  type Tag {
    id: ID
    title: String
  }
  
  type User {
    id: ID
    email: String
    fullname: String
    bio: String
    shareditems: [Item]
  }

  type Item {
    id: ID
    title: String
    itemowner: User
    borrower: User
    imageurl: String
    description: String
    available: Boolean
    tags: [Tag]
  }

  input TagInput {
    id: ID
    title: String
  }

  input AddItemInput {
    title: String
    imageurl: String
    description: String
    tags: [TagInput]
  }

  input UpdateItemInput {
    id: ID
    borrower: ID
  }

  type Mutation {
    addItem(newItem: AddItemInput) :Item

    updateItem(updatedItem: UpdateItemInput): Item
  }

  type Query {
    items: [Item]
    item(id: ID): Item
    users: [User]
    user(id: ID): User
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});

// addItem query
//mutation newItem(
//   $title:String,
//   $imageurl:String,
//   $description:String,
//   $tags:[TagInput]
// ) {
//   addItem(newItem: {
//     imageurl:$imageurl
//     title:$title
//     description:$description
//     tags:$tags
//   }) {
//     title
//   }

// }
