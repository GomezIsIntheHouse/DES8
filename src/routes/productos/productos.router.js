const express = require('express')
const router = express.Router();

// aqui se iran almacenando los productos
let productos = []

router.get('/', (_req, res)=>{
    console.log(productos)
    try {
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', (req, res)=>{
    try {
        const {id}= req.params

        const selected = productos.filter((i)=>{
            i.id == id
        })
        console.log(id, selected)
        res.status(200).json({
            success:true,
            data: selected
        })
    } catch (error) {
        res.status(500).json(error)
    }
})


// endp al que se llama para agregar un nuevo producto
router.post('/',(req,res)=>{
    let ultimoElemento
    try {
        const { body } = req; //aqui llegaria el objeto nuevo   
        const controllerLong = productos.length
        let nuevoId 
        console.log(controllerLong)

       
        if ( controllerLong==0){
            
            body.id = 1
            
            productos.push(body) 
            
        }

        if(controllerLong==1 || controllerLong>1){ 
            console.log('mas de uno')
            ultimoElemento = productos.pop()
            
            nuevoId  = ultimoElemento.id + 1
            
            body.id = nuevoId
            productos.push(body)
        }
 
        // productos.push(body)
        
        
        
        res.status(200).json({
            success:true,
            data: body
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;