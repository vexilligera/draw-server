const router = require('koa-router')()
const send = require('koa-send')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/mock.psd', async (ctx, next) =>{
	ctx.body = 'hakuro'
	ctx.attachment('mock.psd')
	await send(ctx, 'mock.psd', {root: __dirname})
	console.log(__dirname)
})

router.get('/texture.png', async (ctx, next) =>{
	ctx.body = 'texture.png'
	ctx.attachment('texture.png')
	await send(ctx, 'texture.png', {root: __dirname})
	console.log(__dirname)
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    brushSet: [
		{
			name: 'Pencil',
			opacity: 1.0,
			density: 2.0,
			polygon: 64,
			fixedColor: [-1, -1, -1, -1],
			pressureSizeSensitivity: 1.0,
			pressureColorSensitivity: 3.0,
			hotkey: 'p',
			innerThreshold: 0.5,
			blendingMode: 'NORMAL',
			enableColorMixing: false,
			mixThreshold: 0.6,
			mixStrength: 0.5,
			enableJitter: false,
			sizeJitter: 0.3,
			positionJitter: 2.0,
			tiltShading: false,
			tiltSensitivity: -1.0,
			texture: ''
		},

		{
			name: 'Brush',
			opacity: 1.0,
			density: 2.0,
			polygon: 32,
			fixedColor: [-1, -1, -1, -1],
			pressureSizeSensitivity: 1.0,
			pressureColorSensitivity: 1.0,
			hotkey: 'b',
			innerThreshold: 1.0,
			blendingMode: 'NORMAL',
			enableColorMixing: true,
			mixThreshold: 0.6,
			mixStrength: 0.5,
			enableJitter: false,
			sizeJitter: 0.3,
			positionJitter: 2.0,
			tiltShading: false,
			tiltSensitivity: -1.0,
			texture: 'http://localhost:3000/texture.png'
		},

		{
			name: 'Jitter',
			opacity: 1.0,
			density: 0.01,
			polygon: 32,
			fixedColor: [-1, -1, -1, -1],
			pressureSizeSensitivity: 1.0,
			pressureColorSensitivity: 1.0,
			hotkey: 'j',
			innerThreshold: 1.0,
			blendingMode: 'NORMAL',
			enableColorMixing: false,
			mixThreshold: 0.6,
			mixStrength: 0.5,
			enableJitter: true,
			sizeJitter: 1.0,
			positionJitter: 5.0,
			tiltShading: false,
			tiltSensitivity: -1.0,
			texture: ''
		},

		{
			name: 'Blur',
			opacity: 1.0,
			density: 0.01,
			polygon: 32,
			fixedColor: [-1, -1, -1, -1],
			pressureSizeSensitivity: 1.0,
			pressureColorSensitivity: 1.0,
			hotkey: 'f',
			innerThreshold: 1.0,
			blendingMode: 'FILTER',
			enableColorMixing: false,
			mixThreshold: 0.6,
			mixStrength: 0.5,
			enableJitter: false,
			sizeJitter: 1.0,
			positionJitter: 5.0,
			tiltShading: false,
			tiltSensitivity: -1.0,
			filterType: 'gaussian',
			kernelSize: 16,
			sigma: 20.0,
			texture: ''
		},

		{
			name: 'Eraser',
			opacity: 1.0,
			density: 0.01,
			polygon: 32,
			fixedColor: [-1, -1, -1, -1],
			pressureSizeSensitivity: 1.0,
			pressureColorSensitivity: 1.0,
			hotkey: 'e',
			innerThreshold: 1.0,
			blendingMode: 'ERASER',
			enableColorMixing: false,
			mixThreshold: 0.6,
			mixStrength: 0.5,
			enableJitter: false,
			sizeJitter: 1.0,
			positionJitter: 5.0,
			tiltShading: false,
			tiltSensitivity: -1.0,
			filterType: 'gaussian',
			kernelSize: 16,
			sigma: 20.0,
			texture: ''
		}
	],

	keyMap: {
		'undo': 'ctrl alt z',
		'thinner': '[',
		'thicker': ']',
		'magnify': 'alt =',
		'minify': 'alt -',
		'pipette': 'alt'
	},

	gesture: {
	    fingerPinch3: true,
	    fingerPinch2: true,
	    fingerRotate2: false,
	    doubleTap: true,
	    fingerRotate3: true,
	    fingerPan3Horizontal: false,
	    fingerPan3Vertical: false
    }
  }
})

module.exports = router
