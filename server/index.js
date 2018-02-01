const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const config = require("./config");
const typeDefs = require("./api/schema");

const createLoaders = require("./api/loaders");
const initResolvers = require("./api/resolvers");
const { makeExecutableSchema } = require("graphql-tools");

app = express();
config(app);

// calling Resources with app so they have access to app variables
const firebaseResource = require("./api/resources/firebaseResources/firebaseResource")(
  app
);
const pgResource = require("./api/resources/postgresResources/postgresResource");

// pgResource returns a promise so the start app gets called once the database is connected and pgResource returns
pgResource(app)
  .then(pgResource => start(pgResource))
  .catch(error => error);

function start(pgResource) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      firebaseResource,
      pgResource
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
          firebaseResource,
          pgResource
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
}
