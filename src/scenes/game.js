import KeyboardLetter from "../helpers/keyboardletter";
import GuessTile from "../helpers/guesstile";

export default class Game extends Phaser.Scene {
	constructor() {
		super({
			key: "Game",
		});
	}
	init(data) {
		this.numLetters = data.numLetters;
	}
	preload() {
		this.load.baseURL = "https://extras.natekeep.com/wordle-media/";
		this.load.setCORS("anonymous");
		this.load.crossOrigin = "anonymous";
		this.load.json("allWords", "words.json");
		this.load.image("homeButton", "home.png");

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

		this.homeButton = this.add
			.image(800, 50, "homeButton")
			.setInteractive()
			.setScale(0.1)
			.on("pointerdown", function () {
				self.scene.start("Home");
			});

		self.allWords = self.cache.json.get("allWords");
		if (self.numLetters === 5) {
			self.wordToGuess =
				self.allWords["5"][
					Math.floor(Math.random() * self.allWords["5"].length)
				].toUpperCase();
		} else if (self.numLetters === 6) {
			self.wordToGuess =
				self.allWords["6"][
					Math.floor(Math.random() * self.allWords["6"].length)
				].toUpperCase();
		}

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

		var startX = self.numLetters === 6 ? 225 : 260;
		for (let i = 0; i < 6; i++) {
			self.guessTiles[i] = [];
			for (let j = 0; j < self.numLetters; j++) {
				self.guessTiles[i][j] = new GuessTile(this);
				self.guessTiles[i][j].render(j * 90 + startX, i * 90 + 75);
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
					self.guessIndex != self.numLetters
				) {
					self.guessTiles[self.turn][self.guessIndex].updateLetter(
						event.key.toUpperCase()
					);
					self.guessIndex += 1;
				} else if (event.key === "Backspace" && self.guessIndex != 0) {
					self.guessTiles[self.turn][
						self.guessIndex - 1
					].updateLetter("");
					self.guessIndex -= 1;
				} else if (
					event.key === "Enter" &&
					self.guessIndex === self.numLetters
				) {
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
			if (correctTiles === self.numLetters) {
				self.gameOver = true;
				updateNotificationText("Congrats you won!", "#00FF00");
				resetGame();
			} else if (self.turn === 5) {
				self.gameOver = true;
				updateNotificationText(
					`The word was ${self.wordToGuess}`,
					"#FF0000"
				);
				resetGame();
			}
			self.turn += 1;
			self.guessIndex = 0;
		}
		function checkIfValidWord() {
			let word = "";
			self.guessTiles[self.turn].forEach((letter) => {
				word += letter.value.toLowerCase();
			});

			if (self.allWords[`all_${self.numLetters}`].includes(word)) {
				return true;
			} else {
				updateNotificationText("Not a valid word", "#FF0000", 2000);
			}
			return false;
		}
		function updateNotificationText(message, color, timeout = 0) {
			self.notificationText
				.setText(message)
				.setColor(color)
				.setVisible(true);
			if (timeout) {
				self.notificationTimer = self.time.addEvent({
					delay: timeout,
					callback: function () {
						self.notificationText.setVisible(false);
					},
					callbackScope: this,
				});
			}
		}
		function resetGame() {
			self.resetGameBox = self.add
				.rectangle(700, 600, 100, 50, 0x32cd32)
				.setInteractive()
				.on("pointerdown", function () {
					self.scene.restart();
				});
			self.resetGameText = self.add
				.text(
					self.resetGameBox.getCenter().x,
					self.resetGameBox.getCenter().y,
					["Reset"]
				)
				.setColor("#FFFFFF")
				.setFontSize(35)
				.setFontFamily("Trebuchet MS")
				.setOrigin(0.5);
		}
	}
	update() {}
}
