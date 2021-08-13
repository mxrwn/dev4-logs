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

router.put('/update', async (req, res) => {
  const {uuid, title, content, category_id} = req.body
  if(title, content, category_id){
    if(uuid.length === 36){
      await pg('logs')
      .where('uuid', uuid)
      .update({
        title: title,
        content: content,
        category_id: category_id
      })
      .then(data => {
        if(data !== 1) return res.sendStatus(400)
        res.sendStatus(200)
      })
    }else{
      res.send({
        message: 'uuid length need to be at least 36 characters'
      })
    }
  }else{
    res.sendStatus(400);
  }
})

router.delete('/delete', async (req, res) => {
  const {uuid} = req.body
  console.log(uuid)
  if(!uuid) return res.sendStatus(400);
  console.log(uuid)
  await pg('logs').where('uuid', uuid)
  .del()
  .then(data => {
    if(data !== 1) return res.sendStatus(400)
    res.sendStatus(200)
  })
})
module.exports = router;