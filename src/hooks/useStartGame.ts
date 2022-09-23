import { useGameStore } from 'state/gameStore'

import { useMountEffect } from './useMountEffect'

export const useStartGame = (): void => {
	const startGame = useGameStore(state => state.startGame)
	useMountEffect(startGame)
}