require('dotenv').config()
const express = require('express');
const indexRouter = require('./src/routes/index');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));



app.use('/api', indexRouter)  //desp de /api agregame todas las rutas declaradas en './src/routes/index'
app.use(express.static('public')) //para vincular el archivo estatico de html al servidor
module.exports = app;