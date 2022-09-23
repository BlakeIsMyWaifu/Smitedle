import { Container } from '@mantine/core'
import GuessesTable from 'components/GuessesTable'
import Input from 'components/Input'
import WinBanner from 'components/WinBanner'
import { useStartGame } from 'hooks/useStartGame'
import { NextPage } from 'next'
import { useGameStore } from 'state/gameStore'

const Classic: NextPage = () => {

	useStartGame()
	const gameState = useGameStore(state => state.gameState)

	return (
		<>
			<Container style={{
				maxWidth: '50vw',
				width: '100%',
				height: '20vh'
			}}>
				{
					gameState === 'win'
						? <WinBanner />
						: <Input
							label='Guess a God'
							placeholder='Enter God Name . . .'
						/>
				}
			</Container>

			<GuessesTable />
		</>
	)
}

export default Classic