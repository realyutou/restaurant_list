// Include packages and define server related variables
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Require dotenv only in non-production environment
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT
// Set templates engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Set static files
app.use(express.static('public'))

// 設定每筆請求都會透過method-override進行前置處理
app.use(methodOverride('_method'))

// 呼叫passport函式並傳入參數app
usePassport(app)

// Set connect-flash
app.use(flash())

// 將驗證資料傳入路由
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 將request導入路由器
app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})
