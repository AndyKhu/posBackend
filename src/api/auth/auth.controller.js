const express = require('express')
const { Register, Login } = require('../auth/auth.service')
const { isAuthenticated } = require('../../middlewares');
const router = express.Router()

router.post("/register", async(req,res) => {
  try{
    const userData = req.body
    const token = await Register(userData)
    res.send(token)
  }catch(err){
    res.status(400).send(err.message)
  }
})

router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;
      const data = await Login(username,password)
      res.send(data)
  } catch (err) {
      res.status(400).send(err.message)
  }
});

router.get('/verifiedtoken',isAuthenticated, async (req, res) => {
  try {
      res.json({msg: 'Authorized'})
  } catch (err) {
      res.status(400).send(err.message)
  }
});

module.exports = router;