const express = require('express')
const bodyParser = require('body-parser');
const http = require('http');
const Helpers = require('./utils/helpers.js')

const port = 3000


const pg = require('knex')({
  client: 'pg',
  version: '9.6',      
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/logs'
});


const app = express();
http.Server(app); 


app.use(express.json());
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);  

app.get('/test', (req, res) => {

  res.status(200).send();
})

app.get('/', async (req, res) => {
  
})

app.get('/story/:uuid', async (req, res) => {
  
})


async function initialiseTables() {
  await pg.schema.hasTable('logs').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('logs', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('content');
          table.string('story_id');
          table.integer('order');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table logs');
        });

    }
  });
  await pg.schema.hasTable('log').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('story', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('title');
          table.string('summary');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table story');
          for (let i = 0; i < 10; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('story').insert({ uuid, title: `random element number ${i}` })
          }
        });
        
    }
  });
}
initialiseTables()

module.exports = app;