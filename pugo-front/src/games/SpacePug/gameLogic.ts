/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export class Game {
	constructor() {
		this.score = 0
		this.lives = 10
	}

	increaseScore() {
		this.score += 10
	}

	decreaseLives(value = 1) {
		this.lives -= 1
	}

	increaseLives(value = 2) {
		this.lives += value
	}

	megaIncreaseLives() {
		this.lives += 10
	}

	reset() {
		this.score = 0
		this.lives = 10
	}

	getState() {
		return {
			score: this.score,
			lives: this.lives,
		}
	}
}
