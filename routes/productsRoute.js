const express = require('express')
const router = express.Router();
const Products = require('../model/Products')


router.get('/', async (req,res) => {
    try{
        const products = await Products.find();
        res.json(products);
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
} )

router.get('/:id', async(req, res) => {
    try{
        const product = await Products.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: "Cannot find product" });
          }

          res.json(product)
    }
    catch(err){
        res.status(500).json({ message: error.message });
    }
})

module.exports = router