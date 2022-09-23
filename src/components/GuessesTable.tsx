import { Avatar, Badge, Container, Table } from '@mantine/core'
import { godData } from 'data/gods'
import { type FC, useMemo } from 'react'
import { useGameStore } from 'state/gameStore'

interface GodInfo {
	avatar: string;
	pantheon: string;
	roles: string;
	damageType: string;
	rangeType: string;
	pros: string;
}

const GuessesTable: FC = () => {

	const getData = (godName: string): GodInfo => {
		const data = godData.find(god => god.Name.toLowerCase() === godName.toLowerCase()) ?? godData[0]
		const [rangeType, damageType] = data.Type.split(', ')
		return {
			avatar: data.godIcon_URL,
			pantheon: data.Pantheon,
			roles: data.Roles,
			damageType,
			rangeType,
			pros: data.Pros
		}
	}

	const guesses = useGameStore(state => state.guesses)

	const correctGod = useGameStore(state => state.correctGod)
	const correctGodData: GodInfo = useMemo(() => getData(correctGod), [correctGod])

	return (
		<Container sx={{
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
						guesses.map(guess => {
							const guessedData = getData(guess)

							const colour = (category: keyof GodInfo): string => guessedData[category] === correctGodData[category] ? 'green' : 'red'

							const prosColour = colour('pros') === 'green' ? 'green' : (
								correctGodData.pros.split(', ').some(pro => guessedData.pros.split(', ').includes(pro)) ? 'orange' : 'red'
							)

							return <tr key={guess}>
								<td><Avatar src={guessedData.avatar} /></td>
								<Row colour={colour('pantheon')} value={guessedData.pantheon} />
								<Row colour={colour('roles')} value={guessedData.roles} />
								<Row colour={colour('damageType')} value={guessedData.damageType} />
								<Row colour={colour('rangeType')} value={guessedData.rangeType} />
								<Row colour={prosColour} value={guessedData.pros} />
							</tr>
						})
					}
				</tbody>
			</Table>
		</Container>
	)
}

interface RowProps {
	colour: string;
	value: string;
}

const Row: FC<RowProps> = ({ colour, value }) => {
	return <td>
		<Badge
			color={colour}
			size='lg'
			sx={{
				textTransform: 'none'
			}}
		>{value}</Badge>
	</td>
}

export default GuessesTable