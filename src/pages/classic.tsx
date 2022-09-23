import GodInput from 'components/GodInput'
import GuessesTable from 'components/GuessesTable'
import { useStartGame } from 'hooks/useStartGame'
import { NextPage } from 'next'
import { useGameStore } from 'state/gameStore'

const Classic: NextPage = () => {

	useStartGame()
	const gameState = useGameStore(state => state.gameState)

	return gameState !== 'start' ? (
		<>
			<GodInput
				label='Guess a God'
				placeholder='Enter God Name . . .'
			/>

			<GuessesTable />
		</>
	) : null
}

export default Classic