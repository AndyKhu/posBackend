const express = require('express');

const { isAuthenticated } = require('../../middlewares');
const { getMenuAccess, getMenuAccessLists, getMenuAccessForm } = require('./menu.services');
const router = express.Router()

router.get("/menuaccess",isAuthenticated, async (req,res) => {
  try{
    const menuAccess = await getMenuAccessLists(req.payload.userId)
    res.send(menuAccess)
  }catch(err){
    res.status(400).send(err.message)
  }
})

router.get("/menuaccessform",isAuthenticated, async (req,res) => {
  try{
    const menuAccess = await getMenuAccessForm()
    res.send(menuAccess)
  }catch(err){
    res.status(400).send(err.message)
  }
})

router.get("/menupermission",isAuthenticated, async (req,res) => {
  try{
    const query = req.query
    const menuAccess = await getMenuAccess(req.payload.userId,query.title)
    res.send(menuAccess)
  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = router;