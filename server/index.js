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
const jsonResources = require("./api/resources/jsonResources/jsonServer")(app);
const pgResources = require("./api/resources/postgresResources/postgresResource");

// pgResources returns a promise so the start app gets called once the database is connected and pgResources returns
pgResources(app).then(pgResources => start(pgResources));

function start(pgResources) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: initResolvers({
      jsonResources,
      pgResources
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
          jsonResources,
          pgResources
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
