import { power } from "../util.js";

export default class Platform extends Phaser.GameObjects.Rectangle {
	/**
	 * Physics Body.
	 * @type {Phaser.Physics.Arcade.Body}
	 * @memberof Player
	 */
	body;
	trigger;
	pos1;
	pos2;

	/**
	 * Creates an instance of Platform.
	 * @param {object} config
	 * @param {import("../scene.js").default} config.scene
	 * @memberof Platform
	 */
	constructor(config) {
		super(
			config.scene,
			config.x,
			config.y,
			config.width,
			config.height,
			0xf03348
		);

		config.scene.add.existing(this);
		config.scene.physics.world.enable(this);
		config.scene.updates.push(this);

		this.pos1 = { x: config.x, y: config.y };
		this.pos2 = config.pos2;
		this.trigger = config.trigger;
		this.setDepth(1).body.setAllowGravity(false).setImmovable(true);
	}

	update() {
		const target = this[this.getState()];
		const prev = this[this.getState(true)];

		if (
			!(
				Math.round(this.x / 6.25) * 6.25 ===
					Math.round(target.x / 6.25) * 6.25 &&
				Math.round(this.y / 6.25) * 6.25 === Math.round(target.y / 6.25) * 6.25
			)
		) {
			this.body.setVelocity(
				Math.min(Math.abs(target.x - prev.x), 100) *
					Math.sign(target.x - prev.x),
				Math.min(Math.abs(target.y - prev.y), 100) *
					Math.sign(target.y - prev.y)
			);
		} else {
			this.body.setVelocity(0, 0);
			this.setPosition(target.x, target.y);
		}
	}

	getState(not = false) {
		const state = this.trigger?.state;
		return (not ? state === power.OFF : state === power.ON) ? "pos2" : "pos1";
	}
}
