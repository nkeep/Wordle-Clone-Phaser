import Phaser from "phaser";
import Game from "./scenes/game";

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 900,
	height: 850,
	scene: [Game],
	dom: { createContainer: true },
	loader: { crossOrigin: true },
	autoCenter: true,
};

const game = new Phaser.Game(config);
