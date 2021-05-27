import Button from "./objects/button.js";
import Lever from "./objects/lever.js";
import Platform from "./objects/platform.js";
import Player from "./objects/player.js";
import { getProperty } from "./util.js";

export default class Scene extends Phaser.Scene {
	player;
	updates = [];

	preload() {
		this.load.tilemapTiledJSON("level", "../tilemaps/ch1.json");
		this.load.image("tilesetImage", "../tilemaps/tileset.png");
	}

	create() {
		this.add
			.rectangle(
				0,
				0,
				this.scale.width,
				-((this.scale.height / 2 - 400) / 2),
				0xf5f5f5
			)
			.setOrigin(0)
			.setScrollFactor(0, 1);
		this.add
			.rectangle(
				0,
				400,
				this.scale.width,
				-((this.scale.height / 2 - 400) / 2),
				0xf5f5f5
			)
			.setOrigin(0, 1)
			.setScrollFactor(0, 1);

		const map = this.add.tilemap("level");
		map.addTilesetImage("tileset", "tilesetImage");
		const world = map
			.createLayer("walls", "tileset")
			.setCollisionByProperty({ collision: true })
			.setDepth(2);

		const objects = map.getObjectLayer("objects").objects;
		const data = {};

		objects.forEach(({ type, id, x, y, properties = [] }) => {
			switch (type) {
				case "spawn": {
					this.player = new Player({
						scene: this,
						x: x + 9,
						y: y - 18
					});
					break;
				}

				case "position": {
					data[id] = { x, y };
					break;
				}

				case "lever": {
					const obj = new Lever({
						scene: this,
						x: x + 12,
						y: y - 10
					});

					data[id] = obj;
					break;
				}

				case "button": {
					const obj = new Button({
						scene: this,
						x: x + 12,
						y: y - 10
					});

					data[id] = obj;
					break;
				}
			}
		});

		objects.forEach(({ type, properties = [], x, y, width, height }) => {
			switch (type) {
				case "platform": {
					const obj = new Platform({
						scene: this,
						x: x + width / 2,
						y: y - height / 2,
						width,
						height,
						pos2: data[getProperty(properties, "target")],
						trigger: data[getProperty(properties, "power")]
					});

					this.physics.add.collider(this.player, obj);
					break;
				}
			}
		});

		this.physics.add.collider(this.player, world);
		this.cameras.main
			.setZoom(2)
			.startFollow(this.player)
			.setBounds(
				0,
				-((this.scale.height / 2 - 400) / 2),
				2500,
				-((this.scale.height / 2 - 400) / 2)
			);
	}

	update() {
		this.updates.forEach((u) => u.update());
	}
}
