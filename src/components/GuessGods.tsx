import { Avatar, Badge, Container, Group, Table } from '@mantine/core'
import { godData } from 'data/gods'
import { FC } from 'react'
import { useGameStore } from 'state/gameStore'

const GuessGods: FC = () => {

	const guesses = useGameStore(state => state.guesses)

	const correctGod = useGameStore(state => state.correctGod)

	return (
		<Container sx={{
			maxWidth: '40wv',
			width: '100%'
		}}>
			<Table>
				<thead>
					<tr>
						<th>Gods</th>
					</tr>
				</thead>
				<tbody>
					{
						guesses.map(guess => {

							const guessData = godData.find(god => god.Name.toLowerCase() === guess) ?? godData[0]
							const colour = guess === correctGod.toLowerCase() ? 'green' : 'red'

							return <tr key={guess}>
								<td>
									<Group>
										<Avatar src={guessData.godIcon_URL} />
										<Badge
											color={colour}
											size='xl'
											sx={{
												textTransform: 'none'
											}}
										>{guessData.Name}</Badge>
									</Group>
								</td>
							</tr>
						})
					}
				</tbody>
			</Table>
		</Container>
	)
}

export default GuessGods