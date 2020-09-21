const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const config = require('./routes/config')
const register = require('./routes/register')
const file = require('./users/file')
// const save = require('./routes/save')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'], formLimit: '5mb'
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200
  }
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin)
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(register.routes(), register.allowedMethods())
app.use(config.routes(), config.allowedMethods())
app.use(file.routes(), file.allowedMethods())
// app.use(save.routes(), save.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app