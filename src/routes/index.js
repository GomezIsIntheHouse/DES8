// madre administradora de rutas
const express = require('express')
const productosRouter = require('./productos/productos.router');

const router = express.Router();

router.get('/health',(_req,res)=>{
    res.status(200).json({
        success:true,
        health:'Up',
        enviroment:process.env.ENVIROMENT || 'not fund'
    })
})
.use('/productos', productosRouter)

module.exports = router;