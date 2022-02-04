export default class KeyboardLetter {
	constructor(scene) {
		self = this;
		this.letterBox;
		this.letter;
		this.tile;
		this.x;
		this.y;

		this.render = (x, y, letter) => {
			[self.x, self.y, self.letter] = [x, y, letter];
			self.letterBox = scene.add.rectangle(x, y, 45, 45, 0xcccccc);
			self.letter = scene.add
				.text(
					self.letterBox.getCenter().x,
					self.letterBox.getCenter().y,
					[letter]
				)
				.setColor("#FFFFFF")
				.setFontSize(25)
				.setFontFamily("Trebuchet MS")
				.setOrigin(0.5);
			self.tile = scene.add.group().add(self.letter).add(self.letterBox);
			return this.tile;
		};

		this.setColor = (color) => {
			switch (color) {
				case 0:
					this.letterBox.setFillStyle(0x222222);
					break;
				case 1:
					this.letterBox.setFillStyle(0xffa500);
					break;
				case 2:
					this.letterBox.setFillStyle(0x32cd32);
					break;
			}
		};
	}
}
