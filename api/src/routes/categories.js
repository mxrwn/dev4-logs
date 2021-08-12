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

router.put('/update', async (req, res) => {
  if(req.body.title && req.body.uuid){
    if(req.body.uuid.length === 36){
      await pg('categories').where('uuid', req.body.uuid)
      .update({
        uuid: req.body.uuid,
        title: req.body.title
      })
      .then(data => {
        console.log(data);
        res.sendStatus(200);
      });
    }else{
      res.send({
          message: 'uuid length need to be at least 36 characters' 
      })
    }
  }else{
    res.send({
      message: 'invalid input'
    })
  }
})

router.delete('/delete', async (req, res) => {
  if(req.body.uuid){
    if(req.body.uuid.length === 36){
      await pg('categories').where('uuid', req.body.uuid)
      .del()
      .then(() => {
        res.sendStatus(200)
      })
    }else{
      res.sendStatus(400);
    }
  }else{
    res.sendStatus(400);
  }
})
module.exports = router;