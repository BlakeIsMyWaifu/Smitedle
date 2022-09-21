import { Container, Stack } from '@mantine/core'
import GuessesTable from 'components/GuessesTable'
import Input, { type InputData } from 'components/Input'
import WinBanner from 'components/WinBanner'
import { godData } from 'data/gods'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { useGameStore } from 'state/gameStore'

const Home: NextPage = () => {

	const data: InputData[] = useMemo(() => godData.map(god => ({ value: god.Name, icon: god.godIcon_URL })), [])

	const addGuess = useGameStore(state => state.addGuess)
	const gameState = useGameStore(state => state.gameState)

	return (
		<Stack>
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
							data={data}
							onSubmit={value => {
								addGuess(value)
							}}
						/>
				}
			</Container>

			<GuessesTable />
		</Stack>
	)
}

export default Home
