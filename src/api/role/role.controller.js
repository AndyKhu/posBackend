const express = require('express');
const { getRoles, Delete, Save, Update } = require('./role.service');
const { isAuthenticated } = require('../../middlewares');
const router = express.Router()


router.get("/roles",isAuthenticated, async(req,res) => {
  try{
    const data = await getRoles()
    res.send(data)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.delete("/roles",isAuthenticated, async(req,res) => {
  try{
    const roleData = req.body
    const deletedData = await Delete(roleData)
    res.send(deletedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})


router.post("/role",isAuthenticated, async(req,res) => {
  try{
    const roleData = req.body
    const savedData = await Save(roleData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

router.put("/role",isAuthenticated, async(req,res) => {
  try{
    const roleData = req.body
    const savedData = await Update(roleData)
    res.send(savedData)
  }catch(err){
    console.log(err.message)
    res.status(400).send({err: err.message})
  }
})

module.exports = router;