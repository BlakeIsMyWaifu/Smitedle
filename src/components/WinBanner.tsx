import { Button, Center, Stack, Title } from '@mantine/core'
import { FC } from 'react'
import { useGameStore } from 'state/gameStore'

const WinBanner: FC = () => {

	const guesses = useGameStore(state => state.guesses).length
	const startGame = useGameStore(state => state.startGame)

	return (
		<Center>
			<Stack>
				<Center>
					<Title>You won in {guesses} moves</Title>
				</Center>
				<Button
					variant='light'
					size='xl'
					onClick={startGame}
				>Play Again</Button>
			</Stack>
		</Center>
	)
}

export default WinBanner