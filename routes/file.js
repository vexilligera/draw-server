const router = require('koa-router')()
const shell = require('shelljs');
<<<<<<< HEAD
const fs = require('fs');
=======
>>>>>>> origin/master

router.prefix('/file')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/create/:id/:name/:width/:height', function(ctx, next) {
<<<<<<< HEAD
=======
  var fs = require('fs');

>>>>>>> origin/master
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
        projectPath + '/' + ctx.params.name + '.psd');
      shell.exec("rm -f " + tempBackground);
      shell.exec("del " + ".\\users\\" + ctx.params.id + '\\' + ctx.params.name + "\\background.png");
      ctx.body = 'DONE!';
    }
  } else {
    ctx.body = "user not found";
  }
<<<<<<< HEAD
})

router.get('/list/:id', function (ctx, next) {
    var path = "./users/" + ctx.params.id + "/";
    if (fs.existsSync(path)) {
        var files = fs.readdirSync(path);
        ctx.body = JSON.stringify(files);
    } else {
        ctx.body = JSON.stringify([]);
    }
})

router.get('/thumbnail/:id/:name', function (ctx, next) {
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
=======
})

router.get('/thumbnail/:id/:name', function (ctx, next) {
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
>>>>>>> origin/master
