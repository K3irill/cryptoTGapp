/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export class Game {
	constructor() {
		this.score = 0
		this.lives = 10
	}

	increaseScore() {
		this.score += 50
	}
	gameOver() {
		this.lives = 0
	}
	decreaseLives(value = 1) {
		this.lives -= value
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
export const MAX_FLASH_ASTEROIDS = 3
