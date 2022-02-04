export default class Home extends Phaser.Scene {
	constructor() {
		super({
			key: "Home",
		});
	}
	preload() {}
	create() {
		let self = this;

		self.fiveLetterBox = self.add
			.rectangle(450, 400, 200, 100, 0x32cd32)
			.setInteractive()
			.on("pointerdown", function () {
				self.scene.start("Game", {
					numLetters: 5,
				});
			});
		self.fiveLetterText = self.add
			.text(
				self.fiveLetterBox.getCenter().x,
				self.fiveLetterBox.getCenter().y,
				["5-Letter"]
			)
			.setColor("#FFFFFF")
			.setFontSize(45)
			.setFontFamily("Trebuchet MS")
			.setOrigin(0.5);

		self.sixLetterBox = self.add
			.rectangle(450, 550, 200, 100, 0x32cd32)
			.setInteractive()
			.on("pointerdown", function () {
				self.scene.start("Game", {
					numLetters: 6,
				});
			});
		self.sixLetterText = self.add
			.text(
				self.sixLetterBox.getCenter().x,
				self.sixLetterBox.getCenter().y,
				["6-Letter"]
			)
			.setColor("#FFFFFF")
			.setFontSize(45)
			.setFontFamily("Trebuchet MS")
			.setOrigin(0.5);
	}
}
