const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const room = require('../models/regroom_model.js')


class reg {
    //print page romm registration
    static Page (req, res) {
        res.render('regroom')
    }
    
    // new room registration
    static async Room  (req, res) {
        try{

            // 1. check token and parse email
            let token = req.headers.authorization
            token = JSON.parse(token)
            const decoded = jwt.verify(token, 'roommates')
            const email = decoded.email

            //2. parsing all form data
            const { address,size, age, availability, cleanliness, comforts, description,
                fileInput, getup, gotobed, maxage, maxpeople, name, people_in_household,
                pets, petspref, phinput, rate, schedule, smokepref, smoker, title, type
            } = req.body

            //3. converting address data to feed to db
            const fulladdress =  JSON.parse(address[1]).formatted_address
            const city = JSON.parse(address[1]).address_components[2].long_name
            const longitude = JSON.parse(address[1]).geometry.location.lng
            const attitude  = JSON.parse(address[1]).geometry.location.lat

            //4. generating id of room
            const id = uuidv4()

            // registration on db
            const newroom = await room.Register( id, fulladdress, email,size, city, longitude, attitude, age, availability,title, description, comforts,cleanliness, getup, gotobed, maxage, maxpeople, name, people_in_household, pets, petspref, rate, schedule, smokepref, smoker, type)

            // profile image saver
                if(req.files.fileInput) {
                    const profile_img = req.files.fileInput[0].path.replace('../public', '')
                    try{
                        await room.SendProfileImg(id, profile_img )
                    } catch (e) {console.log('Error ' + e)}
                }

            // room photos saver
                if(req.files.phinput) {
                    const room_img = []
                    req.files.phinput.forEach(a => {
                        room_img.push(a.path.replace('../public', ''))
                    })
                    try{
                        await room.SendPhoto(id, room_img)
                    } catch (e) {console.log('Error ' + e)}
                }

                //send new room data as response
                res.json(newroom[0].id)

        } catch (e) {console.log('Error ' + e)}


    }


}

module.exports = reg

