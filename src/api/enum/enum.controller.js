const express = require('express')
const { isAuthenticated } = require('../../middlewares');
const { Save, getLists, Update, Delete } = require('./enum.service');
const router = express.Router()

router.get("/enum",isAuthenticated, async(req,res) => {
  try{
    const query = req.query
    const data = await getLists(query.type)
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.post("/enum",isAuthenticated, async(req,res) => {
  try{
    const enumData = req.body
    const savedData = await Save(enumData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.put("/enum",isAuthenticated, async(req,res) => {
  try{
    const enumData = req.body
    const savedData = await Update(enumData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.delete("/enum",isAuthenticated, async(req,res) => {
  try{
    const enumData = req.body
    const deletedData = await Delete(enumData)
    res.send(deletedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

module.exports = router;