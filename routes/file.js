const router = require('koa-router')()
const send = require('koa-send')
const shell = require('shelljs')
const fs = require('fs')

router.prefix('/file')

router.get('/create/:id/:name/:width/:height', function(ctx, next) {
  var mkdirp = require('mkdirp');
  var path = "./users/" + ctx.params.id + "/";
  var size = ctx.params.width + 'x' + ctx.params.height;
  if (fs.existsSync(path)) {
    var projectPath = path + ctx.params.name;
    if (fs.existsSync(projectPath)) {
      ctx.body = "2"; // file already exists
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
      ctx.body = '0'; // success
    }
  } else {
    ctx.body = "1"; // user not found
  }
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

router.get('/thumbnail/:id/:name', async (ctx, next) => {
  var path = "./users/" + ctx.params.id + "/";
  if (fs.existsSync(path)) {
    var projectPath = path + ctx.params.name;
    if (fs.existsSync(projectPath)) {
      var psdPath = projectPath + "/" + ctx.params.name + ".psd[0]";
      var thumbnailPath = projectPath + "/" + "thumbnail.png";
      shell.exec('convert ' + psdPath + ' -thumbnail "800x800>" ' + thumbnailPath);
      let attachmentPath = './users/' + ctx.params.id + '/' + ctx.params.name + '/thumbnail.png';
      ctx.attachment('../users/' + ctx.params.id + '/' + ctx.params.name + '/thumbnail.png');
      fs.writeFileSync('routes/thumbnail.png', fs.readFileSync(attachmentPath))
      await send(ctx, 'thumbnail.png', {root: __dirname})
    } else {
      ctx.body = "project not exists!";
    }
  } else {
    ctx.body = "user not exists!";
  }
})

module.exports = router