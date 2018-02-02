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
    created: String
    description: String
    available: Boolean
    tags(id: ID): [Tag]
  }

  input TagInput {
    id: ID
  }

  input AddItemInput {
    title: String
    imageurl: String
    description: String
    itemowner: ID
    tags: [TagInput]
  }

  input UpdateItemInput {
    id: ID
    borrower: ID
  }

  type Mutation {
    createNewItem(newItem: AddItemInput): Item

    updateItem(updatedItem: UpdateItemInput): Item
  }

  type Query {
    items: [Item]
    item(id: ID): Item
    users: [User]
    user(id: ID): User
    tag(id: ID): Tag
    tags: [Tag]
  }
`;

module.exports = typeDefs;

// addItem query
// mutation newItem(
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
