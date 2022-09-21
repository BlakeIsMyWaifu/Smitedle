import { godData } from 'data/gods'
import { randomElementFromArray } from 'utils/maths'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { gameActionName } from './createActionName'

interface GameState {
	correctGod: string;
	guesses: string[];
	startGame: () => void;
	addGuess: (name: string) => void;
}

export const useGameStore = create<GameState>()(devtools((set, get) => ({
	correctGod: '',
	guesses: [],
	startGame: () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const randomGod = randomElementFromArray(godData)!
		set({
			correctGod: randomGod.Name
		}, ...gameActionName('startGame'))
	},
	addGuess: name => {
		if (get().guesses.includes(name)) return
		set(state => ({
			guesses: [name, ...state.guesses]
		}), ...gameActionName('addGuess'))
	}
})))