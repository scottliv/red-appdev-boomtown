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

  return {
    getItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        });
      });
    },
    getItem(id) {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items WHERE id = $1", [id], (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res.rows);
        });
      });
    },
    getTags(itemid) {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT * FROM tags 
            INNER JOIN itemtags ON itemtags.tagid = tags.id 
            WHERE itemtags.itemid = $1`,
          [itemid],
          (err, res) => {
            if (err) {
              reject(err);
            }
            resolve(res.rows);
          }
        );
      });
    }
  };
};
