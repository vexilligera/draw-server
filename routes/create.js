const router = require('koa-router')()
const shell = require('shelljs');

router.prefix('/create')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/:id/:name/:width/:height', function (ctx, next) {
    var fs = require('fs');
    
    var mkdirp = require('mkdirp');
    var path = "./users/" + ctx.params.id + "/";
    var size = ctx.params.width + 'x' + ctx.params.height;
    if (fs.existsSync(path)) {
        var projectPath = path + ctx.params.name;
        if (fs.existsSync(projectPath)) {
            ctx.body = "duplicate name found!";
        } else {
            mkdirp(path + ctx.params.name, function (err) {
                if (err) console.error(err)
            });
            var tempBackground = projectPath + "/background.png";
            shell.exec("convert -size " + size + " canvas:white " + tempBackground);
            shell.exec('magick convert ( -page +0+0 -label "background " ' + tempBackground + ' -background none -mosaic -set colorspace RGB ) ( -clone 0--1 -background none -mosaic ) -alpha Off -reverse ' + 
                        projectPath + '/background.psd');
            shell.exec("rm " + tempBackground);
            ctx.body = 'DONE!';
        }
    } else {
        ctx.body = "user not exists!";
    }

})

module.exports = router