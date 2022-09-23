import { Container } from '@mantine/core'
import GodInput from 'components/GodInput'
import GuessesTable from 'components/GuessesTable'
import WinBanner from 'components/WinBanner'
import { useStartGame } from 'hooks/useStartGame'
import { NextPage } from 'next'
import { useGameStore } from 'state/gameStore'

const Classic: NextPage = () => {

	useStartGame()
	const gameState = useGameStore(state => state.gameState)

	return gameState !== 'start' ? (
		<>
			<Container style={{
				maxWidth: '50vw',
				width: '100%',
				height: '20vh'
			}}>
				{
					gameState === 'win'
						? <WinBanner />
						: <GodInput
							label='Guess a God'
							placeholder='Enter God Name . . .'
						/>
				}
			</Container>

			<GuessesTable />
		</>
	) : null
}

export default Classic