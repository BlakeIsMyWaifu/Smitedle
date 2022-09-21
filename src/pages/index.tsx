import { Center } from '@mantine/core'
import Input, { type InputData } from 'components/Input'
import { godData } from 'data/gods'
import type { NextPage } from 'next'
import { useMemo } from 'react'

const Home: NextPage = () => {

	const data: InputData[] = useMemo(() => godData.map(god => ({ value: god.Name, icon: god.godIcon_URL })), [])

	return (
		<Center style={{
			height: '40vh'
		}}>
			<Input
				label='Guess a God'
				placeholder='Enter God Name . . .'
				data={data}
				onSubmit={value => console.log(value)}
			/>
		</Center>
	)
}

export default Home
