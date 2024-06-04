const knex = require('knex')({
  client: 'pg',
});

const query = knex.raw('SELECT * FROM users WHERE id = $1 AND name = $2', [1, 'John']);
console.warn(query.toString());
