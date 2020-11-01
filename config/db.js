const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rrejectUnauthorized: false,
    },
  },
});

module.exports = db;
