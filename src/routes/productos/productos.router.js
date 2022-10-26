const express = require('express')
const router = express.Router();


// aqui se iran almacenando los productos
let productos = []

router.get('/', (_req, res)=>{
    
    try {
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', (req, res)=>{
    try {
        const { id }= req.params
        const selected = productos.filter(( i ) => i.id == id )
        console.log(selected)
       if(selected=='undefined' || selected==''){
        res.status(200).json({
            success:false,
            data: `Producto con id: ${id} no encontrado`
        })
       }else{
           res.status(200).json({
               success:true,
               data: selected
           })
       }

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', (req, res)=>{
    
    try {
        const { id } = req.params
        const controllerLong = productos.length
        const selected = productos.filter(( i ) => i.id == id )
        for (let index = 0; index < controllerLong ; index++) {  
          
            if(productos[index].id == id){                     
                productos.splice(index, 1)               
            }   
        }                  
       if(selected=='undefined' || selected==''){
        res.status(200).json({
            success:false,
            data: `Producto con id: ${id} no encontrado`
        })
       }else{
           res.status(200).json({
               success:true,
               data: `Producto con id: ${id} eliminado con éxto`
           })
       }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/:id', (req,res)=>{
    try {
        const controllerLong = productos.length
        const { id } = req.params
        const { body } = req
        let _id = parseInt(id)

        const newObj = {
            name:body.name,
            price:body.price,
            id:_id,
        }     
        const selected = productos.filter(( i ) => i.id == id )
        for (let index = 0; index < controllerLong ; index++) {  
            
            if(productos[index].id == id){  
                productos.splice(index, 1)               
          
                productos.splice(index, 0, newObj)    
            }   
        }  

        if(selected=='undefined' || selected==''){
            res.status(200).json({
                success:false,
                data: `Producto con id: ${id} no encontrado`
            })
           }else{
               res.status(200).json({
                   success:true,
                   data: `Producto con id: ${id} actualizado con éxto`
               })
           }
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.post('/',(req,res)=>{
    
    let lastObjInArray;
    try {
        const { body } = req;  
        const controllerLong = productos.length
        let ultimo = controllerLong - 1
        lastObjInArray = productos[ultimo]
      
        {
            lastObjInArray == 'undefined' || controllerLong==0 ? 
            body.id = 1 : 
            body.id = lastObjInArray.id + 1
        }

        productos.push(body) 

        res.status(200).json({
            success:true,
            data: body
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;