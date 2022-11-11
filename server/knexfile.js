// Update with your config settings.

require("dotenv").config()
const {resolve} = require("path")

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./db/migrations"
      //tableName: 'knex_migrations'
    },
    seeds: {
        directory: './db/seeds'
    }
  },

  production: {
    client: process.env.DB_TYPE,
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./db/migrations"
      //tableName: 'knex_migrations'
    },
    seeds: {
        directory: './db/seeds'
    }
  }
};
