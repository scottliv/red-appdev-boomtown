const { Client } = require("pg");

module.exports = async app => {
  const client = new Client({
    user: app.get("PGUSER"),
    host: app.get("PGHOST"),
    database: app.get("PGDATABASE"),
    password: app.get("PGPASSWORD"),
    port: app.get("PGPORT")
  });
  await client.connect();

  client.query("SELECT * FROM ITEMS", (err, res) => {
    console.log(err, res);
    client.end();
  });
  return {
    getItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, res) => {
          resolve(res.rows);
          client.end();
        });
      });
    },
    getItem(id) {
      return new Promise((resolve, reject) => {
        client.query(`SELECT * FROM items WHERE id = ${id}`, (err, res) => {
          resolve(res.rows);
          client.end();
        });
      });
    },
    getTags(itemid) {
      return;
    }
  };
};
