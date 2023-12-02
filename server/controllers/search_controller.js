const model = require('../models/search_mode.js')

class search {
    
    // rendering search page
    static  async Open (req, res) {
        res.render('search')
    }

    // get list of first 10 id's of rooms 
    static async GetList (req, res) {
        try{
           const data = await model.get()
           res.send(data)
        } catch (e) {console.log('Eroor ' + e)}
    }


    // get name of city from request and find matching rooms in db
    static async value (req, res) {
        try{
            const {value} = req.query
            console.log(value)
            const data = await model.find(value)
            res.json(data)
        } catch (e) {console.log('Eroor ' + e)}
    }
}

module.exports = search