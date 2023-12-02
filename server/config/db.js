const knex = require('knex')
require('dotenv').config()

const db = knex({
    client: 'pg',
    connection:{
        host: "trumpet.db.elephantsql.com",
        port: 5432,
        user: "gvcdnxom",
        password: 'lJaD92jAtrLxhm7ODSMv1sqKAu6TUXGT',
        database: "gvcdnxom",
    }
})
//
// db('users').insert({first_name: 'hlen', last_name:"svidzerski", email:'ffaf@mail.com', password:'1222'}, ['*'])
////db('users').select('*')
//.then(a => console.log(a))


module.exports = db