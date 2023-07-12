const router = require('koa-router')()
const users = require('./users')
const upload = require('./upload')

module.exports = (app) => {
  app.use(users.routes(), users.allowedMethods())
  app.use(upload.routes(), upload.allowedMethods())
}
