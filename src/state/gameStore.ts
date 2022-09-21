import { godData } from 'data/gods'
import { randomElementFromArray } from 'utils/maths'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { gameActionName } from './createActionName'

type GameState = 'start' | 'progress' | 'win'

interface GameStore {
	correctGod: string;
	guesses: string[];
	gameState: GameState;
	startGame: () => void;
	addGuess: (name: string) => void;
	winGame: () => void;
}

export const useGameStore = create<GameStore>()(devtools((set, get) => ({
	correctGod: '',
	guesses: [],
	gameState: 'start',
	startGame: () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const randomGod = randomElementFromArray(godData)!
		set({
			correctGod: randomGod.Name,
			guesses: [],
			gameState: 'progress'
		}, ...gameActionName('startGame'))
	},
	addGuess: name => {
		if (get().guesses.includes(name)) return
		set(state => ({
			guesses: [name, ...state.guesses]
		}), ...gameActionName('addGuess'))
	},
	winGame: () => {
		set({
			gameState: 'win'
		}, ...gameActionName('winGame'))
	}
})))