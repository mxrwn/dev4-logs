const router = require('express').Router();
const pg = require('./../utils/pg.js');
const Helper = require('./../utils/helpers.js');

router.get('/', async (req, res) => {
  await pg.select().from('logs')
  .then(data => {
    res.send(data)
  })
})

router.post('/create', async (req, res) => {
  //uuid, title, content, category_id
  const {title, content, category_id} = req.body
  if(title, content, category_id){
    const exist = Helper.checkCategoryId(category_id);
    exist.then(async data => {
      if(data){
        await pg('logs').insert({uuid: Helper.generateUUID(), title: title, content: content, category_id: category_id})
        .then(data => {
          res.sendStatus(200);
        })
      }else{
        res.send({
          message: 'category does not exist'  
        })
      }
    })
  }else{
    res.sendStatus(400);
  }
})

module.exports = router;