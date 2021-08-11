const router = require('express').Router();
const pg = require('./../utils/pg.js');
const Helper = require('./../utils/helpers.js');
router.get('/', (req, res) => {

})

router.post('/create', async (req, res) => {
  console.log(req.body);
  if(req.body.title){
    const category = {
      uuid: Helper.generateUUID(),
      title: req.body.title
    }
    await pg('categories').insert(category)
    .then(() => {
      res.send({
        category 
      })
    })
  }
})

module.exports = router;