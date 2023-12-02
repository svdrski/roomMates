const db = require('../config/db.js')

class get {
    
    // creating array with data of room by id 
    static async room (id) {
        try{
            const response = {}

            // addind room info
            const data = await   db('rooms').where({id}).select('*')
                      response.room = data[0]
            
            // addind photos info or placeholder by default
            const photos = await db('photos').where('id', id).select('*')
                      response.photos =(photos.length > 0) ? photos : [{id:data[0].id, url: '/static/placeholder.jpg'}]

            // addind profile_image info or placeholder by default
            const profileimg = await db('profile_img').where('id', id).select('*')
                     response.profileimg = (profileimg.length > 0) ? profileimg : [{id:data[0].id, url: '/static/placeholder.jpg'}]
            
            return response
        } catch (e) {return e}
    }

    
}

module.exports = get
