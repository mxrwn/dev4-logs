
const {v1: uuidv1 } = require('uuid');
const pg = require('./pg');

const Helpers = {
  generateUUID: () => {
     const uuid = uuidv1();  
     return uuid;
  },
  checkCategoryId: async (id) => {
    return await pg.select().from('categories').where('id', id)
    .then(data => {
      const [category] = data;
      if(category){
        return true
      }
      return false
    })
    return false
  }
}

module.exports = Helpers