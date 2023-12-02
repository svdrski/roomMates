
const multer = require('multer');
const path = require('path')
const { v4: uuidv4 } = require('uuid');



//catch all uploaded files and save it in static folder using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/static/');
        },
    filename: function (req, file, cb) {
        cb(null,   uuidv4() + file.originalname); 
        },
});


const upload = multer({ storage: storage });
module.exports = upload