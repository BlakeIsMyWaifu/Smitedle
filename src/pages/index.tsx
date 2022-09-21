import { Center } from '@mantine/core'
import Input, { type InputData } from 'components/Input'
import { godData } from 'data/gods'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { useGameStore } from 'state/gameStore'

const Home: NextPage = () => {

	const data: InputData[] = useMemo(() => godData.map(god => ({ value: god.Name, icon: god.godIcon_URL })), [])

	const addGuess = useGameStore(state => state.addGuess)

	return (
		<Center style={{
			height: '40vh'
		}}>
			<Input
				label='Guess a God'
				placeholder='Enter God Name . . .'
				data={data}
				onSubmit={value => {
					addGuess(value)
				}}
			/>
		</Center>
	)
}

export default Home
