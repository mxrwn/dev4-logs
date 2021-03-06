const express = require('express')
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const Helpers = require('./utils/helpers.js');
const pg = require('./utils/pg.js');
const port = 3000


const categories = require('./routes/categories');
const logs = require('./routes/logs');


const app = express();
http.Server(app); 


app.use(express.json());
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
app.use(morgan('dev'));

app.use('/category', categories);
app.use('/logs', logs);

app.get('/test', async (req, res) => {
  res.sendStatus(200);
})

app.get('/', async (req, res) => {
  
})


app.get('/logs/:uuid', async (req, res) => {

  
})


async function initialiseTables() {
    await pg.schema.hasTable('categories').then(async (exists) => {
      if (!exists) {
        await pg.schema
          .createTable('categories', (table) => {
            table.increments();
            table.uuid('uuid');
            table.string('title');
            table.timestamps(true, true);
          })
          .then(async () => {
            
          });
      }else{
        
      }
    });

    await pg.schema.hasTable('logs').then(async (exists) => {
      if (!exists) {
        await pg.schema
          .createTable('logs', (table) => {
            table.increments();
            table.uuid('uuid');
            table.string('title');
            table.string('content');
            table.string('category_id');
            table.timestamps(true, true);
          })
          .then(async () => {
           
          });
      }else{
        
      }
    });
}
initialiseTables()

module.exports = app;