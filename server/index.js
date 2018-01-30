const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const config = require("./config");
const typeDefs = require("./api/schema");
const jsonResources = require("./api/resources/jsonResources/jsonServer");
const createLoaders = require("./api/loaders");
const initResolvers = require("./api/resolvers");
const { makeExecutableSchema } = require("graphql-tools");

app = express();
config(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: initResolvers({
    jsonResources: jsonResources(app)
  })
});

app.use("*", cors());

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      loaders: createLoaders({
        jsonResources: jsonResources(app)
      })
    }
  })
);

// A route for accessing the GraphiQL tool
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(app.get("PORT"), () =>
  console.log(
    `GraphQL is now running on http://localhost:${app.get("PORT")}/graphql`
  )
);
