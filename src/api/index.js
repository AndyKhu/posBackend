const express = require('express');

const auth = require('./auth/auth.controller');
const role = require('./role/role.controller');
const menu  = require('./menu/menu.controller');
const enumC = require('./enum/enum.controller');
const product = require('./product/product.controller');
const sale = require('./sale/sale.controller');
const user = require('./user/user.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/auth', auth);
router.use('/', [role,menu,enumC,product,sale,user]);

module.exports = router;