
const router = require('koa-router')()

router.prefix('/listfile')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/:id', function (ctx, next) {
    var fs = require('fs');
    var path = "./users/" + ctx.params.id + "/";
    if (fs.existsSync(path)) {
        var files = fs.readdirSync(path);
        // console.log(files);
        ctx.body = JSON.stringify(files);
    } else {
        ctx.body = JSON.stringify([]);
    }
})

module.exports = router