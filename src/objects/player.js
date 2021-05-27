export default class Player extends Phaser.GameObjects.Rectangle {
	/**
	 * Physics Body.
	 * @type {Phaser.Physics.Arcade.Body}
	 * @memberof Player
	 */
	body;

	static SPEED = 200;
	static JUMP_HEIGHT = 550;

	/**
	 * Creates an instance of Player.
	 * @param {object} config
	 * @param {import("../scene.js").default} config.scene
	 * @memberof Player
	 */
	constructor(config) {
		super(config.scene, config.x, config.y, 18, 36, 0x222222);

		config.scene.add.existing(this);
		config.scene.physics.world.enable(this);
		config.scene.updates.push(this);

		this.keys = config.scene.input.keyboard.addKeys("W,A,S,D");
		this.setDepth(3);
	}

	update() {
		const input = Object.fromEntries(
			Object.entries(this.keys).map(([key, { isDown }]) => [key, isDown])
		);

		this.body.setVelocityX((input.D - input.A) * Player.SPEED);

		if (input.W && this.body.onFloor()) {
			this.body.setVelocityY(-Player.JUMP_HEIGHT);
		}
	}
}
