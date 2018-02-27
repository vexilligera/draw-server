let fs = require('fs')

const router = require('koa-router')()
let Authing = require('authing-js-sdk')
let auth = new Authing({
  clientId: '5a8b9500e8cb1e0001ef8b6f',
  secret: 'fe9f796728a907c5668d4fba5c52e478'
})

let authing = null;

auth.then(function(validAuth) {
	authing = validAuth
}).catch(function(error) {
	console.log(error)
})

function deleteall(path) {  
    var files = [];  
    if(fs.existsSync(path)) {  
        files = fs.readdirSync(path);  
        files.forEach(function(file, index) {  
            var curPath = path + "/" + file;  
            if(fs.statSync(curPath).isDirectory()) { // recurse  
                deleteall(curPath);  
            } else { // delete file  
                fs.unlinkSync(curPath);  
            }  
        });  
        fs.rmdirSync(path);
    }  
}

router.prefix('/register')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/:id', function(ctx, next) {
  let uid = ctx.params.id
  authing.user({id: uid}).then(function(user){
  	if (user) {
  	  // create user
      fs.mkdirSync('./users/' + uid, 777, (err) => {
      	if (err && err.errno == -4075)
      	  deleteall('./users/' + uid)
      	  fs.mkdirSync('./users/' + uid, 777, (error) => {})
      })
      // create config
      fs.writeFileSync('./users/' + uid + '/config.json', fs.readFileSync('./users/default_config.json'))
  	}
  }).catch(function(error) {
    console.log(error);    
  });
})

module.exports = router
