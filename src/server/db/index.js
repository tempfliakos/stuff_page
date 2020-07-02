const pgp = require('pg-promise')();
const index = pgp(process.env.DATABASE_URL);
module.exports = index;