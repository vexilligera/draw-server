const router = require('koa-router')()
const fs = require('fs')

router.prefix('/config')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a config response!'
})

router.get('/get/:id', function(ctx, next) {
  let id = ctx.params.id
  config = fs.readFileSync('./users/' + id + '/config.json')
  ctx.body = config.toString()
})

router.post('/save/:id', function(ctx, next) {
  let id = ctx.params.id
  let config = JSON.parse(ctx.request.body.config)
  ctx.body = JSON.stringify(config)
  fs.writeFileSync('./users/' + id + '/config.json', ctx.body)
})

module.exports = router