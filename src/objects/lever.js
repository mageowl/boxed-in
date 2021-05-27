import { power } from "../util.js";

export default class Lever extends Phaser.GameObjects.Container {
	/**
	 * Physics Body.
	 * @type {Phaser.Physics.Arcade.Body}
	 * @memberof Player
	 */
	body;
	state = power.OFF;

	/** @type {Phaser.GameObjects.Container} */
	lever;

	/**
	 * Creates an instance of Platform.
	 * @param {object} config
	 * @param {import("../scene.js").default} config.scene
	 * @memberof Platform
	 */
	constructor(config) {
		const base = config.scene.add
			.rectangle(0, 10, 21, 4, 0x212121)
			.setOrigin(0.5, 1);

		const handle = config.scene.add
			.rectangle(0, 0, 3, 20, 0x888888)
			.setOrigin(0.5, 0.9);

		const ball = config.scene.add.circle(0, -20, 4, 0xf03348);

		const lever = config.scene.add
			.container(0, 7.5, [handle, ball])
			.setRotation(-0.5);

		super(config.scene, config.x, config.y, [lever, base]);

		this.setSize(20, 20);
		this.lever = lever;
		this.trigger = config.trigger;

		config.scene.add.existing(this);
		config.scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY);
		config.scene.updates.push(this);
	}

	update() {
		if (this.scene.physics.overlap(this, this.scene.player)) {
			const vx = this.scene.player.body.velocity.x;
			if (vx !== 0) this.state = vx > 0 ? power.ON : power.OFF;
			this.lever.setRotation(this.state === power.ON ? 0.5 : -0.5);
		}
	}
}
