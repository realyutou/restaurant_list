// 引用Express及Express路由器
const express = require('express')
const router = express.Router()

// 引入home模組程式碼
const home = require('./modules/home')

// 引入restaurants模組程式碼
const restaurants = require('./modules/restaurants')

// 將網址結構符合'/'字串的request導向home模組
router.use('/', home)

// 將網址結構符合'/restaurants'字串的request導向home模組
router.use('/restaurants', restaurants)

// 匯出路由器
module.exports = router