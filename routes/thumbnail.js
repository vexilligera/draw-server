const router = require('koa-router')()
const shell = require('shelljs');

router.prefix('/thumbnail')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/:id/:name', function (ctx, next) {
    var fs = require('fs');
    var path = "./users/" + ctx.params.id + "/";
    if (fs.existsSync(path)) {
        var projectPath = path + ctx.params.name;
        if (fs.existsSync(projectPath)) {
            var psdPath = projectPath + "/" + ctx.params.name + ".psd[0]";
            var thumbnailPath = projectPath + "/" + "thumbnail.png";
            shell.exec('convert ' + psdPath + ' -thumbnail "800x800>" ' + thumbnailPath);
            ctx.attachment(psdPath);
        } else {
           ctx.body = "project not exists!";
        }
    } else {
        ctx.body = "user not exists!";
    }
})



module.exports = router