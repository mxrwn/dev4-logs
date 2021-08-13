const router = require('express').Router();
const pg = require('./../utils/pg.js');
const Helper = require('./../utils/helpers.js');

router.post('/', async (req, res) => {
  await pg.select().from('logs')
  .then(data => {
    res.send(data)
  })
})