const express = require('express');

const { isAuthenticated } = require('../../middlewares');
const { Save, Update, getProductById, getProducts, Delete } = require('./product.services');
const router = express.Router()


router.post("/product",isAuthenticated, async(req,res) => {
  try{
    const productData = req.body
    const savedData = await Save(productData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.put("/product",isAuthenticated, async(req,res) => {
  try{
    const productData = req.body
    const savedData = await Update(productData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.delete("/product",isAuthenticated, async(req,res) => {
  try{
    const productData = req.body
    const deletedData = await Delete(productData)
    res.send(deletedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.get("/product",isAuthenticated, async(req,res) => {
  try{
    const query = req.query
    const data = await getProductById(query.id)
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.get("/products",isAuthenticated, async(req,res) => {
  try{
    const query = req.query
    const data = await getProducts(query)
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

module.exports = router;