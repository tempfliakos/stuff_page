require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.PGUSER,
      "password": process.env.PGPASS,
      "database": process.env.PGDATABASE,
      "host": process.env.PGHOST,
      "dialect": "postgres",
      "port": process.env.PGPORT
    },
    "production": {
      "username": "eanpbduw",
      "password": "ms1WXJYv6GVVc--6pxhkjrhLCeOtrvRU",
      "database": "eanpbduw",
      "host": "rogue.db.elephantsql.com",
      "dialect": "postgres"
    }
  };