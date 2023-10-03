const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const { getUsers, Delete, Save, Update } = require('./user.service');
const router = express.Router()


router.get("/users",isAuthenticated, async(req,res) => {
  try{
    const data = await getUsers()
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.delete("/users",isAuthenticated, async(req,res) => {
  try{
    const userData = req.body
    const deletedData = await Delete(userData)
    res.send(deletedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})


router.post("/user",isAuthenticated, async(req,res) => {
  try{
    const userData = req.body
    const savedData = await Save(userData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.put("/user",isAuthenticated, async(req,res) => {
  try{
    const userData = req.body
    const savedData = await Update(userData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

module.exports = router;