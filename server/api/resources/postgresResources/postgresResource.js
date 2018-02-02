const { Client } = require("pg");

const generateQueryVariables = tags => {
  return tags
    .map((tag, i) => {
      return `($1, $${i + 2})`;
    })
    .join(", ");
};

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
    getSharedItems(userid) {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM items WHERE itemowner = $1",
          [userid],
          (err, res) => {
            resolve(res.rows);
          }
        );
      });
    },
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
          console.log(res.rows);
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
    },
    getAllTags() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM tags", (err, res) => {
          resolve(res.rows);
        });
      });
    },
    async createItem({ title, description, imageurl, itemowner, tags }) {
      const item = [title, description, imageurl, itemowner];
      tags = tags.map(t => t.id);
      const itemInsertQuery = `INSERT INTO items(title, description, imageurl, itemowner) 
                      VALUES($1, $2, $3, $4) RETURNING *`;

      try {
        await client.query("BEGIN");
        const itemResult = await client.query(itemInsertQuery, item);

        const tagsInsertQuery = `INSERT INTO itemtags(itemid, tagid) VALUES ${generateQueryVariables(
          tags
        )}`;
        console.log(itemResult.rows[0].id);

        const tagResult = await client.query(tagsInsertQuery, [
          itemResult.rows[0].id,
          ...tags
        ]);
        await client.query("COMMIT");
        return itemResult.rows[0];
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    },

    updateItem(id) {
      return;
    }
  };
};
