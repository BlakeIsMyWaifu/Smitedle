import { MantineProvider } from '@mantine/core'
import Header from 'components/Header'
import { useMountEffect } from 'hooks/useMountEffect'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useGameStore } from 'state/gameStore'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {

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
				<Header />
				<Component {...pageProps} />
			</MantineProvider>
		</>
	)
}

export default MyApp
