const express = require('express')
const auth = require('../controllers/auth_controller.js')
const reg = require('../controllers/reglistings_controller.js')
const fetch = require('../controllers/getdata_controller.js')
const myrooms = require('../controllers/myrooms_controller.js')
const search = require('../controllers/search_controller.js')
const header = require('../controllers/header_controller.js')
const upload = require('../middlewares/uploads.js')
const path = require('path')

const router = express.Router()


router.get('/', (req, res)=>{
    res.render('index')
})

// header data
router.get('/headers', header.getdata)

// authorization
router.get('/registration', auth.RegPage)
router.post('/registration', auth.Registration)
router.get('/login', auth.LogPage)
router.post('/login', auth.Login)

// adding room
router.get('/add/room',  reg.Page)
router.post('/add/room',upload.fields([{ name: 'phinput', maxCount: 10 }, { name: 'fileInput', maxCount: 1 }]), reg.Room)

// get room or data
router.get('/room/:id', fetch.Room)
router.get('/roomdata/:id', fetch.RoomData)

// users rooms routes
router.get('/myrooms', myrooms.get)
router.post('/myrooms', myrooms.posts)
router.post('/myrooms/delete/:id', myrooms.delete)

// routes for search
router.get('/search', search.Open )
router.get('/search/getlist', search.GetList)
router.get('/find', search.value)



module.exports = router