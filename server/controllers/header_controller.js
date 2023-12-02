const jwt = require('jsonwebtoken')
const auth = require('../models/auth_model.js')


class  header {

    // get data of user who open page
    static async getdata (req, res) {
        try{
            
            //check token
            let token = req.headers.authorization
            console.log(token)
            // if token not found redirect to login
            if(token === 'null') {return res.redirect(301, '/login');    }
                token = JSON.parse(token)

            //verify token and send data to client
                const email = jwt.verify(token, 'roommates')
                const user = await auth.GetUser(email.email)
                res.send(user)  

        } catch (e) {console.log('Error ' + e)}
  
    } 
}

module.exports = header