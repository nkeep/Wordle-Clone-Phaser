export default class Home extends Phaser.Scene {
	constructor() {
		super({
			key: "Home",
		});
	}
	preload() {}
	create() {
		let self = this;

		let difficultyCheckBox = `<h4 style="display:inline; font-size:45px; color:#FFFFFF">Use Official Rules</h4><input type="checkbox" name="difficulty" style="width:40px; height:40px" display:inline>`;
		this.difficultySelect = this.add.dom(self).createFromHTML(difficultyCheckBox).setPosition(450, 800);

		self.fiveLetterBox = self.add
			.rectangle(450, 400, 200, 100, 0x32cd32)
			.setInteractive()
			.on("pointerdown", function () {
				self.scene.start("Game", {
					numLetters: 5,
					difficulty: self.difficultySelect.getChildByName("difficulty").checked
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
					difficulty: self.difficultySelect.getChildByName("difficulty").checked
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
