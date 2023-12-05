const db = require('../models/getdata_model.js')
const key = process.env.MAP_KEY


// controller to get data 
class get {

    // rendering room by using id in url
    static async Room(req, res) {
        try{
            const {id} = req.params
            const data = await db.room(id)
            data.key = key

            console.log(data)
            res.render('room', {data})
        } catch (e) {console.log('Error ' + e)}

    }

    // send all data of room to client 
    static async RoomData(req, res) {
        try{
            const {id} = req.params
            const data = await db.room(id)
            res.send(data)
        } catch (e) {console.log('Error ' + e)}
    }

}

module.exports = get