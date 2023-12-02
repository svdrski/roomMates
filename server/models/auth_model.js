const db = require('../config/db.js')

class auth {
    
    // check email in db 
    static async CheckEmail (email) {
        try{
            return await db('users').select('id').where({email})
        } catch (e) {return e}
    }
    
    // register user in db
    static async Register (id, first_name, last_name, email, password, profile_img_url) {
        try {
            return await db('users').insert({id, first_name, last_name, email, password, profile_img_url})
        } catch (e) {return e}
    }
    
    // send all user data by email
    static async GetUser (email) {
        try{
            return db('users').select('*').where({email})
        } catch (e) {return e}
    }
    
}

// db('users').insert({first_name: 'hlen', last_name:"svidzerski", email:'ffaf@mail.com', password:'tetet'}, ['*'])
//.then(a => console.log(a))


module.exports = auth