import { Avatar, Stack } from '@mantine/core'
import GodInput from 'components/GodInput'
import GuessGods from 'components/GuessGods'
import { useStartGame } from 'hooks/useStartGame'
import type { NextPage } from 'next'
import { useMemo } from 'react'
import { useGameStore } from 'state/gameStore'
import { getGodData } from 'utils/getGodData'
import { randomElementFromArray } from 'utils/maths'

const Ability: NextPage = () => {

	useStartGame()
	const gameState = useGameStore(state => state.gameState)

	const correctGod = useGameStore(state => state.correctGod)
	const correctGodData = getGodData(correctGod)

	const abilityURL = useMemo(() => randomElementFromArray([
		correctGodData.godAbility1_URL,
		correctGodData.godAbility2_URL,
		correctGodData.godAbility3_URL,
		correctGodData.godAbility4_URL,
		correctGodData.godAbility5_URL
	]), [correctGodData])

	return gameState !== 'start' ? (
		<Stack align='center'>
			<Avatar
				src={abilityURL}
				size={128}
				radius='md'
			/>

			<GodInput
				label='Guess a Gods from the ability'
				placeholder='Enter God Name . . .'
			/>

			<GuessGods />
		</Stack>
	) : null
}

export default Ability