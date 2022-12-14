import { Button, Center, Space, Stack, Text, Title } from '@mantine/core'
import { useMountEffect } from 'hooks/useMountEffect'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useGameStore } from 'state/gameStore'

const Home: NextPage = () => {

	const quitGame = useGameStore(state => state.quitGame)

	useMountEffect(quitGame)

	return (
		<Center>
			<Stack sx={theme => ({
				padding: theme.spacing.xl,
				alignItems: 'center'
			})}>
				<Title size='h2'>Smitedle</Title>
				<Text>Guess the Smite God</Text>

				<Space h={120} />

				<Link href='/classic' passHref>
					<Button component='a' fullWidth>Play Classic</Button>
				</Link>
				<Link href='/ability' passHref>
					<Button component='a' fullWidth>Play Ability</Button>
				</Link>
				<Link href='/splash' passHref>
					<Button component='a' fullWidth>Play Splash</Button>
				</Link>
			</Stack>
		</Center>
	)
}

export default Home
