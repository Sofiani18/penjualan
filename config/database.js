const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3360,
      user : 'root',
      password : '',
      database : 'db_kafe'
    }
  });

  module.exports = knex;