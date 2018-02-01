// This comes from package.json npm start script where PORT is defined
// Where we will send all of our GraphQL requests
const GQL_PORT = process.env.PORT;
const PG_PORT = process.env.PG_PORT;

module.exports = app => {
  app.set("PGUSER", process.env.PGUSER || "boomtown");
  app.set("PGPASSWORD", process.env.PGPASSWORD || "boomtown");
  app.set("PGDATABASE", process.env.PGDATABASE || "boomtown");
  app.set("PGHOST", process.env.PGHOST || "localhost");
  app.set("PGPORT", process.env.PGPORT || "5432");
  app.set("PORT", process.env.PORT || "3002");

  app.set("FIREBASE_CONFIG", {
    apiKey: "AIzaSyAoaZmhUmdogNAugEG_2TJQNZXmJ2Pwbx4",
    authDomain: "boomtown-fd020.firebaseapp.com",
    databaseURL: "https://boomtown-fd020.firebaseio.com",
    projectId: "boomtown-fd020",
    storageBucket: "boomtown-fd020.appspot.com",
    messagingSenderId: "419380082123"
  });
};
