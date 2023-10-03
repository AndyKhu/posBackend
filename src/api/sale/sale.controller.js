const express = require('express');
const { Save, getSaleById, getSales, Delete, Update } = require('./sale.service');
const { isAuthenticated } = require('../../middlewares');
const router = express.Router()

router.post("/sale",isAuthenticated, async(req,res) => {
  try{
    const saleData = req.body
    const savedData = await Save(saleData,req.payload.userId)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.get("/sale",isAuthenticated, async(req,res) => {
  try{
    const query = req.query
    const data = await getSaleById(query.id)
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.get("/sales",isAuthenticated, async(req,res) => {
  try{
    const query = req.query
    const data = await getSales(query)
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.put("/sale",isAuthenticated, async(req,res) => {
  try{
    const productData = req.body
    const savedData = await Update(productData,req.payload.userId)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.delete("/sales",isAuthenticated, async(req,res) => {
  try{
    const salesData = req.body
    const deletedData = await Delete(salesData)
    res.send(deletedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

module.exports = router;