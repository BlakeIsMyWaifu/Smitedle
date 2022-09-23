import { ActionIcon, Button, Group, Modal, Stack, Tabs, Text, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconMoonStars, IconRefresh, IconSun } from '@tabler/icons'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useGameStore } from 'state/gameStore'
import { useSettingsStore } from 'state/settingsStore'

const ICON_SIZE = 24

const GamemodeTabs: FC = () => {

	const router = useRouter()
	const [activeTab, setActiveTab] = useState<string | null>('home')
	useEffect(() => {
		setActiveTab(router.route as string)
	}, [router.route])

	return (
		<Tabs
			variant='pills'
			value={activeTab}
			defaultValue='home'
			onTabChange={value => {
				setActiveTab(value)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				router.push(value!)
			}}
			styles={theme => ({
				tab: {
					'&:hover': {
						backgroundColor: theme.colors.blue[9]
					}
				}
			})}
		>
			<Tabs.List>
				<Tabs.Tab value='/'>Home</Tabs.Tab>
				<Tabs.Tab value='/classic'>Classic</Tabs.Tab>
				<Tabs.Tab value='/ability'>Ability</Tabs.Tab>
				<Tabs.Tab value='/splash'>Splash</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	)
}

const RestartButton: FC = () => {

	const theme = useMantineTheme()

	const [modalState, setModalState] = useState(false)

	const guesses = useGameStore(state => state.guesses)
	const gameState = useGameStore(state => state.gameState)
	const startGame = useGameStore(state => state.startGame)

	return (
		<>
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
		</>
	)
}

const ThemeButton: FC = () => {

	const theme = useMantineTheme()

	const toggleTheme = useSettingsStore(state => state.toggleTheme)

	return (
		<ActionIcon
			variant='light'
			title='Toggle Colour Scheme'
			size={32}
			onClick={() => toggleTheme()}
		>
			{theme.colorScheme === 'dark' ? <IconSun size={ICON_SIZE} /> : <IconMoonStars size={ICON_SIZE} />}
		</ActionIcon>
	)
}

const Header: FC = () => {

	const isLargeScreen = useMediaQuery('(min-width: 768px)')

	return (
		<Group position='apart' sx={theme => ({
			paddingTop: theme.spacing.sm,
			backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
			borderBottom: `1px solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background}`,
			paddingBottom: theme.spacing.sm
		})}>

			{
				isLargeScreen
					? <>
						<Group spacing='xl'>
							<Title ml='xl'>Smitedle</Title>
							<GamemodeTabs />
						</Group>

						<Group pr='md'>
							<RestartButton />
							<ThemeButton />
						</Group>
					</>
					: <>
						<Group
							spacing='xl'
							position='apart'
							sx={{
								width: '100%'
							}}
						>
							<Title ml='xl'>Smitedle</Title>
							<Group pr='md'>
								<RestartButton />
								<ThemeButton />
							</Group>
						</Group>

						<GamemodeTabs />
					</>
			}

		</Group>
	)
}

export default Header