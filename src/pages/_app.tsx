import { MantineProvider, Stack, createStyles } from '@mantine/core'
import Header from 'components/Header'
import { useMountEffect } from 'hooks/useMountEffect'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useGameStore } from 'state/gameStore'

const useStyle = createStyles(theme => ({
	body: {
		padding: theme.spacing.xl
	}
}))

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {

	const { classes } = useStyle()

	const startGame = useGameStore(state => state.startGame)

	useMountEffect(() => {
		startGame()
	})

	return (
		<>
			<Head>
				<title>Smitedle</title>
				<link rel='icon' href='/favicon.ico' />
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark'
				}}
			>
				<Stack>
					<Header />
					<div className={classes.body}>
						<Component {...pageProps} />
					</div>
				</Stack>
			</MantineProvider>
		</>
	)
}

export default MyApp
