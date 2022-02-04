import KeyboardLetter from "../helpers/keyboardletter";
import GuessTile from "../helpers/guesstile";

export default class Game extends Phaser.Scene {
	constructor() {
		super({
			key: "Game",
		});
	}
	init(data) {}
	preload() {
		this.load.baseURL = "https://extras.natekeep.com/wordle-media/";
		this.load.setCORS("anonymous");
		this.load.crossOrigin = "anonymous";
		this.load.json("allWords", "words.json");

		this.allWords;
		this.letters = [
			"Q",
			"W",
			"E",
			"R",
			"T",
			"Y",
			"U",
			"I",
			"O",
			"P",
			"A",
			"S",
			"D",
			"F",
			"G",
			"H",
			"J",
			"K",
			"L",
			"Z",
			"X",
			"C",
			"V",
			"B",
			"N",
			"M",
		];
		this.letterTiles = {};
		this.guessTiles = {};
		this.turn = 0;
		this.wordToGuess;
		this.guessIndex = 0;
		this.gameOver = false;
		this.notificationText;
		this.notificationTimer;
	}
	create() {
		let self = this;

		self.allWords = self.cache.json.get("allWords");
		self.wordToGuess =
			self.allWords["6"][
				Math.floor(Math.random() * self.allWords["6"].length)
			].toUpperCase();

		console.log(self.wordToGuess);

		var [letterX, letterY] = [175, 680];
		for (let i = 0; i < 10; i++) {
			self.letterTiles[self.letters[i]] = new KeyboardLetter(this);
			self.letterTiles[self.letters[i]].render(
				letterX,
				letterY,
				self.letters[i]
			);
			letterX += 60;
		}
		[letterX, letterY] = [200, 740];
		for (let i = 10; i < 19; i++) {
			self.letterTiles[self.letters[i]] = new KeyboardLetter(this);
			self.letterTiles[self.letters[i]].render(
				letterX,
				letterY,
				self.letters[i]
			);
			letterX += 60;
		}
		[letterX, letterY] = [260, 800];
		for (let i = 19; i < 26; i++) {
			self.letterTiles[self.letters[i]] = new KeyboardLetter(this);
			self.letterTiles[self.letters[i]].render(
				letterX,
				letterY,
				self.letters[i]
			);
			letterX += 60;
		}

		for (let i = 0; i < 6; i++) {
			self.guessTiles[i] = [];
			for (let j = 0; j < 6; j++) {
				self.guessTiles[i][j] = new GuessTile(this);
				self.guessTiles[i][j].render(j * 90 + 225, i * 90 + 75);
			}
		}

		this.notificationText = self.add
			.text(450, 600, [""])
			.setColor("#FFFFFF")
			.setFontSize(35)
			.setFontFamily("Trebuchet MS")
			.setOrigin(0.5);

		this.input.keyboard.on("keydown", function (event) {
			if (!self.gameOver) {
				if (
					self.letters.includes(event.key.toUpperCase()) &&
					self.guessIndex != 6
				) {
					console.log(self.guessTiles[self.turn][self.guessIndex]);
					console.log(self.turn);
					console.log(self.guessIndex);
					self.guessTiles[self.turn][self.guessIndex].updateLetter(
						event.key.toUpperCase()
					);
					self.guessIndex += 1;
				} else if (event.key === "Backspace" && self.guessIndex != 0) {
					self.guessTiles[self.turn][
						self.guessIndex - 1
					].updateLetter("");
					self.guessIndex -= 1;
				} else if (event.key === "Enter" && self.guessIndex === 6) {
					if (checkIfValidWord()) {
						checkWord();
					}
				}
			}
		});

		function checkWord() {
			let correctTiles = 0;
			self.guessTiles[self.turn].forEach((letter, i) => {
				if (letter.value === self.wordToGuess[i]) {
					self.guessTiles[self.turn][i].setColor(2);
					self.letterTiles[letter.value].setColor(2);
					correctTiles += 1;
				} else if (self.wordToGuess.includes(letter.value)) {
					self.guessTiles[self.turn][i].setColor(1);
					self.letterTiles[letter.value].setColor(1);
				} else {
					self.guessTiles[self.turn][i].setColor(0);
					self.letterTiles[letter.value].setColor(0);
				}
			});
			if (correctTiles === 6) {
				self.gameOver = true;
				updateNotificationText(
					"Congrats you won! (refresh for now)",
					"#00FF00",
					2
				);
			} else if (self.turn === 5) {
				self.gameOver = true;
				updateNotificationText(
					"Better luck next time (refresh for now)",
					"#FF0000",
					2
				);
			}
			self.turn += 1;
			self.guessIndex = 0;
		}
		function checkIfValidWord() {
			let word = "";
			self.guessTiles[self.turn].forEach((letter) => {
				word += letter.value.toLowerCase();
			});
			if (self.allWords["all_6"].includes(word)) {
				return true;
			} else {
				updateNotificationText("Not a valid word", "#FF0000", 2);
			}
			return false;
		}
		function updateNotificationText(message, color, timeout) {
			self.notificationText.setText(message).setColor(color);
			self.notificationTimer = self.time.delayedCall({
				delay: 2,
				callback: function () {
					self.notificationText.setText[""];
					self.notificationText.setVisible(false);
					console.log("THIS IS BEING CALLED KAPPA");
				},
				callbackScope: this,
			});
		}
	}
	update() {}
}
