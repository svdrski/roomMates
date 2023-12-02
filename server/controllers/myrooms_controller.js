const jwt = require('jsonwebtoken')
const model = require('../models/search_mode.js')


class myrooms {

    static get (req, res){
        res.render('myrooms')
    }

    // get list of rooms of cuurent user by using his email
    static async posts (req, res){
        try{
            let token = req.headers.authorization
            token = JSON.parse(token)
            const decoded = jwt.verify(token, 'roommates')
            const email = decoded.email
            console.log(email)
            const data = await model.myrooms(email)
            res.send(data)

        } catch (e) {console.log('Error ' + e)}
      
    }

    // delete room from db
    static async delete(req, res) {
        try{
            const {id} = req.params
            model.delete(id)
            res.send('deleted')
        } catch (e) {console.log('Error ' + e)}
    }
}

module.exports = myrooms