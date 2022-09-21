import { ActionIcon, Button, Group, Modal, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconRefresh, IconSun } from '@tabler/icons'
import { FC, useState } from 'react'
import { useGameStore } from 'state/gameStore'
import { useSettingsStore } from 'state/settingsStore'

const ICON_SIZE = 24

const Header: FC = () => {

	const theme = useMantineTheme()

	const toggleTheme = useSettingsStore(state => state.toggleTheme)

	const [modalState, setModalState] = useState(false)

	const guesses = useGameStore(state => state.guesses)
	const gameState = useGameStore(state => state.gameState)
	const startGame = useGameStore(state => state.startGame)

	return (
		<Group position='apart' sx={theme => ({
			paddingTop: theme.spacing.sm,
			backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
			borderBottom: `1px solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background}`,
			paddingBottom: theme.spacing.sm
		})}>

			<Title ml='xl'>Smitedle</Title>

			<Group pr='md'>

				<Modal
					opened={modalState}
					onClose={() => setModalState(false)}
					withCloseButton={false}
					overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
					overlayOpacity={0.55}
					overlayBlur={3}
				>
					<Stack align='center'>
						<Text>Do you want to restart?</Text>
						<Group>
							<Button
								variant='light'
								color='green'
								onClick={() => {
									startGame()
									setModalState(false)
								}}
							>Confirm</Button>
							<Button
								variant='light'
								color='red'
								onClick={() => setModalState(false)}
							>Cancel</Button>
						</Group>
					</Stack>
				</Modal>
				<ActionIcon
					variant='light'
					title='Restart Game'
					size={32}
					onClick={() => {
						if (!guesses.length) return
						if (gameState === 'start') return
						if (gameState === 'win') return startGame()
						setModalState(true)
					}}
				>
					<IconRefresh size={ICON_SIZE} />
				</ActionIcon>

				<ActionIcon
					variant='light'
					title='Toggle Colour Scheme'
					size={32}
					onClick={() => toggleTheme()}
				>
					{theme.colorScheme === 'dark' ? <IconSun size={ICON_SIZE} /> : <IconMoonStars size={ICON_SIZE} />}
				</ActionIcon>

			</Group>
		</Group>
	)
}

export default Header