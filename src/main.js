import Scene from "./scene.js";
const game = new Phaser.Game({
	type: Phaser.CANVAS,
	scale: {
		mode: Phaser.Scale.RESIZE
	},
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 1000 }
			// debug: true
		}
	},
	render: {
		pixelArt: false,
		antialias: false
	},
	backgroundColor: 0xd1d1d1,
	scene: Scene
});
