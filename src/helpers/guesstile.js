export default class GuessTile {
	constructor(scene) {
		self = this;
		this.x;
		this.y;
		this.box;
		this.letter;
		this.tile;
		this.value;

		this.render = (x, y) => {
			[self.x, self.y] = [x, y];
			this.box = scene.add.rectangle(x, y, 65, 65, 0x555555);
			this.letter = scene.add
				.text(this.box.getCenter().x, this.box.getCenter().y, [""])
				.setColor("#FFFFFF")
				.setFontSize(35)
				.setFontFamily("Trebuchet MS")
				.setOrigin(0.5);
			this.tile = scene.add.group().add(this.box).add(this.letter);
			return self.tile;
		};

		this.updateLetter = (letter) => {
			this.letter
				.setX(this.box.getCenter().x)
				.setY(this.box.getCenter().y)
				.setOrigin(0.5)
				.setText(letter);
			this.value = letter;
		};
		this.setColor = (color) => {
			switch (color) {
				case 0:
					this.box.setFillStyle(0x222222);
					break;
				case 1:
					this.box.setFillStyle(0xffa500);
					break;
				case 2:
					this.box.setFillStyle(0x32cd32);
					break;
			}
		};
	}
}
