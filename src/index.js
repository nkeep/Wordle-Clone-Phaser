import Phaser from "phaser";
import Game from "./scenes/game";
import Home from "./scenes/home";

const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 900,
	height: 850,
	scene: [Home, Game],
	dom: { createContainer: true },
	loader: { crossOrigin: true },
	autoCenter: true,
};

const game = new Phaser.Game(config);
