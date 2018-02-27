const router = require('koa-router')()

router.prefix('/files')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/:id/create/:name/:width/:height', function(ctx, next) {
  console.log(ctx.params.id)
  //
})

module.exports = router
