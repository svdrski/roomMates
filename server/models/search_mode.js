const db = require('../config/db.js')


class search {

    //select id of 10 rooms
    static async get () {
        try{
            return await db('rooms').select('id').limit(10)
        } catch (e) {return e}
    }

    // select list of users rooms by email
    static async myrooms(email) {
        try{
            return await db('rooms').select('id').where({email})
        } catch (e) {return e}
    }

    // find rooms to search request 
    static async find(value){
        try{
            if(value) {
                const searchValue = value.toLowerCase().replace(' ', '')
                return await db('rooms').select('*').where(db.raw("REPLACE(LOWER(city), ' ', '') LIKE ?", searchValue))
            }
        }catch (e) {return e}
    }


    // deleting room with transaction
    static async delete(id) {
        try {
          const del = await db.transaction(async (trx) => {
            // check records in db
            const photoExists = await db('photos').where({ id }).transacting(trx).first();
            const profileImgExists = await db('profile_img').where({ id }).transacting(trx).first();
            const roomExists = await db('rooms').where({ id }).transacting(trx).first();
      
                // if find delete 
                if (photoExists) {
                await db('photos').where({ id }).del().transacting(trx);
                }
        
                if (profileImgExists) {
                await db('profile_img').where({ id }).del().transacting(trx);
                }
        
                if (roomExists) {
                await db('rooms').where({ id }).del().transacting(trx);
                }
      
            trx.commit();
            return
          });
          return del;
        } catch (e) { console.log('Error ' + e);}
      }
      
}

module.exports = search