import { godData } from 'data/gods'
import { randomElementFromArray } from 'utils/maths'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { gameActionName } from './createActionName'

interface GameState {
	god: string;
	guesses: string[];
	startGame: () => void;
	addGuess: (name: string) => void;
}

export const useGameStore = create<GameState>()(devtools((set, get) => ({
	god: '',
	guesses: [],
	startGame: () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const randomGod = randomElementFromArray(godData)!
		set({
			god: randomGod.Name
		}, ...gameActionName('startGame'))
	},
	addGuess: name => {
		if (get().guesses.includes(name)) return
		set(state => ({
			guesses: [...state.guesses, name]
		}), ...gameActionName('addGuess'))
	}
})))