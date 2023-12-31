const Koa = require('koa')
const app = new Koa()
const path = require('path')
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body') // 文件上传
const routes = require('./routes/index')
const config = require('./config')

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

app.use(koaBody.koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 1000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    keepExtensions: true,//保留扩展名
    uploadDir: path.join(__dirname,`./${config.uploadFolder}`)//上传文件的存储位置，这里其实可以用一个全局变量存储
  }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
routes(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
