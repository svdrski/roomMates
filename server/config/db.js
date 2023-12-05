const knex = require('knex')
require('dotenv').config()

const db = knex({
    client: 'pg',
    connection:{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
})
//
// db('users').insert({first_name: 'hlen', last_name:"svidzerski", email:'ffaf@mail.com', password:'1222'}, ['*'])
////db('users').select('*')
//.then(a => console.log(a))


module.exports = db