const express = require('express')
const router = require('./routes/router.js')
const app = express()
const port = 3333
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname+ "/../public"))
app.use(router)
app.set('views', '../public/pages');
app.set('view engine', 'ejs')

app.listen(port, ()=>{console.log(`Listening on ${port}`)})