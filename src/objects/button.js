import { power } from "../util.js";

export default class Button extends Phaser.GameObjects.Container {
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
			.rectangle(0, 10, 21, 3, 0x212121)
			.setOrigin(0.5, 1);

		const button = config.scene.add
			.rectangle(0, 8, 17, 5, 0xf03348)
			.setOrigin(0.5, 1);

		super(config.scene, config.x, config.y, [button, base]);

		this.setSize(20, 7);
		this.button = button;
		this.trigger = config.trigger;

		config.scene.add.existing(this);
		config.scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY);
		config.scene.updates.push(this);

		this.body.setOffset(0, 7);
	}

	update() {
		this.state = this.scene.physics.overlap(this, this.scene.player)
			? power.ON
			: power.OFF;
		this.button.setY(8 + (this.state === power.ON) * 2);
	}
}
