import { Avatar, Container, Table } from '@mantine/core'
import { godData } from 'data/gods'
import { FC, Fragment } from 'react'
import { useGameStore } from 'state/gameStore'

const GuessesTable: FC = () => {

	const guess = useGameStore(state => state.guesses)

	return (
		<Container style={{
			maxWidth: '80vw',
			width: '100%'
		}}>
			<Table>
				<thead>
					<tr>
						<th>God</th>
						<th>Pantheon</th>
						<th>Role</th>
						<th>Damage Type</th>
						<th>Range Type</th>
						<th>Pros</th>
					</tr>
				</thead>
				<tbody>
					{
						guess.map(guess => {

							const guessData = godData.find(god => god.Name.toLowerCase() === guess)
							if (!guessData) return <Fragment key={guess} />

							const [rangeType, damageType] = guessData.Type.split(', ')

							return <tr key={guess}>
								<td><Avatar src={guessData.godIcon_URL} /></td>
								<td>{guessData.Pantheon}</td>
								<td>{guessData.Roles}</td>
								<td>{damageType}</td>
								<td>{rangeType}</td>
								<td>{guessData.Pros}</td>
							</tr>
						})
					}
				</tbody>
			</Table>
		</Container>
	)
}

export default GuessesTable